from time import sleep

import requests
from bs4 import BeautifulSoup

VALORANT_RANKS = set(["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Immortal", "Radiant"])

url = "https://developers.medal.tv/v1/search?categoryId=fW3AZxHf_c&limit=10&text=%23valdle"
headers = {
  "Authorization": "pub_1T2PUQmnPFfoxKMmUUfvn7iBWJLosear"
}

USER_X_AUTH = "116581681,32598d6a-367a-41c6-9712-90fc56940382"

response = requests.get(url, headers=headers)
content_list = response.json().get('contentObjects', [])
for content in content_list:
  user_id = content.get('credits').split('/')[-1].strip(')')
  user_url = f"https://medal.tv/api/content?userId={user_id}&limit=5&offset=0&sortDirection=DESC"
  user_response = requests.get(user_url, headers={**headers, "X-Authentication": USER_X_AUTH})
  sleep(0.5)
  user_data = user_response.json()
  if user_response.status_code != 200:
    print("Error", user_data)
    continue

  for data in user_data:
    if data["supportMatchStats"]:
      match_stats_url = f"https://medal.tv/api/content/{data['contentId']}/matchStats"
      match_stats_response = requests.get(match_stats_url, headers={**headers, "X-Authentication": USER_X_AUTH})
      sleep(0.5)
      match_stats = match_stats_response.json()
      for player in match_stats["playerDtos"]:
        user = player.get("user", None)
        if user:
          if user.get("userId") == user_id:
            rank = player.get("competitiveTierName", "")
            clip_url = content.get('directClipUrl', '').replace("clip", "clips")
            name = player.get("gameName", "Unknown")
            print(f"Rank: {rank}, Clip URL: {clip_url}, Name: {name}")

            if any(val_rank.lower() in rank.lower() for val_rank in VALORANT_RANKS):
              print(rank, "contains a valid rank")
            else:
              print(rank, "does not contain a valid rank")
  

# for content in content_list:
#   clip_url = content.get('directClipUrl')
#   if clip_url:
#     hydrated_url = clip_url.replace("clip", "clips")
#     hydration_response = requests.get(hydrated_url)
#     print(hydrated_url)
#     quit()
#     if hydration_response.status_code == 200:
#       soup = BeautifulSoup(hydration_response.text, 'html.parser')
#       script_tag = soup.find('script', {'id': '__NEXT_DATA__'})
#       if script_tag:
#         hydration_data = script_tag.string
#         print(hydration_data)
#         quit()