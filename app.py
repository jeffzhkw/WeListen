from flask import render_template, request, session, url_for, redirect, jsonify
from flask.templating import render_template

import requests
import jwt

from init import *
from search import *


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
