
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from API_KEYS import db_url
print("running1")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
CORS(app)
db = SQLAlchemy(app)

from app import request_handler, models