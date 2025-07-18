from pathlib import Path
import re

import scrapy

class ExtractYearInfoSpider(scrapy.Spider):
    name = "year"

    def clean(row):
      result = [];
      for i in row:
        cleaned_value = i.strip("\n").strip().strip("\"")
        if cleaned_value:
          result.append(cleaned_value)
      return " ".join(result)

    def getYearFromString(release_date):
      year_match = re.search(r'\b(\d{4})\b', release_date.strip().strip("\n"))
      if year_match:
        return year_match.group(1)
      return None
    
    async def start(self):
        urls = []
        for year in range(1966, 2016):
          urls.append(f"https://es.wikipedia.org/wiki/Anexo:Los_n%C3%BAmeros_uno_de_Los_40_Principales_(Espa%C3%B1a)_{year}")
          
        for year in range(2016, 2025):
          urls.append(f"https://es.wikipedia.org/wiki/Anexo:Los_n%C3%BAmeros_uno_de_LOS40_(Espa%C3%B1a)_{year}")

        # urls = ["https://es.wikipedia.org/wiki/Anexo:Los_n%C3%BAmeros_uno_de_Los_40_Principales_(Espa%C3%B1a)_1988"]
        # urls = ["https://es.wikipedia.org/wiki/Anexo:Sencillos_n%C3%BAmero_uno_de_Hot_100_de_1992_(EE._UU.)"]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parseYear)

    def parseYear(self, response):
        table = response.css('table')

        for row in table[0].css("tr"):
          data = row.css("td")
          if len(data) < 3:
            continue
          
          songData = data[1]
          artistData = data[2]
          
          songLink = songData.css("a::attr(href)").get()
            
          if not songLink:
            continue
          
          artist = ExtractYearInfoSpider.clean(artistData.css("*::text").getall())
          song = ExtractYearInfoSpider.clean(songData.css("*::text").getall())
          
          if not artist:
              continue
          
          next_page = response.urljoin(songLink)
          
          yield scrapy.Request(
            url=next_page, 
            callback=self.parseSong,
            meta={
              "song": song,
              "artist": artist,
            }
          )
      
    def parseSong(self, response):
      song = response.meta.get("song")
      artist = response.meta.get("artist")
      
      table = response.css('table')
      
      release_date = None
      for row in table.css("tr"):
        header = row.css('th::text').get()
       
        header = header.strip().strip("\n") if header else ""
        if header == 'Publicación' or header == 'Lanzado' or header == 'Grabación':
          release_date = ExtractYearInfoSpider.getYearFromString(row.css('td::text').get())
          if not release_date:
            possible_dates = row.css('td *::text').getall()
            for date in possible_dates:
              year = ExtractYearInfoSpider.getYearFromString(date)
              if year != None:
                release_date = year
                break
          break

      yield {
        "song": song,
        "artist": artist,
        "release": release_date,
      }
        