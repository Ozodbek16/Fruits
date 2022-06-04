const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");

class Fruits {
  constructor(name, color, img, idx, price) {
    this.name = name;
    this.color = color;
    this.img = img;
    this.idx = idx;
    this.price = price;
  }

  toObj() {
    return {
      name: this.name,
      color: this.color,
      img: this.img,
      price: this.price,
      id: uuid(),
      inCart: 0,
    };
  }

  async save() {
    const fruits = await Fruits.getAll();
    const fruit = this.toObj();

    fruits.push(fruit);
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "fruits.json"),
        JSON.stringify({ fruits }),
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  async update() {
    const fruits = await Fruits.getAll();
    const idx = this.idx;
    const fruit = this.toObj();

    fruits[idx] = fruit;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "fruits.json"),
        JSON.stringify({ fruits }),
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  async delete() {
    const fruits = await Fruits.getAll();
    const idx = this.idx;
    fruits.splice(idx, 1);

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "fruits.json"),
        JSON.stringify({ fruits }),
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "fruits.json"),
        "utf-8",
        (err, content) => {
          if (err) reject(err);
          else resolve(JSON.parse(content).fruits);
        }
      );
    });
  }

  async finFruit(son) {
    let id = son;
    const fruits = await Fruits.getAll();
    let fruit = fruits.find((fruit) => fruit.id == id);
    return new Promise((resolve, reject) => {
      if (!fruit) {
        return reject('err')
      } else {
        resolve(fruit)
      }
    })
  }
}


module.exports = Fruits;
