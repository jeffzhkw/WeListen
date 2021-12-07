from flask import request, session, jsonify, render_template

import requests
import jwt

from app import app
from app.search import formulate_response, search_youtube_url
from app.follow import add_follow, fetch_follow, remove_follow
from app.user import add_new_user
from app.comments import add_comment, get_comment_of_song
from app.activity import post_one_activity, get_activities_oneuser
from app.favorites import add_favorite, remove_favorite, get_favorites



@app.route('/search', methods = ['GET'])
def handle_stream_request():
    title = request.args.get('title', '')
    artist = request.args.get('artist', '')
    print("reached flask", title, artist)

    res = {"songID": search_youtube_url(title,artist)}
    return jsonify(res)

@app.route('/getActivity', methods = ['GET'])
def get_activity():
    username = request.args.get('username')
    following = fetch_follow(username)['followings']
    print("get username: {}".format(username))
    print(following)
    posts = []
    for person in following:
        aPost = get_activities_oneuser(person)
        for item in aPost:
            post = {
                "postCreator": item.postCreator,
                "postDate": item.postDate,
                "postSong": item.postSong,
                "postCaption": item.postCaption
            }
            posts.append(post)
    print(posts)
    return jsonify({"posts": posts})





@app.route('/postActivity', methods = ['POST'])
def post_activity():
    payload = request.get_json()
    songID = payload['songID']
    creator = payload['username']
    content = payload['content']

    # return post time in format: Sat Dec  4 19:08:43 2021
    return post_one_activity(songID,content,creator)

@app.route("/newUser", methods = ['POST'])
def add_new_user_to_db():
    
    payload = request.get_json()
    username = payload["username"]
    
    res = add_new_user(username)
    return jsonify({"result": res})



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

@app.route("/unfollow", methods = ['GET'])
def handle_unfollow_request():
    user = request.args.get('username')
    unfollow = request.args.get('other')

    res = jsonify(remove_follow(user, unfollow))
    return res

@app.route("/getComment", methods = ['GET'])
def get_comments():
    songID = request.args.get('songID')
    res = get_comment_of_song(songID)

    return jsonify(res)
    #return comments_json

@app.route("/writeComment", methods = ['POST'])
def handle_new_comment():
    payload = request.get_json()
    user = payload['username']
    song = payload['songID']
    ts = payload['timestamp']
    comments = payload['comments']
    #print(user, song, ts, comments): TODO: data correct, database not show

    res = jsonify(add_comment(user, song, ts, comments))
    return res

@app.route("/youtubeDetail", methods=['GET'])
def get_youtube_detail():
    youtubeURL = request.args.get('songID')
    return jsonify(formulate_response(youtubeURL))

@app.route("/addFavorites", methods=['GET'])
def handle_new_favorite():
    user = request.args.get('username')
    song = request.args.get('songID')
    return jsonify(add_favorite(user, song))

@app.route("/removeFavorites", methods=['GET'])
def handle_remove_favorites():
    user = request.args.get('username')
    song = request.args.get('songID')
    return jsonify(remove_favorite(user, song))

@app.route("/getFavorites", methods=['GET'])
def display_favorites():
    user = request.args.get('username')
    return jsonify(get_favorites(user))


# starting point
#if __name__ == '__main__':
    #app.run(port=3000, debug=True)
