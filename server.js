const express = require("express");
const path = require("path");
const moment = require("moment");

const app = express();

const PORT = process.env.PORT || 5000;

// to send a file instead of a text

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// middleware

// app.use((req, res, next) => {
//   console.log(
//     `${req.protocol}://${req.get("host")}${
//       req.originalUrl
//     } :${moment().format()}`
//   );
//   next();
// });

// Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/blogs", require("./routes/api/blogs"));
app.use("/api/members", require("./routes/api/members"));

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
