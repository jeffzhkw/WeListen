from googleapiclient.discovery import build

DEVELOPER_KEY = ''
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

def search_youtube_url(songname, author):
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
                    developerKey=DEVELOPER_KEY)

    # search for the top result using songname and author
    search_response = youtube.search().list(q = songname+" "+author, part='id,snippet',maxResults=1).execute()

    videoId = search_response['items'][0]['id']['videoId']
    return "https://www.youtube.com/watch?v="+videoId
    #print(videos)


