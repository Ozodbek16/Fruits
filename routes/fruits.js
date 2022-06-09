const express = require("express");
const route = express.Router();
const Fruits = require("../model/Model");
const Joi = require("joi");

route.get("/", async (req, res) => {
  const fruits = await Fruits.getAll();
  res.render("allFriuts", {
    title: "Fruits",
    fruits,
  });
});

route.get("/add", (req, res) => {
  res.render("form", {
    title: "Add fresh fruit",
  });
});

route.post("/add", async (req, res) => {
  // let scheme = Joi.object({
  //     name: Joi.string().min(3).max(30).required(),
  //     color: Joi.string().required(),
  //     img: Joi.string().hostname()
  // })

  // let result = scheme.validate(req.body)

  // if (!!result.error) {
  //     res.status(400).render('error')
  //     return
  // }

  const fruit = new Fruits(
    req.body.name,
    req.body.color,
    req.body.img,
    "",
    req.body.price
  );

  await fruit.save();

  res.status(201).redirect("/fruits");
});

route.get("/form/:id", (req, res) => {
  res.render("editF", {
    title: "Edit fruit",
    idF: req.params.id,
  });
});

route.get("/update/:id", async (req, res) => {
  let id = req.params.id;
  const fruits = await Fruits.getAll();

  let idx = fruits.findIndex((fruit) => fruit.id == id);

  // let scheme = Joi.object({
  //     name: Joi.string().min(3).max(30).required(),
  //     color: Joi.string().required(),
  //     img: Joi.string().hostname()
  // })

  // let result = scheme.validate(req.body)

  // if (!!result.error) {
  //     res.status(400).render('error')
  //     return
  // }

  const fruit = new Fruits(
    req.query.name,
    req.query.color,
    req.query.img,
    idx,
    req.query.price
  );

  await fruit.update();

  res.status(201).redirect("/fruits");
});

route.get("/delete/:id", async (req, res) => {
  let id = req.params.id;
  const fruits = await Fruits.getAll();

  let idx = fruits.findIndex((fruit) => fruit.id == id);

  const fruit = new Fruits(req.query.name, req.query.color, req.query.img, idx);

  await fruit.delete();

  res.status(204).redirect("/fruits");
});

route.get("/search/:id", async (req, res) => {
  let id = req.params.id;
  const fruits = await Fruits.getAll();
  let fruit = fruits.find((fruit) => fruit.id == id);
  res.render("fruit", {
    title: fruit.name,
    fruit,
  });
});

route.get('/data/fruits.json', async (req, res) => {
  res.send(await Fruits.getAll())
})

module.exports = route;