
from json import load

f = open('static/api/maps/maps_en.json')
m1 = load(f)
f.close()

f = open('static/api/maps/maps_tr.json')
m2 = load(f)
f.close()

for i in range(len(m1)):
    print(len(m1[i]["callouts"]), len(m2[i]["callouts"]))
