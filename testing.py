from app import app
import json
from json import dumps
from generateDailyAnswers import generateDailyAnswers
from app import loadDailyAnswers


@app.route("/doThisIfYouWantToDebug")
def debug():
    f = open("dailyAnswers.json")
    past = json.load(f)
    json_object = dumps(generateDailyAnswers(past), indent=4)
    while True:
        json_object = dumps(generateDailyAnswers(past), indent=4)
        if "Vyse" in json_object:
            break

    with open("dailyAnswers.json", "w") as outfile:
        outfile.write(json_object)
    loadDailyAnswers()
    return json_object


app.run(host="0.0.0.0", port=5001, debug=True)
