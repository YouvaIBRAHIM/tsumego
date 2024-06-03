import json
import re
from enum import Enum
from .extract import scrap_data

class Level(Enum):
  BEGINNER = "beginner"
  INTERMEDIATE = "intermediate"
  ADVANCED = "advanced"

class Player(Enum):
  B = "black"
  W = "white"

def remove_special_char(txt):
  reg = r'[^a-zA-Z0-9]'
  return re.sub(reg," ", txt)

def get_pb_number(url):
  start = url.rfind("/")
  end = url.rfind(".json")
  if start != -1:
    level = remove_special_char(url[start+1:end])
  else:
    level= None
  return level

def convert_letter_to_ascii_num(strs):
  return f'{strs[0]}{ord(strs[1]) - 96}'

def transorm_coords_for_front(arr):
  res = []
  for strs in arr:
    res.append(convert_letter_to_ascii_num(strs))
  return res

def transorm_scrapping_data():
  obj = scrap_data()
  data = []
  issues = []

  for current in obj:
    for c in current['problems']:

      pb_num = get_pb_number(c["url"])
      problem = {
        "level": Level[current["level"]].value,
        "label": f'{current["level"].capitalize()} - {current["first_name"]} {current["last_name"]} - {pb_num}'
      }

      try:

        pb = json.loads(c["pb"])
        sol = pb["SOL"][0]
        if(len(sol[1]) == 2) : sol[1]=convert_letter_to_ascii_num(sol[1])
        problem["AW"] = transorm_coords_for_front(pb["AW"])
        problem["AB"] = transorm_coords_for_front(pb["AB"])
        problem["SZ"] = pb["SZ"]
        problem["SOL"] = sol
        problem["C"] = pb["C"]
        problem['nextToPlay'] = Player[sol[0]].value
        problem['user'] = {
          "first_name": current["first_name"],
          "last_name": current["last_name"],
          "email": f'{current["first_name"]}.{current["last_name"]}@tsumego.com'
        }
        data.append(problem)

      except Exception as e:
        print(f'🧨 ERROR : transform_data ===> {e}')
        problem["url"] = c["url"]
        issues.append(problem)
        print(f'🧨 ERROR : transform_data ===> {issues}')

  return data