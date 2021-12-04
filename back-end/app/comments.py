from app.models import *
from sqlalchemy.exc import SQLAlchemyError

def add_comment(user, song, ts, comments):
    new_tc = TimedComment(tcSong = song, tcCreator = user, tcTimeStamp = ts, tcText = comments)
    db.session.add(new_tc)
    try:
        db.session.commit()
    except SQLAlchemyError:
        status = False
        msg = "User not found"
    else:
        status = True
        msg = ""
    response_dict = {"status": status,
                     "message": msg,}
    return response_dict


