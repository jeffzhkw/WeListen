# from flask import Flask
# from flask import render_template

# app = Flask(__name__)


# @app.route('/')
# def hello():
#     return render_template("index.html")


from flask import Flask
from flask import request
from flask.templating import render_template
import pafy

from search import *
app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")



@app.route('/search', methods = ['GET'])
def handle_stream_request():
    title = request.args.get('title', '')
    artist = request.args.get('artist', '')
    url = search_youtube_url(title, artist)
    print(url)

    video = pafy.new(url)
    audio = video.getbestaudio()
    audio_url = audio.url
    
    return audio_url



# starting point
if __name__ == '__main__':
    app.run()