from app.models import *

def add_new_user(user):
    new_user = User(username = user)
    db.session.add(new_user)
    db.session.commit()