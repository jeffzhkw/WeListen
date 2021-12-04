from flask import render_template, request, session, url_for, redirect, jsonify

import requests
import jwt

from app import app
from app.search import formulate_response
from app.follow import add_follow, fetch_follow
from app.user import add_new_user
from app.comments import add_comment




@app.route('/search', methods = ['GET'])
def handle_stream_request():
    title = request.args.get('title', '')
    artist = request.args.get('artist', '')
    print("reached flask", title, artist)

    res = jsonify(formulate_response(title,artist))

    return res

@app.route("/newUser", methods = ['POST'])
def add_new_user_to_db():
    username = request.form['username']
    add_new_user(username)

    return True

'''
@app.route("/getUser", methods = ['POST'])
def get_user_info():
    username = request.form['username']

    #TODO: form database, phrase into a JSON file

    return #THE JSON file;
'''

@app.route("/follow", methods = ['GET'])
def handle_follow_request():
    follower = request.args.get('username')
    followee = request.args.get('other')

    res = jsonify(add_follow(follower, followee))
    return res

@app.route("/getFollows", methods = ['GET'])
def display_follows():
    user = request.args.get('username')

    res = jsonify(fetch_follow(user))
    return res

@app.route("/comment", methods = ['POST'])
def handle_new_comment():
    user = request.form['username']
    song = request.form['songID']
    ts = request.form['timestamp']
    comments = request.form['comments']

    res = jsonify(add_comment(user, song, ts, comments))
    return res



# starting point
#if __name__ == '__main__':
    #app.run(port=3000, debug=True)
