from app import db

class User(db.Model):
    __tablename__ = "User"
    username = db.Column(db.String(80) ,primary_key = True)

class Song(db.Model):
    __tablename__="Song"
    songID = db.Column(db.String(80) ,primary_key = True)
    songName = db.Column(db.String(80))
    songArtist = db.Column(db.String(80))
    songThumbnails = db.Column(db.String(80))
    songVidTitle = db.Column(db.String(80))
    songChannelName = db.Column(db.String(80))



class TimedComment(db.Model):
    __tablename__ = "TimedComment"
    tcID = db.Column(db.Integer, primary_key = True)
    tcSong = db.Column(db.String(80))
    tcCreator = db.Column(db.String(80))
    tcTimeStamp = db.Column(db.Integer)
    tcText = db.Column(db.String())

class Follow(db.Model):
    __tablename__ = "Follow"
    follower = db.Column(db.String(80), primary_key = True)
    followee = db.Column(db.String(80), primary_key = True)

class Post(db.Model):
    __tablename__ = "Post"
    postID = db.Column(db.Integer, primary_key=True)
    postCreator = db.Column(db.String(80))
    postDate = db.Column(db.String(80))
    postSong = db.Column(db.String(80))
    postCaption = db.Column(db.String(80))
    # postPublic = db.Column(db.Integer) # post public or not

class Favorite(db.Model):
    __tablename__ = "Favorite"
    favUser = db.Column(db.String(80), primary_key=True)
    favSong = db.Column(db.String(80), primary_key=True)



db.create_all()