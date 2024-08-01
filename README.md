

# Shopping Cart Website

This project is a simple shopping cart application built using Node.js, Express.js, HTML, CSS, JavaScript, and JSON. It allows users to browse products, add items to their cart, and manage their orders. Administrators can add products and view all users.

## Features

- **User Authentication**: Users can sign up and log in to access their personalized shopping experience.
- **Product Management**: Administrators can add new products to the catalog.
- **Cart Management**: Users can add products to their cart, view their cart, and proceed to checkout.
- **Order Management**: Users can view their past orders.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **Template Engine**: Handlebars
- **Data Format**: JSON

## Project Structure

### Views

- **Main Pages**
  - `index.hbs`: Home page
  - `admin.hbs`: Admin dashboard
  - `user.hbs`: User dashboard

- **Subfolders**
  - `index`
    - `login.hbs`: Login page
    - `signup.hbs`: Signup page
  - `admin`
    - `addProducts.hbs`: Page for adding products
    - `allUsers.hbs`: Page for viewing all users
  - `users`
    - `myCart.hbs`: User's cart page
    - `allOrders.hbs`: User's orders page

### Routes

- **Main Routes**
  - `index.js`: Handles routes for the main pages
  - `admin.js`: Handles routes for the admin pages
  - `user.js`: Handles routes for the user pages

## Installation

1. **Clone the repository**:

   ```
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:

   ```
   cd shopping-cart
   ```

3. **Install dependencies**:

   ```
   npm install
   ```

4. **Run the server**:

   ```
   npm start
   ```

5. **Open your browser** and navigate to `http://localhost:3000`.

## Usage

- **For Users**:
  - Sign up or log in to your account.
  - Browse products and add items to your cart.
  - View and manage your cart, then proceed to checkout.
  - View your order history.

- **For Administrators**:
  - Log in to the admin dashboard.
  - Add new products to the catalog.
  - View a list of all registered users.

## Contributing

Feel free to fork the project and submit pull requests. Please ensure your changes are well-tested.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to modify this README file as needed based on your project's specifics or additional features you may want to highlight.
