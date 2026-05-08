import cors from "cors";
import express from "express";
import morgan from "morgan";
import env from "./config/env.js";
import scrapeRoutes from "./routes/scrapeRoutes.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running"
  });
});

app.use("/api", scrapeRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
