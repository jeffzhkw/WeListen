from googleapiclient.discovery import build
import pafy

from API_KEYS import *
from app.models import *

YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

def search_youtube_url(title, artist):
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
                    developerKey=DEVELOPER_KEY)

    # search for the top result using songname and author
    # https://developers.google.com/youtube/v3/docs/search#resource
    search_response = youtube.search().list(q = title+" "+artist, part='id,snippet',maxResults=1).execute()

    # videoId = search_response['items'][0]['id']['videoId']
    #print(search_response)
    return search_response['items']



def insert_new_song(id, title, artist,):
    newSong = Song(songID=id, songName=title,songArtist=artist)
    db.session.add(newSong)
    db.session.commit()



# prepare the format for returning search song request
# return a python dictionary
def formulate_response(songID):
    response_dict = {}

    # use search function
    search_response = search_youtube_url(songID, "")
    print("here")
    print(search_response)

    #extract information
    songID = search_response[0]['id']['videoId']
    print(songID)
    url = "https://www.youtube.com/watch?v="+songID
    channelName = search_response[0]['snippet']['channelTitle']
    songTitle = search_response[0]['snippet']['title']
    thumbnails = search_response[0]['snippet']['thumbnails']

    #query in database using songID
    songInDB = Song.query.filter_by(songID=songID).first()
    comment = TimedComment.query.filter_by(tcSong=songID).all()
    if not songInDB:
        insert_new_song(songID,title,artist)


    # get data
    # use pafy to convert webstie url to a audio stream url
    # TODO: Still bugging gdata=False
    #video = pafy.new(url, gdata=False)
    video = pafy.new(url, basic=False)
    # print(video.length)
    duration = video.length
    num_likes = video.likes
    num_views = video.viewcount
    video_title = video.title
    audio = video.getbestaudio()
    audio_url = audio.url

    response_dict = {
                     "artist":channelName,
                     "audio_stream": audio_url,
                     "comment": comment,
                     "songID": songID,
                     "thumbnails": thumbnails,
                     "duration": duration,
                     "num_likes": num_likes,
                     "video_title": video_title,
                     }
    print(response_dict)
    return response_dict
