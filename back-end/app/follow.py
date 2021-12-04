from app.models import *
from sqlalchemy.exc import SQLAlchemyError


def add_follow(user, following):
    new_follow = Follow(follower =user, followee = following)
    db.session.add(new_follow)
    try:
        db.session.commit()
    except SQLAlchemyError:
        status = False
        msg = "User not found"
        response_dict = {"status": status,
                         "message": msg, }
        return response_dict

    status = True
    msg = ""
    response_dict = {"status": status,
                     "message": msg,}
    return response_dict


def fetch_follow(user):
    followers = Follow.query.filter_by(followee=user).all()
    followers_ls = []
    for f in followers:
        followers_ls.append(f.follower)

    followings = Follow.query.filter_by(follower=user).all()
    followings_ls = []
    for f in followings:
        followings_ls.append(f.followee)

    response_dict = {"followers": followers_ls,
                     "followings": followings_ls,
                     }
    return response_dict
