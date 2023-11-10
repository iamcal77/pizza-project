import React, { useState } from 'react';
import './RestaurantPizza.css'

function PizzaForm({ onPizzaAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to the server to add the pizza
    // For example, using fetch or axios

    // Assuming the API endpoint is /pizzas and supports POST request
    fetch('/pizzas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Call the onPizzaAdded function passed from the parent component
        onPizzaAdded(data);
        // Clear the form after adding the pizza
        setFormData({
          name: '',
          ingredients: '',
          price: '',
        });
      })
      .catch((error) => console.error('Error adding pizza:', error));
  };

  return (
    <div className="pizza-form">
      <h2>Add a Pizza</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Pizza Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients:</label>
          <input
            type="text"
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Pizza</button>
      </form>
    </div>
  );
}

export default PizzaForm;
