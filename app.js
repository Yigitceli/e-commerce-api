const express = require("express");
const morgan = require("morgan");
const app = express();
const indexRouter = require("./routes/index");
const exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);


app.use((err, req, res, next) => {
    res.status(err.status).send(err.message);
})
app.listen(3000, () => {
  console.log("App listening at" + 3000);
});
