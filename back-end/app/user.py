from app.models import *
from sqlalchemy.exc import SQLAlchemyError

def add_new_user(user):

    new_user = User(username = user)
    db.session.add(new_user)
    try:
        db.session.commit()
        return True
    except SQLAlchemyError:
        print("insert to db failed: duplicated username not allowed")
        return False
