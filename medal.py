import requests

url = "https://developers.medal.tv/v1/latest?categoryId=fW3AZxHf_c&limit=10&text=%23valdle"
headers = {
  "Authorization": "pub_1T2PUQmnPFfoxKMmUUfvn7iBWJLosear"
}

response = requests.get(url, headers=headers)
print(response.json())