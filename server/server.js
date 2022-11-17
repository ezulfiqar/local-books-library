const fastify = require("fastify");
const cors = require("fastify-cors");

const PORT = 8000;
const server = fastify({ logger: true });

server.register(cors, { origin: true });

// Add API endpoints here

async function start() {
  try {
    await server.listen(PORT);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
