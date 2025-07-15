import express, { Express } from "express";
import cors from "cors";
import { DBconnection } from "./config/db";
import { userRouter } from "./routes/user.routes";
import { postRouter } from "./routes/post.routes";
import "./models/user.model";
import "./models/post.model";
import "./models/comment.model";
import "./models/reaction.model"; 


const app: Express = express();
const port = 8080;

DBconnection();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", userRouter);
app.use("/api/post", postRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
