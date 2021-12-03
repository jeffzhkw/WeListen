from flask import render_template, request, session, url_for, redirect, jsonify


import requests
import jwt

from app import app
from app.search import formulate_response



@app.route('/search', methods = ['GET'])
def handle_stream_request():
    title = request.args.get('title', '')
    artist = request.args.get('artist', '')
    print("reached flask", title, artist)

    res = jsonify(formulate_response(title,artist))

    return res

@app.route("/newUser", methods = ['POST'])
def deliver_newuser_todb():
    username = request.form['username']

    #TODO: insert to db
    return True

@app.route("/getUser", methods = ['POST'])
def get_user_info():
    username = request.form['username']

    #TODO: form database, phrase into a JSON file

    return #THE JSON file;

# starting point
#if __name__ == '__main__':
    #app.run(port=3000, debug=True)
