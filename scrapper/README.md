# Gilster

Get a song, try to add it to your timeline in the right position. Good luck

## Crawler

Install the packages needed:

```console
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
