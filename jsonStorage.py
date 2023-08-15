import json
from requests import put, get
from generateDailyAnswers import generateDailyAnswers

generateDailyAnswers()

f = open("dailyAnswers.json")
dailyGameAnswers = json.load(f)
f.close()

binId = '64db06b59d312622a3915ec6'
apiKey = '$2b$10$354hGEwJOHs9iL8O0llsh.c/2xKZd0gHK/n1GPYUtyanzP25KANy6'
url = f'https://api.jsonbin.io/v3/b/{binId}'
headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': apiKey
}

req = put(url, json=dailyGameAnswers, headers=headers)
print(req.text)