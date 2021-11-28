from googleapiclient.discovery import build
import pafy

from init import *

YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

def search_youtube_url(title, artist):
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
                    developerKey=DEVELOPER_KEY)

    # search for the top result using songname and author
    search_response = youtube.search().list(q = title+" "+artist, part='id,snippet',maxResults=1).execute()

    videoId = search_response['items'][0]['id']['videoId']
    #print(search_response)
    return search_response['items']


def insert_new_song(id, title, artist,):
    newSong = Song(songID=id, songName=title,songArtist=artist)
    db.session.add(newSong)
    db.session.commit()


# prepare the format for returning search song request
# return a python dictionary
def formulate_response(title, artist):
    response_dict = {}

    # use search function
    search_response = search_youtube_url(title, artist)
    songID = search_response[0]['id']['videoId']
    url = "https://www.youtube.com/watch?v="+songID
    print(url)
    channelName = search_response[0]['snippet']['channelTitle']

    #query in database for songID
    songInDB = Song.query.filter_by(songID=songID).first()

    if not songInDB:
        insert_new_song(songID,title,artist)
    else:

    #   get data
    # use pafy to convert webstie url to a audio stream url
    video = pafy.new(url)
    audio = video.getbestaudio()
    audio_url = audio.url

    response_dict = {"title":title,
                     "artist":channelName,
                     "youtubeURL": url,
                     "audio_stream": audio_url,
                     "comment": [], #userid, comment_value, time stamp.
                     "liveComment": []
                     }
    print(response_dict)
    return response_dict
