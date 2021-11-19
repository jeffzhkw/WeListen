from flask import Flask, render_template, request, session, url_for, redirect
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

@app.route('/login')
def signin():
    cognito_signin_url = 'https://welisten.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=vp29p9t963qcb56f4kjieal1a&redirect_uri=http://localhost:5000/cognito_redirect'
    return redirect(cognito_signin_url)

@app.route('/cognito_redirect')
def cognito_redirect():
    cognito_code = request.args.get('code')

    cognito_domain = 'https://welisten.auth.us-east-2.amazoncognito.com/'

    token_url = f'{cognito_domain}/oauth2/token'
    auth = requests.auth.HTTPBasicAuth(client_id, client_secret)
    params = {
        "grant_type": "authorization_code",
        "client_id": client_id,
        "code": cognito_code,
        "redirect_uri": 'http://localhost:5000/cognito_redirect'
    }
    response = requests.post(token_url, auth=auth, data=params)

    id_token = response.json()['id_token']
    id_token_decoded = jwt.decode(id_token, options={"verify_signature": False})
    print(id_token_decoded)
    user = id_token_decoded['cognito:username']

    
    return redirect(f"/profile/{user}")

# starting point
if __name__ == '__main__':
    app.run()
