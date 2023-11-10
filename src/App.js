import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import PizzaList from './components/PizzaList';
import RestaurantPizza from './components/RestaurantPizza';
import SignUp from './components/SignUp';
import Login from './components/Login';
import './App.css';
import pizzaImage from './components/pizza-recipe-1.jpg'; 

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/restaurants">Restaurant</Link>
            </li>
            <li>
              <Link to="/pizzas">Pizza</Link>
            </li>
            <li>
              <Link to="/restaurant-pizzas">Restaurant Pizza</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          <Route path="/pizzas" element={<PizzaList />} />
          <Route path="/restaurant-pizzas" element={<RestaurantPizza />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* Footer */}
        <footer>
  <div>
    <p>&copy; 2023 Pizza Restaurant App</p>
    <p>Address: 123 Delicious Street, Tastyville</p>
    <p>Phone: +1 (555) 123-4567</p>
    <p>Email: info@pizzarestaurantapp.com</p>
  </div>
  
  
</footer>
      </Router>
    </div>
  );
}

function Home() {
  return <div className="home-container">
  <div className="home-header">
    <h1>Welcome to the Pizza Restaurant App</h1>
  </div>
  <div className="home-content">
    <img src={pizzaImage} alt="Pizza-recipe.jpg" />
    <p>
      Explore a variety of delicious pizzas from our top-rated restaurants.
      Choose your favorite toppings and enjoy a delightful dining experience.
    </p>
    <p>
      Whether you're a fan of classic Margherita or adventurous with unique
      flavors, we have something for everyone.
    </p>
    <p>Start your pizza journey with us!</p>
  </div>
</div>
}

export default App;
