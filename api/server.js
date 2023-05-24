const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// routerlar gelecek
const server = express();
const mw = require("./token/token-middleware");

const authRouter = require("./auth/auth-router");
const userRouter = require("./users/user-router");
const tweetRouter = require("./tweets/tweet-router");
const commentRouter = require("./comments/comment-router");
const followerRouter = require("./followers/fallowers-router");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/user", mw.restricted, userRouter);
server.use("/api/tweet", mw.restricted, tweetRouter);
server.use("/api/comment", mw.restricted, commentRouter);
// server.use("/api/", mw.authentication, followerRouter);

// server.use("/", async (req, res, next) => {
//   res.status(200).json({ message: "Server is working" });
// });

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Server.js tatafından handle edildi bu hata",
  });
});

module.exports = server;
