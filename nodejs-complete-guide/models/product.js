const fs = require("fs");
const path = require("path");

const dir = require("../util/path");

const storeDir = path.join(dir, "data");
const fileName = "products.json";
const storePath = path.join(storeDir, fileName);

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    Product.fetchAll((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (p) => p.id === this.id
        );
        const updatedProducts = [...products];

        updatedProducts[existingProductIndex] = this;

        fs.writeFile(storePath, JSON.stringify(updatedProducts), (err) => {
          console.error(err);
        });
      } else {
        this.id = Math.random().toString();

        products.push(this);

        fs.writeFile(storePath, JSON.stringify(products), (err) => {
          console.error(err);
        });
      }
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

  static findById(id, cb) {
    Product.fetchAll((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
