const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Metallica"));
bands.addBand(new Band("Manowar"));
bands.addBand(new Band("Trivium"));
bands.addBand(new Band("Incubus"));
bands.addBand(new Band("FF"));

// console.log(bands);

// Mensajes de sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("mensaje", (mje) => {
    console.log(mje);

    io.emit("mensaje", { admin: "Nuevo mje!" });
  });

  // client.on("emitir-mensaje", (payload) => {
  //   client.broadcast.emit("nuevo-mensaje", payload); // Emite a todos menos al cliente que emitió el mje
  // });

  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  client.on("add-band", (payload) => {
    const newBand = new Band(payload.name);
    bands.addBand(newBand);
    io.emit("active-bands", bands.getBands());
  });

  client.on("delete-band", (payload) => {
    bands.deleteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });
});
