import express from "express";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();
app.use("/api", chatRoutes);

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
