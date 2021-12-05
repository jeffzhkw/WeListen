from app.models import *
# from sqlalchemy.exc import SQLAlchemyError
import time


def post_one_activity(songID, content, username):
    current_time = time.asctime(time.localtime())
    print("current: {}".format(current_time))
    newPost = Post(postSong=songID, postCreator=username,postDate=current_time
                   ,postCaption=content)

    db.session.add(newPost)
    db.session.commit()
    return current_time

def get_activities_oneuser(username):
    posts = Post.query.filter_by(postCreator=username).all()
    print(posts)
    return posts



