
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from API_KEYS import *


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
CORS(app)
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = "User"
    username = db.Column(db.String(80) ,primary_key = True)


db.create_all()