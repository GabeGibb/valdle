
from json import load

f = open('static/api/maps.json')
m1 = load(f)
f.close()

f = open('static/api/newMaps.json')
m2 = load(f)
f.close()

for i in range(len(m1)):
    # print('m1', m1[i]['displayName'], len(m1[i]['callouts']), 'm2', m2[i]['displayName'], len(m2[i]['callouts']))
    c1 = m1[i]['callouts']
    c2 = m2[i]['callouts']
    for j in range(len(m1[i]['callouts'])):
        if c1[j]['regionName'] != c2[j]['regionName'] or c1[j]['superRegionName'] != c2[j]['superRegionName']:
            
            print(m1[i]['displayName'], c1[j]['regionName'] + c1[j]['superRegionName'], c2[j]['regionName'] + c2[j]['superRegionName']) 
