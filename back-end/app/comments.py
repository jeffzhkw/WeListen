from app.models import *
from sqlalchemy.exc import SQLAlchemyError
from flask import jsonify

def add_comment(user, song, ts, comments):
    new_tc = TimedComment(tcSong = song, tcCreator = user, tcTimeStamp = ts, tcText = comments)
    db.session.add(new_tc)
    try:
        db.session.commit()
    except SQLAlchemyError:
        status = False
        msg = "Something went wrong"
    else:
        status = True
        msg = ""
    response_dict = {"status": True,
                     "message": "ok"}
    return response_dict

def get_comment_of_song(songID):
    comment = TimedComment.query.filter_by(tcSong=songID).all()
    all_comment = []
    for item in comment:
        one_comment = {
            "tcID": item.tcID,
            "tcSong": item.tcSong,
            "tcCreator": item.tcCreator,
            "tcTimeStamp": item.tcTimeStamp,
            "tcText": item.tcText
        }
        print(type(one_comment["tcTimeStamp"]))
        all_comment.append(one_comment)
    print(all_comment)
    # print(comment[2].tcText)
    return {"comments": all_comment}
