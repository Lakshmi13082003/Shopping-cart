var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, '../data/products.json');

// Temporary storage for cart items (in-memory)
let cart = [];
// Temporary storage for orders (in-memory)
let orders = [];

/* GET users listing. */
router.get('/', function (req, res, next) {
  try {
      const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
      res.render('users', { title: 'Users', products: products });
  } catch (error) {
      console.error('Error reading products file:', error);
      res.status(500).send('Error reading products data');
  }
});

/* Logout and redirect to index page. */
router.get('/logout', function (req, res, next) {
    res.redirect('/');
});

/* Add item to cart. */
router.post('/add-cart', function (req, res, next) {
    const productName = req.body.productName;
    console.log('Received productName:', productName); // Add this line for debugging
    try {
        const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
        const product = products.find(p => p.name === productName);
        if (product) {
            console.log('Found product:', product); // Add this line for debugging
            cart.push(product);
            res.redirect('/users');
        } else {
            console.error('Product not found for name:', productName); // Add this line for debugging
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error reading products file:', error);
        res.status(500).send('Error reading products data');
    }
});

/* Remove item from cart. */
router.post('/remove-from-cart', function (req, res, next) {
    const productName = req.body.productName;
    cart = cart.filter(item => item.name !== productName);
    res.redirect('/users/add-cart');
});

/* Place order. */
router.post('/place-order', function (req, res, next) {
    if (cart.length > 0) {
        orders.push(...cart);
        cart = []; // Clear cart after placing order
        res.send('<script>alert("Order placed successfully!"); window.location.href = "/users/add-cart";</script>');
    } else {
        res.send('<script>alert("Cart is empty!"); window.location.href = "/users/add-cart";</script>');
    }
});

/* View cart items. */
router.get('/add-cart', function (req, res, next) {
    res.render('users/add-cart', { title: 'My Cart', cart: cart });
});

/* View orders page. */
router.get('/my-order', function (req, res, next) {
    res.render('users/my-order', { title: 'My Orders', orders: orders });
});

module.exports = router;
