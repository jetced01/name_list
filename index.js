const fastify = require('fastify')({ logger: true });
const path = require('path');

// Register static file serving
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/',
});

// In-memory storage for names (in production, you'd use a database)
let names = [];

// API route to get all names
fastify.get('/api/names', async (request, reply) => {
  return { names };
});

// API route to add a new name
fastify.post('/api/names', async (request, reply) => {
  const { name } = request.body;
  
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return reply.code(400).send({ error: 'Name is required and must be a non-empty string' });
  }
  
  const trimmedName = name.trim();
  names.push(trimmedName);
  
  return { success: true, name: trimmedName, total: names.length };
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 5000, host: '0.0.0.0' });
    console.log('Server listening on http://0.0.0.0:5000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();