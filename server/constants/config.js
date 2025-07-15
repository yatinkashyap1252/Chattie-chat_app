const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000",process.env.CLIENT_URL],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const CHATTIE_TOKEN = "chattie";

export default corsOptions;

export { CHATTIE_TOKEN };
