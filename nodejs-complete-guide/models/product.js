const fs = require("fs");
const path = require("path");

const dir = require("../util/path");

const storeDir = path.join(dir, "data");
const fileName = "products.json";
const storePath = path.join(storeDir, fileName);

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    Product.fetchAll((products) => {
      products.push(this);
      fs.writeFile(storePath, JSON.stringify(products), (err) => {
        console.error(err);
      });
    });
  }

  static fetchAll(cb) {
    fs.readFile(storePath, (err, data) => {
      if (err) {
        fs.mkdir(storeDir, (err) => {
          if (err) {
            console.error("Error on create directory", err);
            return cb([]);
          }
          fs.writeFile(storePath, "[]", (err) => {
            console.error("Error on write file", err);
            cb([]);
          });
        });
      } else {
        cb(JSON.parse(data));
      }
    });
  }
};
