
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates


db = SQLAlchemy()


class RestaurantPizza(db.Model, SerializerMixin):
    __tablename__ = 'restaurant_pizza'
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(
        'restaurant.id'), nullable=False)
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizza.id'), nullable=False)


class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurant'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    pizzas = relationship(
        "Pizza", secondary="restaurant_pizza", back_populates="restaurants")


class Pizza(db.Model, SerializerMixin):
    __tablename__ = 'pizza'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    ingredients = db.Column(db.String(255), nullable=False)
    restaurants = relationship(
        "Restaurant", secondary="restaurant_pizza", back_populates="pizzas")

    @validates('price')
    def validate_price(self, key, price):
        if price < 0 or 35:
            raise AssertionError("Price must between 1 and 30")
        return price

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise AssertionError("Invalid name")
        return name










