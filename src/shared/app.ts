import express, { Request, Response } from "express";
import connectDB from "../config/database.config";
import router from "../module/routes/auth.routes";
import cookieParser from "cookie-parser";
import { requireAuth } from "../middleware/authMiddleware";

const app = express();

//middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set("view engine", "ejs");
app.use(router);

//routes
app.get("/", (req: Request, res: Response) => {
  res.render("home");
});
app.get("/book", requireAuth, (req: Request, res: Response) => {
  res.render("books");
});

app.get("/read-cookie", (req: Request, res: Response) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json({ cookies });
});

app.listen(3010, async () => {
  await connectDB();
  console.log(`app listening...........`);
});
