import time
from bs4 import BeautifulSoup
import requests
from yaspin import yaspin

BASE_URL = "https://github.com"
urlsList = ["/sanderland/tsumego/tree/master/problems/1a.%20Tsumego%20Beginner","/sanderland/tsumego/tree/master/problems/1b.%20Tsumego%20Intermediate","/sanderland/tsumego/tree/master/problems/1c.%20Tsumego%20Advanced"]

dataList = []

spinner = yaspin()

def get_level(url):
  index = url.rfind("%20")
  if index != -1:
    level = url[index+3:].upper()
  else:
    level= None
  return level

def get_name(str):
  name = str.split()
  if len(name)>1:
    name = tuple(name[:2])
  else:
    name = tuple("","")
  return name

def get_html(url, limit=None):
  count = 0

  while True:
    req = requests.get(BASE_URL + url)
    if req.status_code != 200:
      print(f'🥊 Error fetching {url}: {req.status_code}')
      raise ConnectionError
    soup = BeautifulSoup(req.content, "html.parser")
    html = list(set(soup.find_all("a", class_="Link--primary", limit=limit)))

    if len(html) >0 and not None in html : break
    count +=1

  if count > 0: spinner.write(f"🔁 retry get folder: {count}")
  return html


def get_problem(url):
  count = 0

  problem = {"pb": None, "url": url}

  while True:
    req = requests.get(BASE_URL + url)
    if req.status_code != 200:
      print(f"Error fetching problem {url}: {req.status_code}")
      raise ConnectionError
    soup = BeautifulSoup(req.content, "html.parser")
    div = soup.find("div", class_="react-file-line html-div")

    if div is not None: break
    count += 1

  if count > 0 : spinner.write(f"🔁 retry get a problem: {count}")
  problem["pb"] = div.text

  return problem

def scrap_data():
  spinner.text = "Start scrapping..."
  spinner.start()
  spinner.color = "green"

  start = time.strftime('%X')
  print(f"started at {start}")

  for url in urlsList:
    html = get_html(url)
    level = get_level(url)
    spinner.write(f"🥋 : {level.upper()} => Nombre de dossiers  = {len(html)}")

    if(html == None): scrap_data()

    for elem in html:
      first_name, last_name = get_name(elem.text)
      href = elem["href"]
      html_problems= get_html(href, limit=20)
      problems = []

      spinner.write(f'🚀 Récupération des problemes de l\'url: {href}')

      if(html_problems == None or len(html_problems) < 20) : get_html(href, limit=20)

      for link in html_problems:
        problems.append(get_problem(link["href"]))
      temp ={
        "level" : level,
        "first_name": first_name,
        "last_name": last_name,
        "href": href,
        "problems": problems
      }
      dataList.append(temp)

  end = time.strftime('%X')
  print(f"finished at {end}")

  spinner.text = ""
  spinner.ok( "Scrapping Done!" )
  return dataList