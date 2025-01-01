let url = "static/api/ranks/ranks_en.json";

let rankUrl = window.env.API_URL + "/guessRank/api/rankOfDay";
let dropdownClone = $("#dropdown").clone();
let shouldSave = true;

$.get(rankUrl, function (data, status) {
	//url defined in current webpage js file
	loadTemplate(url, true, "rank", data["dayId"]);
	randIndex = data["randIndex"];
});

function doTry(rows, curTry) {
	for (let i = 0; i < 5; i++) {
		let curRow = rows[i].children;
		for (let j = 0; j < 3; j++) {
			if (curRow[j].innerHTML == curTry) {
				curRow[j].click();
				return;
			}
		}
	}
}

function addTries(tries) {
	shouldSave = false;

	let rows = $("#weaponOptions").children();
	for (let x = 0; x < tries.length; x++) {
		doTry(rows, tries[x]);
	}
	shouldSave = true;
}

function doP2Guess(attempt) {}

function curGamemode() {
	dataList = dataList[weaponIndex]["skins"];

	correctImgSrc = dataList[randIndex]["displayIcon"];
	if (correctImgSrc == null) {
		for (let i = 0; i < dataList[randIndex]["levels"].length; i++) {
			if (dataList[randIndex]["levels"][i]["displayIcon"] != null) {
				correctImgSrc = dataList[randIndex]["levels"][i]["displayIcon"];
				break;
			}
		}
	}

	correctName = dataList[randIndex]["displayName"]; //[randIndex]['displayName']
	$("#weaponGuessImage").attr("src", correctImgSrc);
}

function makeRankButtons() {
	let rankOptionsDiv = $("#rankOptions");

	for (let i = 0; i < dataList.length; i++) {
		console.log(dataList[i]);
	}
	// rankOptions.forEach((rank) => {
	// 	let rankContainer = $('<div class="rankContainer"></div>').css({
	// 		display: "flex",
	// 		flexDirection: "column",
	// 		alignItems: "center",
	// 		width: "150px",
	// 	});

	// 	let rankImage = $('<img class="rankImage"/>')
	// 		.attr("src", rank.imageUrl) // Ensure `rank.imageUrl` exists in your data
	// 		.attr("alt", rank.displayName)
	// 		.css({
	// 			width: "100px",
	// 			height: "100px",
	// 			objectFit: "cover",
	// 			borderRadius: "8px",
	// 		});

	// 	let rankName = $('<span class="rankName"></span>')
	// 		.text(rank.displayName) // Ensure `rank.displayName` exists in your data
	// 		.css({
	// 			marginTop: "5px",
	// 			fontSize: "14px",
	// 			fontWeight: "bold",
	// 			textAlign: "center",
	// 		});

	// 	let rankButton = $('<button class="rankButton"></button>')
	// 		.css({
	// 			background: "none",
	// 			border: "none",
	// 			cursor: "pointer",
	// 		})
	// 		.click(function () {
	// 			if (!gameOver) {
	// 				if (shouldSave) {
	// 					persistAddTry(rank.displayName);
	// 				}
	// 				isCorrectOption(rank.displayName);
	// 				rankContainer.css("visibility", "hidden");
	// 			}
	// 		});

	// 	rankButton.append(rankImage).append(rankName);
	// 	rankContainer.append(rankButton);
	// 	rankOptionsDiv.append(rankContainer);
	// });
}

// function makeButtons() {

// 	//OVERWRITE TEMPLATE

// 	// console.log(dataList)

// 	let weaponOptionsDiv = $("#weaponOptions");
// 	for (let i = 0; i < 5; i++) {
// 		let curRow = $('<div class="weaponRow"></div>');
// 		for (let j = 0; j < 3; j++) {
// 			// let option = weaponOptions[(i * 3) + j];
// 			let option = dataList[weaponOptions[i * 3 + j]]["displayName"];
// 			let weaponOption = $('<button class="weaponOption notranslate">' + option + "</button>");
// 			weaponOption.click(function () {
// 				if (!weaponGameOver) {
// 					if (shouldSave) {
// 						persistAddTry(option);
// 					}
// 					isCorrectOption(option);
// 					weaponOption.css("visibility", "hidden");
// 				}
// 			});
// 			curRow.append(weaponOption);
// 		}
// 		weaponOptionsDiv.append(curRow);
// 	}
// }

function modeWrongActions() {}

let rankGameOver = false;
function displayPartTwo() {
	rankGameOver = true;
	winConfetti();
	createNextPageBox("ability");
}
