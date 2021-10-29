# from flask import Flask
# from flask import render_template

# app = Flask(__name__)


# @app.route('/')
# def hello():
#     return render_template("index.html")


from flask import Flask
from flask.templating import render_template
app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")


# starting point
if __name__ == '__main__':
    app.run()