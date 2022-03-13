const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", "./src/views");
app.set("view engine", "hbs");
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname+"/views/layouts",
        partialsDir: __dirname+"/views/partials"
    }),
);

const productos = [
    {
      title: "Iphone 13 Pro Max 256 GB Sierra Blue",
      price: 1199,
      thumbnail: "https://d2ihpvt6nd5q28.cloudfront.net/wp-content/uploads/2022/01/iPhone_13_mini_Blue_PDP_Image_position-1A__CLCO_v1-removebg-preview.png"
    }
  ];

const PORT = 8081;
const srv = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en http://localhost:${PORT}`);
});
srv.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/", (req, res) => {
  res.render("main", {
      productos, cargar: true
  })
});

app.get("/productos", (req, res) => {
  res.render("main", {
      productos, cargar: false
  })
});

app.post('/productos', (req, res) => {
  const { body } = req;
  productos.push(body);
  res.render("main", {
    productos, cargar: false
  })
});