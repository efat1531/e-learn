const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["set-cookie"],
};

export default corsOptions;
