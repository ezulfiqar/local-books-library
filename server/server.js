const {
  fastifyRequestContextPlugin,
  requestContext,
} = require("@fastify/request-context");
const cors = require("@fastify/cors");
const fastify = require("fastify")({
  logger: true,
});

const PORT = 8000;

fastify.register(cors, { origin: true });

fastify.register(fastifyRequestContextPlugin, {
  defaultStoreValues: {
    reservations: [],
  },
});

fastify.post("/reserve", async (request) => {
  const { book, duration } = request.body.data;
  const today = new Date();
  const endDate = new Date().setDate(today.getDate() + duration);
  const reservations = requestContext.get("reservations");

  const existingReservation = reservations.some(
    (x) => x.book.title === book.title && x.book.author === book.author
  );

  if (!existingReservation) {
    reservations.push({
      book,
      startDate: today.getTime(),
      endDate,
    });

    requestContext.set("reservations", reservations);
    return {
      isBookAvailable: true,
      message: "Reserved successfully",
      availableDate: today.getTime(),
      returnDate: endDate,
      reservations,
    };
  }

  return {
    isBookAvailable: false,
    message: "Book is not available for reservation",
    reservations,
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
