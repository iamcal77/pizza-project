
from flask_migrate import Migrate
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User, Restaurant, Pizza, RestaurantPizza

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pizza.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)

migrate = Migrate(app, db)

CORS(app)

@app.route('/')
def index():
    return "Welcome to the Pizza Restaurant App"

@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    serialized_users = [{'id': user.id, 'username': user.username, 'email': user.email,
                         'password': user.password, 'phonenumber': user.phonenumber} for user in users]
    return jsonify({'users': serialized_users})

@app.route('/users', methods=['POST'])
def create_user():
    user_data = request.get_json()

    # Ensure required data is provided
    if 'username' not in user_data or 'email' not in user_data or 'password' not in user_data:
        return jsonify({'message': 'Username, email, and password are required'}), 400

    # Check if the user already exists
    existing_user = User.query.filter_by(email=user_data['email']).first()
    if existing_user:
        return jsonify({'message': 'User with this email already exists'}), 400

    new_user = User(
        username=user_data['username'],
        email=user_data['email'],
        password=user_data['password'],
        phonenumber=user_data.get('phonenumber')
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully', 'user_id': new_user.id}), 201


@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    restaurant_data = [
        {"id": restaurant.id, "name": restaurant.name, "address": restaurant.address}
        for restaurant in restaurants
    ]
    return jsonify(restaurant_data)


@app.route('/restaurant-pizzas', methods=['GET'])
def get_restaurant_pizzas():
    restaurant_pizzas = RestaurantPizza.query.all()
    restaurant_pizza_data = [
        {"id": restaurant_pizza.id, "restaurant_id": restaurant_pizza.restaurant.id,  "pizza_id": restaurant_pizza.pizza.id, "price": restaurant_pizza.price, "image_url": restaurant_pizza.image_url}
            
        for restaurant_pizza in restaurant_pizzas
    ]
    return jsonify(restaurant_pizza_data)


@app.route('/pizzas', methods=['GET'])
def get_pizzas():
    pizzas = Pizza.query.all()
    pizza_data = [
        {"id": pizza.id, "name": pizza.name, "ingredients": pizza.ingredients, "image_url": pizza.image_url}
        for pizza in pizzas
    ]
    return jsonify(pizza_data)


@app.route('/restaurants', methods=['POST'])
def create_restaurant():
    data = request.json
    name = data.get('name')
    address = data.get('address')

    if not (name and address):
        return jsonify({"errors": ["Validation errors"]}), 400

   


    restaurant = Restaurant(name=name, address=address)

    db.session.add(restaurant)
    db.session.commit()

    return jsonify({"id": restaurant.id, "name": restaurant.name, "address": restaurant.address}), 201



@app.route('/restaurant-pizzas', methods=['POST'])
def create_restaurant_pizza():
    data = request.json
    restaurant_id = data.get('restaurant_id')
    pizza_id = data.get('pizza_id')
    price = data.get('price')

    if not (restaurant_id and pizza_id and price):
        return jsonify({"errors": ["Validation errors"]}), 400

    
    restaurant_pizza = RestaurantPizza(restaurant_id=restaurant_id, pizza_id=pizza_id, price=price)

    db.session.add(restaurant_pizza)
    db.session.commit()

    return jsonify({"id": restaurant_pizza.id, "restaurant_id": restaurant_pizza.restaurant_id, "pizza_id": restaurant_pizza.pizza_id, "price": restaurant_pizza.price}), 201


@app.route('/pizzas', methods=['POST'])
def create_pizza():
    data = request.get_json()
    name = data.get('name')
    ingredients = data.get('ingredients')
    image_url = data.get('image_url')  # Get image url from request data

    if not (name and ingredients):
        return jsonify({"errors": ["Validation errors"]}), 400

    pizza = Pizza(name=name, ingredients=ingredients, image_url=image_url)  # Pass image url when creating pizza

    db.session.add(pizza)
    db.session.commit()

    return jsonify({"id": pizza.id, "name": pizza.name, "ingredients": pizza.ingredients, "image_url": pizza.image_url}), 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5555)




