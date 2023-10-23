from app import app
import json
from json import dumps
from generateDailyAnswers import generateDailyAnswers
#hi :3

@app.route('/doThisIfYouWantToDebug')
def debug():
    f = open('dailyAnswers.json')
    past = json.load(f)

    json_object = dumps(generateDailyAnswers(past), indent=4)

    with open("dailyAnswers.json", "w") as outfile:
        outfile.write(json_object)
    return json_object

app.run(host='0.0.0.0', debug=True)
# app.run(host='0.0.0.0')