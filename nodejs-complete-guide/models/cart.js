const fs = require("fs");
const path = require("path");

const dir = require("../util/path");

const storeDir = path.join(dir, "data");
const fileName = "cart.json";
const storePath = path.join(storeDir, fileName);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(storePath, (err, content) => {
      const cart = err ? { products: [], totalPrice: 0 } : JSON.parse(content);

      if (err) {
        fs.mkdir(storeDir, (err) => {
          if (err) {
            console.error("Error on create directory", err);
            return;
          }
          fs.writeFile(storePath, cart, (err) => {
            console.error("Error on write file", err);
          });
        });
      }

      const existingProductIndex = cart.products.findIndex((p) => p.id === id);
      if (existingProductIndex >= 0) {
        cart.products[existingProductIndex].qty += 1;
      } else {
        cart.products.push({ id, qty: 1 });
      }
      cart.totalPrice += Number(productPrice);

      fs.writeFile(storePath, JSON.stringify(cart), (err) => {
        console.error(err);
      });
    });
  }
};
