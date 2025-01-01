let url = "static/api/ranks/ranks_en.json";

let rankUrl = window.env.API_URL + "/guessRank/api/rankOfDay";
let dropdownClone = $("#dropdown").clone();
let shouldSave = true;
let rankData;
let storedTries = [];
$.get(rankUrl, function (data, status) {
	//url defined in current webpage js file
	loadTemplate(url, true, "rank", data["dayId"]);
	randIndex = data["randIndex"];
	medalUrl = data["medalUrl"];
	rankData = data;
});

function doTry(rows, curTry) {
	for (let i = 0; i < 5; i++) {
		let curRow = rows[i].children;
		console.log(curRow);
		if (curRow[1] == curTry) {
			curRow[j].click();
			return;
		}
	}
}

function addTries(tries) {
	storedTries = tries;

	// let rows = $("#rankOptions").children();
	// for (let x = 0; x < tries.length; x++) {
	// 	doTry(rows, tries[x]);
	// }
	// shouldSave = true;
}

function doP2Guess(attempt) {}

function isCorrectOption(rankName) {
	if (rankName == dataList[randIndex]["tierName"]) {
		displayPartTwo();
	}
}

function curGamemode() {
	let medalIframe = $(rankData["iframe"]);
	medalIframe.attr({
		width: "100%",
		height: "500px",
	});
	$("#guessRankDiv").append(medalIframe);
}

function makeButtons() {
	let rankOptionsDiv = $("#rankOptions");

	for (let i = 0; i < dataList.length; i++) {
		const rankOptionDiv = $('<button class="rankOption"></button>');
		const rankOptionName = dataList[i]["tierName"];
		const rankImg = dataList[i]["displayIcon"];
		const rankOption = $('<p class="rankOptionText notranslate">' + rankOptionName + "</p>");
		const rankImgElement = $('<img src="' + rankImg + '" class="rankImg">');
		rankOptionDiv.append(rankImgElement);
		rankOptionDiv.append(rankOption);

		console.log(storedTries);
		if (storedTries.includes(dataList[i]["tierName"])) {
			rankOptionDiv.css("visibility", "hidden");
		}

		rankOptionDiv.click(function () {
			if (!rankGameOver) {
				if (shouldSave) {
					persistAddTry(rankOptionName);
				}
				isCorrectOption(rankOptionName);
				rankOptionDiv.css("visibility", "hidden");
			}
		});

		rankOptionsDiv.append(rankOptionDiv);
	}
}

function modeWrongActions() {}

let rankGameOver = false;
function displayPartTwo() {
	rankGameOver = true;
	winConfetti();
	createNextPageBox("ability");
}
