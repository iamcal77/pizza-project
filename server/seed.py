from models import db, Restaurant, Pizza, RestaurantPizza
from app import app


def seed_database():
    # Sample restaurants
    restaurants = [
        {"name": "Sottocasa NYC", "address": "298 Atlantic Ave, Brooklyn, NY 11201"},
        {"name": "PizzArte", "address": "69 W 55th St, New York, NY 10019"},
        {"name": "PizzArte", "address": "69 W 55th St, New York, NY 10019"},

    ]

    # Sample pizzas
    pizzas = [
        {"name": "Cheese", "ingredients": "Dough, Tomato Sauce, Cheese"},
        {"name": "Pepperoni", "ingredients": "Dough, Tomato Sauce, Cheese, Pepperoni"},
      
    ]

    # Populate restaurants
    for restaurant_data in restaurants:
        restaurant = Restaurant(**restaurant_data)
        db.session.add(restaurant)
        db.session.commit()

    # Populate pizzas
    for pizza_data in pizzas:
        pizza = Pizza(**pizza_data)
        db.session.add(pizza)
        db.session.commit()

    
    restaurant_pizzas = [
        {"restaurant_id": 1, "pizza_id": 1, "price": 20},
        {"restaurant_id": 2, "pizza_id": 2, "price": 15},
        
    ]

    for association_data in restaurant_pizzas:
        association = RestaurantPizza(**association_data)
        db.session.add(association)
        db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        seed_database()
    print("Database seeded successfully.")
