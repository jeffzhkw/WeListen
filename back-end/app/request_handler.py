from flask import request, session, jsonify, render_template

import requests
import jwt

from app import app
from app.search import formulate_response, search_youtube_url
from app.follow import add_follow, fetch_follow
from app.user import add_new_user
from app.comments import add_comment
from app.activity import post_one_activity, get_activities_oneuser



@app.route('/search', methods = ['GET'])
def handle_stream_request():
    title = request.args.get('title', '')
    artist = request.args.get('artist', '')
    print("reached flask", title, artist)

    res = jsonify(formulate_response(title,artist))

    return res

@app.route('/getActivity', methods = ['GET'])
def get_activity():
    username = request.args.get('username')
    following = fetch_follow(username)['followings']
    posts = {}
    for person in following:
        posts[person] = get_activities_oneuser(person)
    print(posts)





@app.route('/postActivity', methods = ['POST'])
def post_activity():
    songID = request.form['songID']
    creator = request.form['username']
    content = request.form['content']

    # return post time in format: Sat Dec  4 19:08:43 2021
    return post_one_activity(songID,content,creator)

@app.route("/newUser", methods = ['GET','POST'])
def add_new_user_to_db():
    if request.method == 'POST':
        username = request.form['username']
        res = add_new_user(username)
        return jsonify({"result": res})
    return render_template('base.html')



@app.route("/follow", methods = ['GET'])
def handle_follow_request():
    follower = request.args.get('username')
    followee = request.args.get('other')

    res = jsonify(add_follow(follower, followee))
    return res

@app.route("/getFollowers", methods = ['GET'])
def display_follows():
    user = request.args.get('username')

    res = jsonify(fetch_follow(user))
    return res

@app.route("/writeComment", methods = ['POST'])
def handle_new_comment():
    user = request.form['username']
    song = request.form['songID']
    ts = request.form['timestamp']
    comments = request.form['comments']

    res = jsonify(add_comment(user, song, ts, comments))
    return res

@app.route("/youtubeDetail", methods=['GET'])
def get_youtube_detail():
    youtubeURL = request.args.get('songID')
    return jsonify(formulate_response(youtubeURL,''))



# starting point
#if __name__ == '__main__':
    #app.run(port=3000, debug=True)
