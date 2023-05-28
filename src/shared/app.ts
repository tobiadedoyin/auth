import express, { Request, Response } from "express";
import connectDB from "../config/database.config";
import router from "../module/routes/auth.routes";
import cookieParser from "cookie-parser";

const app = express();

//middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(router);

//routes
app.get("/", (req: Request, res: Response) => {
  res.render("home");
});
app.get("/book", (req: Request, res: Response) => {
  res.render("books");
});

// //cookies
// app.get("/set-cookie", (req: Request, res: Response) => {
//   res.cookie("newUser", false);
//   res.cookie("isEmployed", true, { maxAge: 8400000, httpOnly: true });
//   res.send("you got cookiesnp");
// });

app.get("/read-cookie", (req: Request, res: Response) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json({ cookies });
});

app.listen(3010, async () => {
  await connectDB();
  console.log("app listening on port 3010");
});
