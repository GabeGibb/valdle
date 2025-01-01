let url = "static/api/ranks/ranks_en.json";

let rankUrl = window.env.API_URL + "/guessRank/api/rankOfDay";
let dropdownClone = $("#dropdown").clone();
let shouldSave = true;
let rankData;
$.get(rankUrl, function (data, status) {
	//url defined in current webpage js file
	loadTemplate(url, true, "rank", data["dayId"]);
	randIndex = data["randIndex"];
	medalUrl = data["medalUrl"];
	rankData = data;

	correctImgSrc = data["displayIcon"];
	correctName = data["displayName"];
});

function addTries(tries) {
	shouldSave = false;
	let rows = $("#rankOptions").children();
	for (let i = 0; i < rows.length; i++) {
		if (tries.includes(rows[i].children[1].innerHTML)) {
			rows[i].click();
		}
	}
	shouldSave = true;
}

function doP2Guess(attempt) {}

function isCorrectOption(rankName) {
	if (rankName == dataList[randIndex]["tierName"]) {
		persistP2State();
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

// TODO: Show the guesses

function modeWrongActions() {}

let rankGameOver = false;
function displayPartTwo() {
	rankGameOver = true;
	winConfetti();
	createNextPageBox("ability");
}
