import sys
import json
from spotify_services import fetch_spotify_token, get_playlist, search_track
from music_brainz_services import get_release_year
import time

from dotenv import load_dotenv

load_dotenv()


def save_json_file(file_path, data):
    try:
        with open(file_path + ".json", "w", encoding="utf8") as file:
            file.truncate(0)
            json.dump(data, file, indent=4)
        print(f"Data saved to {file_path}")
    except Exception as e:
        print(f"Error saving file: {e}")


def save_sql_file(file_path, sql):
    try:
        with open(file_path + ".sql", "w", encoding="utf8") as file:
            file.truncate(0)
            file.write(sql)
        print(f"SQL saved to {file_path}.sql")
    except Exception as e:
        print(f"Error saving SQL file: {e}")


def generate_sql(file_path, data):
    sql = "INSERT INTO songs (title, artist, album, cover, spotify_url, spotify_uri, spotify_id, release, game) VALUES\n"
    values = []

    for track in data:
        values.append(
            f"""('{track['song'].replace("'", "''")}', 
        '{track['artist'].replace("'", "''")}', 
        '{track['album'].replace("'", "''")}', 
        '{track['cover']}', 
        '{track['spotify_url']}', 
        '{track['spotify_uri']}', 
        '{track['spotify_id']}', 
        {track['release']}, 
        '{file_path}')"""
        )

    sql += ",\n".join(values) + ";"
    return sql


def get_release_year_and_album(song, artist, headers):
    track_data = search_track(song, artist, headers)

    oldest = 3000
    album = ""
    for track in track_data["tracks"]["items"]:
        rawRelease = track["album"]["release_date"]
        year = int(rawRelease.split("-")[0])

        if year < 1900:
            print(f"Invalid year: {year} for track {track['name']}")
            continue
        if year < oldest:
            oldest = year
            album = track["album"]["name"]

    return [oldest, album]


def clean_song_name(song):
    if song.startswith("("):
        songSplit = song.split("(")
        return "(" + songSplit[0] + songSplit[1].split("-")[0].split("(")[0].strip()

    return song.split("-")[0].split("(")[0].strip()


def parse_tracks(data, headers):
    tracks = []
    i = 0

    for item in data:
        i += 1
        track = item.get("track")

        track_info = {
            "song": clean_song_name(track.get("name")),
            "artist": track.get("artists", [{}])[0].get("name"),
            "album": track.get("album", {}).get("name"),
            "cover": track.get("album", {}).get("images", [{}])[0].get("url"),
            "spotify_url": track.get("external_urls", {}).get("spotify"),
            "spotify_uri": track.get("uri"),
            "spotify_id": track.get("id"),
        }

        [year, album] = get_release_year_and_album(
            track_info["song"], track_info["artist"], headers
        )

        mb_year = get_release_year(track_info["song"], track_info["artist"])

        if mb_year is not None and mb_year < year:
            print(
                f"[{i}/{len(data)}] Updating year from {year} to {mb_year} for track {track_info['song']} - {track_info['artist']}"
            )
            track_info["release"] = mb_year
        else:
            if mb_year is not None and mb_year != year:
                print(
                    f"[{i}/{len(data)}] Spotify {year} and music brainz {mb_year} for track {track_info['song']} - {track_info['artist']}"
                )
            track_info["release"] = year
        track_info["album"] = album if album else track_info["album"]

        tracks.append(track_info)

        time.sleep(1)  # To avoid hitting rate limits
    return tracks


def main():
    if len(sys.argv) < 3:
        print(
            "Not enough parameters. Usage: python get-spotify-info.py <playlist_id> <file_path>"
        )
        return

    playlist_id = sys.argv[1]
    file_path = sys.argv[2]

    access_token = fetch_spotify_token()

    headers = {"Authorization": f"Bearer {access_token}"}

    raw_tracks = get_playlist(playlist_id, headers)
    print(len(raw_tracks))
    tracks = parse_tracks(raw_tracks, headers)

    sql = generate_sql(file_path, tracks)

    save_json_file(file_path, tracks)
    save_sql_file(file_path, sql)


if __name__ == "__main__":
    main()
