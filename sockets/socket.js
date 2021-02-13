const { io } = require("../index");

// Mensajes de sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("mensaje", (mje) => {
    console.log(mje);

    io.emit("mensaje", { admin: "Nuevo mje!" });
  });
});
