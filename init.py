
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

class Song(db.Model):
    __tablename__="Song"
    songID = db.Column(db.String(80) ,primary_key = True)
    songName = db.Column(db.String(80))
    songArtist = db.Column(db.String(80))


class TimedComment(db.Model):
    __tablename__ = "TimedComment"
    tcID = db.Column(db.Integer, primary_key = True)
    tcSong = db.Column(db.String(80))
    tcCreator = db.Column(db.String(80))
    tcTimeStamp = db.Column(db.DateTime(timezone=False))
    tcText = db.Column(db.String())

db.create_all()