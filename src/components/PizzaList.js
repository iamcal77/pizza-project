import React, { useEffect, useState } from 'react';
import './PizzaList.css';

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    // Fetch pizza data from the backend
    fetch('/pizzas')
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data);
      });
  }, []);

  return (
    <div>
      <h1>Pizza List</h1>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            <strong>ID:</strong> {pizza.id} <br />
            <strong>Name:</strong> {pizza.name} <br />
            <strong>Ingredients:</strong> {pizza.ingredients} <br />
            <strong>Image:</strong> <img src={pizza.image_url} alt={pizza.name} /> <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PizzaList;
