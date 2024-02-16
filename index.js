require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const { isLoggedIn, isAdmin } = require("./middleware/auth");

const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://shortit-front.vercel.app/",
];

const unSecure = ["/create"];
app.use(cookieParser());
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(req.url, 'first');
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    next();
  });
  
  
app.use("/test", (req, res)=>res.send("test"));
app.use("/", require("./routes/url/getShortURL"));

app.use("/login", require("./routes/loginUser"));
app.use("/register", require("./routes/registerUser"));
app.use("/create", isLoggedIn, require("./routes/url/createShortURL"));
app.use("/user", isLoggedIn, require("./routes/user.js"));
app.use("/admin", [isLoggedIn, isAdmin], require("./routes/admin.js"));
app.use("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    message: "Logged out successfully",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports.unSecure = unSecure;
