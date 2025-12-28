const fastify = require('fastify');
const cors = require('@fastify/cors');
const helmet = require('@fastify/helmet');
require('dotenv').config();

const userRoutes = require('./routes/users');

const app = fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info'
  }
});

const PORT = process.env.PORT || 3000;

// Register plugins
app.register(helmet);
app.register(cors);

// Root route
app.get('/', async (request, reply) => {
  return {
    message: 'Fastify REST API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      users: '/api/users'
    }
  };
});

// Health check
app.get('/health', async (request, reply) => {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };
});

// Register routes
app.register(userRoutes, { prefix: '/api/users' });

// Start server
const start = async () => {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Fastify server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
