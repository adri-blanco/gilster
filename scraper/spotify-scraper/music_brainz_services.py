import requests

HEADERS = {"User-Agent": "ReleaseYearFetcher/1.0 ( adriblabla@gmail.com )"}


def get_artist_id(artist_name):
    url = "https://musicbrainz.org/ws/2/artist/"
    params = {"query": f"artist:{artist_name}", "fmt": "json", "limit": 1}
    response = requests.get(url, params=params, headers=HEADERS)
    response.raise_for_status()
    results = response.json().get("artists", [])
    return results[0]["id"] if results else None


def get_release_year(song_title, artist_name):
    artist_id = get_artist_id(artist_name)
    if not artist_id:
        print(f"Artist '{artist_name}' not found.")
        return None

    url = "https://musicbrainz.org/ws/2/recording/"
    params = {
        "query": f'"{song_title}" AND arid:{artist_id}',
        "fmt": "json",
        # "limit": 5,
    }

    response = requests.get(url, params=params, headers=HEADERS)
    response.raise_for_status()
    recordings = response.json().get("recordings", [])

    all_dates = []
    for recording in recordings:
        releases = recording.get("releases", [])
        for release in releases:
            date = release.get("date")
            if date:
                year = date.split("-")[0]
                if year.isdigit():
                    all_dates.append(int(year))

    return min(all_dates) if all_dates else None
