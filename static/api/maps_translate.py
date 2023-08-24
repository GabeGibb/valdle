import json
 
f = open('maps.json')
data = json.load(f)
f.close()

g = open('newMaps.json')
data_es = json.load(g)
g.close()

for i in range(len(data)):
    for j in range(len(data[i]["callouts"])):
        data[i]["callouts"][j]["regionName"] = data_es[i]["callouts"][j]["regionName"]
        data[i]["callouts"][j]["superRegionName"] = data_es[i]["callouts"][j]["superRegionName"]


json_object = json.dumps(data, indent=4)
 
# Writing to sample.json
with open("maps_test.json", "w") as outfile:
    outfile.write(json_object)