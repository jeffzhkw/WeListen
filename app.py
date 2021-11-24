from flask import Flask, render_template, request
from flask import request
from flask.templating import render_template
from flask import jsonify
from flask_cors import CORS
from API_KEYS import *
import requests
import jwt

from search import *
app = Flask(__name__)
CORS(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")



@app.route('/search', methods = ['GET'])
def handle_stream_request():
    title = request.args.get('title', '')
    artist = request.args.get('artist', '')
    print("reached flask", title, artist)

    res = jsonify(formulate_response(title,artist))

    return res

# starting point
if __name__ == '__main__':
    app.run(port=3000, debug=True)
