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
app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

@app.route('/search',methods = ['GET', 'POST'])
def get_stream():
    # test url = "https://www.youtube.com/watch?v=fB8TyLTD7EE"

    if request.method == 'POST':

        url = request.form['songname']
        print(url)

        video = pafy.new(url)
        audio = video.getbestaudio()
        audio_url = audio.url
        #audio = video.getbest()
        return audio_url


    else:
        print("ERROR: fail to play song")
    # search.html only for debugging, not associate with react yet
    return render_template("search.html")


# starting point
if __name__ == '__main__':
    app.run()