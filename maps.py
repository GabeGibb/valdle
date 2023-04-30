from requests import get

x = get('https://valorant-api.com/v1/maps').json()['data']

for map in x:
    if map['displayName'] == 'The Range':
        continue
    print(map['displayName'])
    print('Picture', map['displayIcon'])
    for callout in map['callouts']:
        print(callout)