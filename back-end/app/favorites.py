from app.models import *
from sqlalchemy.exc import SQLAlchemyError

def add_favorite(user, song):
    new_fav = Favorite(favUser=user, favSong=song)
    try:
        db.session.add(new_fav)
        db.session.commit()
    except SQLAlchemyError:
        status = False
        msg = "User or song not found"
    else:
        status = True
        msg = "Success"

    response_dict = {"status": status,
                     "message": msg, }

    return response_dict

def remove_favorite(user, song):
    un_fav = Favorite.query.filter_by(favUser=user, favSong=song).first()
    try:
        db.session.delete(un_fav)
        db.session.commit()
    except SQLAlchemyError:
        status = False
        msg = "User or song not found"
    else:
        status = True
        msg = "Success"

    response_dict = {"status": status,
                     "message": msg, }

    return response_dict

def get_favorites(user):
    favorites = Favorite.query.filter_by(favUser=user).all()
    fav_ls = []
    for f in favorites:
        fav_ls.append(f.favSong)

    response_dict = {"favorite_songs": fav_ls,
                     }

    return response_dict