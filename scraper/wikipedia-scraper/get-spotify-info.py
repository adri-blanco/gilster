import sys
import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()

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

def transform_artist(artist):
  return artist.replace(" y ", " & ").replace(" con ", " & ")
  
def fetch_spotify_info(access_token, song):
  
  print(song)
  url = f"https://api.spotify.com/v1/search?limit=1&offset=0&type=track&q=track:{song["song"]} artist:{transform_artist(song["artist"])}"

  headers = {
    'Authorization': f'Bearer {access_token}'
  }

  response = requests.get(url, headers=headers)
  if response.status_code == 200:
    return response.json()
  else:
    print(f"Error fetching Spotify data: {response.status_code}")
    return None

def parse_file(file_path):
  try:
    with open(file_path, 'r') as file:
        content_array = json.load(file)
        print(f"Loaded {len(content_array)} items from {file_path}")
        return content_array

  except FileNotFoundError:
    print(f"Error: File '{file_path}' not found.")
    return []
  except json.JSONDecodeError:
    print(f"Error: File '{file_path}' is not a valid JSON file.")
    return []
  except Exception as e:
    print(f"Error reading file: {e}")
    return []
    
def main():
  if len(sys.argv) < 2:
    print("File parameter not provided.")
    return 
  
  file_path = sys.argv[1]
  
  songs = parse_file(file_path)
  
  token = fetch_spotify_token()
  
  result = []
  for song in songs:
    spotify_info = fetch_spotify_info(token, song)
    if spotify_info["tracks"]["total"] == 0:
      print(f"No tracks found for {song}")
    else:
      item = spotify_info["tracks"]["items"][0]
      
      result.append({
        "song": song["song"],
        "artist": item['artists'][0]['name'],
        "release": song["release"],
        "album": item['album']['name'],
        "cover": item['album']['images'][0]['url'],
        "spotify_url": item['external_urls']['spotify'],
        "spotify_uri": item['uri'],
        "spotify_id": item['id']
      });
      
  output_file = os.path.splitext(file_path)[0] + "_spotify_data.json"
  with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(result, f, indent=2)
  print(f"Spotify data saved to {output_file}")

if __name__ == "__main__":
  main()