import json
from requests import put, get, post
from generateDailyAnswers import generateDailyAnswers


dailyGameAnswers = generateDailyAnswers()


url = 'https://api.jsonbin.io/v3/b/64db06b59d312622a3915ec6'
headers = {
'X-Master-Key': '$2b$10$354hGEwJOHs9iL8O0llsh.c/2xKZd0gHK/n1GPYUtyanzP25KANy6'
}

req = get(url, headers=headers).json()['record']

dailyGameAnswers['dayId'] = req['dayId'] + 1


binId = '64db06b59d312622a3915ec6'
apiKey = '$2b$10$354hGEwJOHs9iL8O0llsh.c/2xKZd0gHK/n1GPYUtyanzP25KANy6'
url = f'https://api.jsonbin.io/v3/b/{binId}'
headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': apiKey
}

putReq = put(url, json=dailyGameAnswers, headers=headers)



serverUrl = 'https://valdle.gg/ifYouAreAUserPleaseDontDoThisEndpoint'
changeAnswers = get(serverUrl)
print(changeAnswers.content)