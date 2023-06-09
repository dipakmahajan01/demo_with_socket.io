const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});
const users = {};
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("new-user-join", (name) => {
    console.log("new user", name);
    users[socket.id] = name;
    socket.emit("user-joined", name);
  });
  socket.on("send", (message) => {
    socket.broadcast.emit("received", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", (message) => {
    // console.log("disconnected", message)
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id]
  });
});
