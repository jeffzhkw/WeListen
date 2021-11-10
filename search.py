from googleapiclient.discovery import build
from API_KEYS import *
import pafy

YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

def search_youtube_url(title, artist):
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
                    developerKey=DEVELOPER_KEY)

    # search for the top result using songname and author
    search_response = youtube.search().list(q = title+" "+artist, part='id,snippet',maxResults=1).execute()

    videoId = search_response['items'][0]['id']['videoId']
    return "https://www.youtube.com/watch?v="+videoId

# prepare the format for returning search song request
# return a python dictionary
def formulate_response(title, artist):
    response_dict = {}

    # use search function
    url = search_youtube_url(title, artist)

    # use pafy to convert webstie url to a audio stream url
    video = pafy.new(url)
    audio = video.getbestaudio()
    audio_url = audio.url

    response_dict = {"title":title,
                     "artist":artist,
                     "youtubeURL": url,
                     "audio_stream": audio_url,
                     "comment": [], #userid, comment_value, time stamp.
                     "liveComment": []
                     }
    print(response_dict)
    return response_dict


