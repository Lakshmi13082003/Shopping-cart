var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const usersFile = path.join(__dirname, '../data/users.json');
const productsFile = path.join(__dirname, '../data/products.json');

/* GET admin listing. */
router.get('/', function (req, res, next) {
  try {
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
    res.render('admin', { title: 'Admin', products: products });
  } catch (error) {
    console.error('Error reading products file:', error);
    res.status(500).send('Error reading products data');
  }
});

/* GET all users page. */
router.get('/all-users', function (req, res, next) {
  try {
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    res.render('admin/all-users', { title: 'All Users', users: users });
  } catch (error) {
    console.error('Error reading users file:', error);
    res.status(500).send('Error reading users data');
  }
});

/* GET add product page. */
router.get('/add-product', function (req, res, next) {
  res.render('admin/add-product', { title: 'Add Product' });
});

/* Logout and redirect to index page. */
router.get('/logout', function (req, res, next) {
  res.redirect('/');
});

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

/* POST add product data. */
router.post('/add-product', upload.single('image'), function (req, res, next) {
  const newProduct = {
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    description: req.body.description,
    image: '/images/' + req.file.filename
  };

  const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8')) || [];
  products.push(newProduct);
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
  res.redirect('/admin/add-product');
});

/* POST delete product data. */
router.post('/delete-product', function (req, res, next) {
  const productName = req.body.name;
  try {
    let products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
    products = products.filter(product => product.name !== productName);
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
    res.redirect('/admin');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Error deleting product');
  }
});

module.exports = router;
