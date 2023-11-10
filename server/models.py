
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship , validates
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    phonenumber = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    @validates('username')
    def validate_username(self, key, username):
        if len(username) < 5:
            raise ValueError('Username must be at least 5 characters')
        return username

@validates('email')
def validate_email(self, key, email):
    if '@' not in email:
        raise ValueError('Invalid email format. Must contain "@"')
    return email

@validates('password')
def validate_password(self, key, password):
    if not any(char.isdigit() for char in password):
        raise ValueError('Password must contain at least one digit')
    if not any(char.isupper() for char in password):
        raise ValueError('Password must contain at least one uppercase letter')
    if not any(char.islower() for char in password):
        raise ValueError('Password must contain at least one lowercase letter')
    return password

@validates('phonenumber')
def validate_phonenumber(self, key, phonenumber):
    if not str(phonenumber).isdigit() or len(str(phonenumber)) != 10:
        raise ValueError('Phone number must be exactly 10 digits')
    return phonenumber

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










