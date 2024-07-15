const fs = require("fs")
// Путь до папки с картинками
const pathFile = __dirname + ''
// папка в которую сохранять
const directoryName = '/images/'

function deleteFile(name) {
  if(!fs.existsSync(pathFile + name)) return
  fs.unlink(pathFile + name, (err) => {
    if (err) {
      console.log(err)
    }
  })
}

function createFile(id, file) {
  fs.writeFile(pathFile + directoryName + id + file.name, file.data, (err) => {
    if (err) {
      console.log(err)
    }
  })
}

function changeProducts(products) {
  fs.writeFileSync(__dirname + '/products.json', JSON.stringify({ products }))
}

function getJsonProducts() {
  return JSON.parse(fs.readFileSync(__dirname + '/products.json', { encoding: "utf-8" })).products
}

class Controller {
  async createProduct(req, res) {
    const { title, price, description } = req.body
    const products = getJsonProducts()
    const newProduct = {
      id: Date.now(),
      title,
      price,
      description
    }
    if (req.files) {
      createFile(newProduct.id, req.files.image)
      newProduct.image = directoryName + newProduct.id + req.files.image.name
    } else {
      newProduct.image = ""
    }
    products.push(newProduct)
    changeProducts(products)
    res.json(newProduct)
  }

  async getProducts(req, res) {
    const products = fs.readFileSync(__dirname + '/products.json', { encoding: "utf-8" })
    res.json(products)
  }

  async updateProduct(req, res) {
    const { id, title, price, description } = req.body
    let products = getJsonProducts()
    let currentProduct
    products = products.map(product => {
      if (product.id === +id) {
        if (product.image) {
          deleteFile(product.image)
          createFile(product.id, req.files.image)
          product.image = directoryName + product.id + req.files.image.name
        }
        product.title = title
        product.price = price
        product.description = description
        currentProduct = JSON.parse(JSON.stringify(product))
      }
      return product
    })
    changeProducts(products)
    res.json(currentProduct)
  }

  async deleteProduct(req, res) {
    const id = req.params.id
    let products = getJsonProducts()
    const currentProduct = products.find(product => product.id === +id)
    if (currentProduct) {
      deleteFile(currentProduct.image)
      products = products.filter(product => product.id !== +id)
      changeProducts(products)
    }
    res.json(true)
  }
}

module.exports = new Controller()