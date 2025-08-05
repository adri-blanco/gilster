import requests
import os

URL = "https://api.spotify.com/v1"

def fetch_spotify_token():
  client_id = os.environ.get('SPOTIFY_CLIENT_ID')
  client_secret = os.environ.get('SPOTIFY_CLIENT_SECRET')

  auth_response = requests.post('https://accounts.spotify.com/api/token', {
    'grant_type': 'client_credentials',
    'client_id': client_id,
    'client_secret': client_secret,
  })
  auth_data = auth_response.json()
  
  
  
  access_token = auth_data['access_token']
  
  return access_token

def get_playlist(playlist_id, headers):
  get_playlist_url = f"{URL}/playlists/{playlist_id}/tracks"

  response = requests.get(get_playlist_url, headers=headers)
  if response.status_code == 200:
    return response.json()
  else:
    print(f"Error fetching Spotify data: {response.status_code}")
    return None
  
  
def search_track(song, artist, headers):
  url = f"https://api.spotify.com/v1/search?offset=0&type=track&q=track:{song} artist:{artist}"

  response = requests.get(url, headers=headers)
  if response.status_code == 200:
    return response.json()
  else:
    print(f"Error fetching Spotify data: {response.status_code}")
    return None