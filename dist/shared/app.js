"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("../config/database.config"));
const auth_routes_1 = __importDefault(require("../module/routes/auth.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.set("view engine", "ejs");
app.use(auth_routes_1.default);
//routes
app.get("/", (req, res) => {
    res.render("home");
});
app.get("/book", (req, res) => {
    res.render("books");
});
//cookies
app.get("/set-cookie", (req, res) => {
    res.cookie("newUser", false);
    res.cookie("isEmployed", true, { maxAge: 8400000, httpOnly: true });
    res.send("you got cookiesnp");
});
app.get("/read-cookie", (req, res) => {
    const cookies = req.cookies;
    console.log(cookies.newUser);
    res.json({ cookies });
});
app.listen(3010, async () => {
    await (0, database_config_1.default)();
    console.log("app listening on port 3010");
});
