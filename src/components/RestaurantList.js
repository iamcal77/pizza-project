

import React, { useEffect, useState } from 'react';
import './RestaurantList.css'

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch restaurant data from backend
    fetch('/restaurants')
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data); 
      });
  }, []);

  return (
    <div>
      <h1>Restaurant List</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <strong>ID:</strong> {restaurant.id} <br />
            <strong>Name:</strong> {restaurant.name} <br />
            <strong>Address:</strong> {restaurant.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantList;
