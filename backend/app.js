import express from "express";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import globalErrorHandler from "./controllers/errorController.js";
import APPError from "./utils/AppError.js";
const app = express();
import path from "path";

const _dirname = path.resolve();

app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// under right routes important
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "forntend", "dist", "index.html"));
});

// this must be under the right routes
app.use("*", (req, res, next) => {
  const message = `Can't find this ${req.originalUrl} url on this server!`;
  next(new APPError(message, 404));
});
app.use(globalErrorHandler);
export default app;
