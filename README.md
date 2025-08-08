# Gilster

Get a song, try to add it to your timeline in the right position. Good luck

## Spotify crawler

Script that will retrieve all the content from a specific playlist from Spotify. It will take the oldest year of the song from it and from MusicBrainz, to store the old one. This is the solution that had less errors at the end of the process.

To use it, just run:

```console
python get_from_spotify_playlist.py <playlist-id> <name>
```

It will generate two files. One json and one sql.

### Interesting playlists

Hitster
5TOMoP3KEWtRASGeFsksUY

USA Guilty pleasures
4jKBA77Nr1kzMePxZbGVoD

Hitster bingo
46b3PrSVhVEQLnUQVyUPpw

Temazos
0i8fEuY6ffN6Ou53BeIcxY

Summer party
0UY3oVANXRqflE5QjHhaH4

## Wikipedia crawler

Install the packages needed:

```console
cd scraper/wikipedia-scraper
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

In the file `scrapper/gilsterScraper/gilsterScraper/spiders/extract-year-info.py` update the variable `url` with the wikipedia pages where you want to retrieve info. They should be similar to [this one](<https://es.wikipedia.org/wiki/Anexo:Sencillos_n%C3%BAmero_uno_de_Hot_100_de_1992_(EE._UU.)>), with a table that contains the info. It will only retrieve the songs that have their own page.

```console
scrapy crawl year -o output-file.json
```

You'll have a file that would look like the following:

```json
[
  { "song": "Maggie May", "artist": "Rod Stewart", "release": "1971" },
  { "song": "Un beso y una flor", "artist": "Nino Bravo", "release": "1972" },
  ...
]
```

Later, you can retrieve the Spotify info and links with the following command:

```console
python3 get-spotify-info.py output-file.json
```

Update the .env with your own app. It can be created [here](https://developer.spotify.com/dashboard).
