

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RestaurantDetail.css'


function RestaurantDetail() {
  const { id } = useParams();
  const [restaurantData, setRestaurantData] = useState({});
  const [pizzaData, setPizzaData] = useState([]);

  useEffect(() => {
    fetch(`/restaurants/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurantData(data);
        setPizzaData(data.pizzas);
      })
      .catch((error) => console.error('Error fetching restaurant detail:', error));
  }, [id]);

  return (
    <div>
      <h1>Restaurant Detail</h1>
      <h2>Restaurant Name: {restaurantData.name}</h2>
      <h3>Restaurant ID: {restaurantData.id}</h3>
      <p>Address: {restaurantData.address}</p>
      <h3>Pizzas:</h3>
      <ul>
        {pizzaData.map((pizza) => (
          <li key={pizza.id}>
            <p>Pizza Name: {pizza.name}</p>
            <p>Pizza ID: {pizza.id}</p>
            <p>Price: ${pizza.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantDetail;
