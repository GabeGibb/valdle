import json
import os
import time
from time import sleep

import requests

# Constants
# VALDLE HASHTAG
BASE_URL = "https://developers.medal.tv/v1/search?categoryId=fW3AZxHf_c&limit=100&text=%23valdle"
# TRENDING
# BASE_URL = "https://developers.medal.tv/v1/trending?categoryId=fW3AZxHf_c&limit=1000"

HEADERS = {
    "Authorization": "pub_1T2PUQmnPFfoxKMmUUfvn7iBWJLosear"
}
USER_X_AUTH = "116581681,32598d6a-367a-41c6-9712-90fc56940382"
OUTPUT_DIR = "static/api/ranks/clips"

# Create output directory if it doesn't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Fetch main content list
response = requests.get(BASE_URL, headers=HEADERS)
content_list = response.json().get("contentObjects", [])

# Prepare data for output
clip_data = []
# TODO: ONLY GET FEATURED + FIGURE OUT HOW TO QA + VERIFY RANKS
for content in content_list:
    user_id = content.get("credits", "").split("/")[-1].strip(")")
    content_id = content.get("contentId")[3:]
    content_url = f"https://medal.tv/api/content/{content_id}"
    content_response = requests.get(content_url, headers={**HEADERS, "X-Authentication": USER_X_AUTH})
    sleep(0.25)

    if content_response.status_code != 200:
        print("Error fetching content for user", user_id, content_response.json())
        continue

    content_data = content_response.json()
    print(content_data.get("supportMatchStats"))

    if content_data.get("supportMatchStats"):# and ("#valdle" in data.get("contentTitle", "") or "#valdle" in data.get("contentDescription", "")):
        match_stats_url = f"https://medal.tv/api/content/{content_data['contentId']}/matchStats"
        match_stats_response = requests.get(match_stats_url, headers={**HEADERS, "X-Authentication": USER_X_AUTH})
        sleep(0.25)

        if match_stats_response.status_code != 200:
            print("Error fetching match stats for content", content_data['contentId'], match_stats_response.json())
            continue


        match_stats = match_stats_response.json()
        for player in match_stats.get("playerDtos", []):
            user = player.get("user", None)
            if user and user.get("userId") == user_id:
                rank = player.get("competitiveTierName", "Unknown")
                share_url = content_data.get("contentShareUrl", "")
                name = player.get("gameName", "Unknown")
                if rank.lower() == "unranked":
                  print("skipped", rank)
                  continue
                print(rank)
                rank = ''.join(filter(lambda x: not x.isdigit(), rank)).upper()

                clip_data.append({
                    "name": name,
                    "rank": rank,
                    "share_url": share_url,
                    "url_for_iframe": share_url.replace("clips", "clip")
                    })

# Save to JSON file
current_unix_time = int(time.time())
output_file = os.path.join(OUTPUT_DIR, f"clip-{current_unix_time}.json")

with open(output_file, "w") as json_file:
    json.dump(clip_data, json_file, indent=4)

print(f"Data saved to {output_file}")
