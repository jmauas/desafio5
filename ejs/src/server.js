const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", "./src/views");
app.set("view engine", "ejs");

const productos = [
    {
      title: "Iphone 13 Pro Max 256 GB Sierra Blue",
      price: 1199,
      thumbnail: "https://d2ihpvt6nd5q28.cloudfront.net/wp-content/uploads/2022/01/iPhone_13_mini_Blue_PDP_Image_position-1A__CLCO_v1-removebg-preview.png"
    }
  ];

const PORT = 8083;
const srv = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en http://localhost:${PORT}`);
});
srv.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/", (req, res) => {
  res.render("index", {
      productos, cargar: true
  })
});

app.get("/productos", (req, res) => {
  res.render("index", {
      productos, cargar: false
  })
});

app.post('/productos', (req, res) => {
  const { body } = req;
  productos.push(body);
  res.render("index", {
    productos, cargar: false
  })
});