const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
const { promises: dnsPromises } = dns;
require('dotenv').config();

const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trips');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const DNS_FALLBACK_SERVERS = process.env.DNS_FALLBACK_SERVERS ? process.env.DNS_FALLBACK_SERVERS.split(',') : ['8.8.8.8', '8.8.4.4'];

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/users', userRoutes);

if (!MONGO_URI) {
  console.error('Missing MONGO_URI in environment. Check server/.env and your environment variables.');
  process.exit(1);
}

if (!JWT_SECRET) {
  console.error('Missing JWT_SECRET in environment. Set JWT_SECRET in server/.env or your environment variables.');
  process.exit(1);
}

const isSrvConnection = MONGO_URI.startsWith('mongodb+srv://');

async function ensureMongoSrvLookup() {
  if (!isSrvConnection) {
    return;
  }

  let srvHost;
  try {
    srvHost = new URL(MONGO_URI).hostname;
  } catch (err) {
    console.warn('Unable to parse MongoDB URI hostname for SRV lookup:', err.message);
    return;
  }

  const srvName = `_mongodb._tcp.${srvHost}`;
  try {
    await dnsPromises.resolveSrv(srvName);
    console.log(`MongoDB SRV lookup succeeded for ${srvName}`);
    return;
  } catch (initialErr) {
    console.warn(`MongoDB SRV lookup failed with default DNS: ${initialErr.message}`);

    const currentServers = dns.getServers();
    if (currentServers.length === 1 && currentServers[0] === '127.0.0.1') {
      console.warn('Local DNS server is 127.0.0.1. Trying fallback DNS servers for SRV lookup:', DNS_FALLBACK_SERVERS.join(', '));
      dns.setServers(DNS_FALLBACK_SERVERS);
    } else {
      console.warn('Trying fallback DNS servers for SRV lookup:', DNS_FALLBACK_SERVERS.join(', '));
      dns.setServers(DNS_FALLBACK_SERVERS);
    }

    try {
      await dnsPromises.resolveSrv(srvName);
      console.log(`MongoDB SRV lookup succeeded using fallback DNS servers for ${srvName}`);
    } catch (fallbackErr) {
      console.error(`MongoDB SRV lookup still failed using fallback DNS servers: ${fallbackErr.message}`);
      throw fallbackErr;
    }
  }
}

async function startServer() {
  try {
    await ensureMongoSrvLookup();
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

startServer();
