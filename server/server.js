const cors = require("@fastify/cors");
const fastify = require("fastify")({
  logger: true,
});

const PORT = 8000;

fastify.register(cors, { origin: true });

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
