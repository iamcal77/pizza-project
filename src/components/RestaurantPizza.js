import React, { useState } from 'react';
import './RestaurantPizza.css'

function PizzaForm({ onPizzaAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    price: '',
    image_url: '',  // New field for image URL
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
    fetch('/pizzas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        onPizzaAdded(data);
        setFormData({
          name: '',
          ingredients: '',
          price: '',
          image_url: '',  // Reset image URL field
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
        <div>
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Pizza</button>
      </form>
    </div>
  );
}

export default PizzaForm;
