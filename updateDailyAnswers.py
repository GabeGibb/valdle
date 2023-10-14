import json
from requests import put, get, post
from generateDailyAnswers import generateDailyAnswers

from dotenv import load_dotenv
load_dotenv()
import os
masterKey = os.getenv('MASTER')



url = 'https://api.jsonbin.io/v3/b/64db06b59d312622a3915ec6'
headers = {
'X-Master-Key': masterKey
}

req = get(url, headers=headers).json()['record']

dailyGameAnswers = generateDailyAnswers(req)


binId = '64db06b59d312622a3915ec6'
url = f'https://api.jsonbin.io/v3/b/{binId}'
headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': masterKey
}

putReq = put(url, json=dailyGameAnswers, headers=headers)



serverUrl = 'https://valdle.gg/ifYouAreAUserPleaseDontDoThisEndpoint'
changeAnswers = get(serverUrl)
print(changeAnswers.content)