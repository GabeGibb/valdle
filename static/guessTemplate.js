const tileSpin = [
	{ transform: "rotateY(50deg)", opacity: 0 },
	{ transform: "rotateY(0) ", opacity: 1 },
];

const tileSpinTiming = {
	duration: 500,
	iterations: 1,
};

let dayId;
let persistentData;
let stats;
let hasAlreadyWon = false;

function loadStats(mode) {
	stats = JSON.parse(localStorage.getItem(mode + "Stats"));
	if (localStorage.getItem(mode + "Stats") == null) {
		stats = { dayIds: [], triesList: [] };
		localStorage.setItem(mode + "Stats", JSON.stringify(stats));
	}
}

function addWinToStats() {
	if (hasAlreadyWon) {
		return;
	}
	hasAlreadyWon = true;
	// console.log(stats)
	// console.log(dayId)
	stats["dayIds"].push(dayId);
	stats["triesList"].push(persistentData["triesList"].length);
	localStorage.setItem(persistentData["mode"] + "Stats", JSON.stringify(stats));
}

function loadPersistentData(mode, curDayId) {
	dayId = curDayId;
	loadStats(mode);

	// if (debug){
	//     persistentData = {'dayId' : dayId, 'mode': mode, 'triesList': [], 'currentState': 'p1', 'p2Attempt': '', 'language': 'en}
	//     savePersistentData();
	//     return;
	// }

	persistentData = JSON.parse(localStorage.getItem(mode));

	if (
		localStorage.getItem(mode) == null ||
		persistentData["dayId"] != dayId ||
		(persistentData != null && persistentData["language"] != "en")
	) {
		if (persistentData != null && persistentData["language"] != "en") {
			if (persistentData["currentState"] == "p2") {
				hasAlreadyWon = true;
			}
		}
		persistentData = { dayId: dayId, mode: mode, triesList: [], currentState: "p1", p2Attempt: "", language: "en" };
		savePersistentData();
	}

	if (persistentData["currentState"] == "p2") {
		hasAlreadyWon = true;
	}

	addTries(persistentData["triesList"]);
	if (persistentData["currentState"] == "p2") {
		doP2Guess(persistentData["p2Attempt"]);
	}
}

function templateAddTries(tries) {
	for (let i = 0; i < tries.length; i++) {
		isCorrectOption(tries[i]);
	}
}

function savePersistentData() {
	localStorage.setItem(persistentData["mode"], JSON.stringify(persistentData));
}

function persistAddTry(attempt) {
	persistentData["triesList"].push(attempt);
	savePersistentData();
}

function persistP2Atempt(attempt) {
	if (persistentData["p2Attempt"] != "") {
		return;
	}
	persistentData["p2Attempt"] = attempt;
	savePersistentData();
}

function persistP2State() {
	persistentData["currentState"] = "p2";
	savePersistentData();
	addWinToStats();
}

let dataList;
var randIndex;
let correctImgSrc;
let correctName;
$(window).on("beforeunload", function () {
	$(window).scrollTop(0);
});

// jQuery.ajaxSetup({async:false});
function loadTemplate(url, showButtonImages, mode, curDayId) {
	$("#gameArea").on("dragstart", function (event) {
		event.preventDefault();
	});
	$("#gameArea").css({
		"-khtml-user-select": "none",
		"-o-user-select": "none",
		"-moz-user-select": "none",
		"-webkit-user-select": "none",
		"user-select": "none",
	});
	$.get(url, function (data, status) {
		//url defined in current webpage js file
		dataList = data;
		// console.log(dataList);
		curGamemode(); //IMPORTANT FUNCTION CALLS A MADE FUNCTION TO DO ANYTHING SPECIAL ON LOAD OF GIVEN PAGE
		makeButtons(showButtonImages);
		addEnter();
		loadPersistentData(mode, curDayId);
	});
}

function makeButtons(showButtonImages) {
	let names = document.getElementById("optionNames");
	for (let i = 0; i < dataList.length; i++) {
		let currName = dataList[i]["displayName"];
		let p = document.createElement("p");
		p.textContent = currName;
		p.classList.add("optionNameInButton");
		let button = document.createElement("BUTTON");
		button.classList.add("optionButton");
		button.onclick = function () {
			document.getElementById("searchInput").value = currName;
			validateGuess();
		};
		if (showButtonImages == true) {
			let imgSrc = dataList[i]["displayIcon"];
			button.innerHTML = "<img src=" + imgSrc + ' class = "buttonImages">';
		}

		button.appendChild(p); //adds content to button
		button.style.display = "none";
		names.appendChild(button); //appends button to div
	}
	$("#fullListOfGuesses").empty();
}

function showButtons() {
	$("#optionNames").show();
}

$(document).on("mousedown", function (event) {
	var $trigger = $("#dropdown");
	if ($trigger !== event.target && !$trigger.has(event.target).length) {
		$("#optionNames").hide();
	}
});

let currentFocus = -1;
let pastInputText = "";
function removeActive() {
	$("#optionNames")
		.children()
		.each((index, element) => {
			element.classList.remove("autocompleteActive");
		});
}

function addActive() {
	removeActive();
	let curChildren = getCurButtons();
	if (currentFocus <= -1 || currentFocus >= curChildren.length) {
		$("#searchInput").val(pastInputText);
		return;
	}

	curChildren[currentFocus].classList.add("autocompleteActive");
	let agent = curChildren[currentFocus].children[curChildren[currentFocus].children.length - 1].textContent;
	$("#searchInput").val(agent);
	curChildren[currentFocus].scrollIntoViewIfNeeded(false);
}

function getCurButtons() {
	let curChildren = [];
	$("#optionNames")
		.children()
		.each((index, element) => {
			if (element.style.display != "none") {
				curChildren.push(element);
			}
		});
	return curChildren;
}

function goUpAutocomplete() {
	let curChildren = getCurButtons();
	if (curChildren.length == 0) {
		currentFocus = -1;
		return;
	}
	currentFocus--;
	if (currentFocus < -1) {
		currentFocus = curChildren.length - 1;
	}
	addActive();
}
function goDownAutocomplete() {
	let curChildren = getCurButtons();
	if (curChildren.length == 0) {
		currentFocus = -1;
		return;
	}
	currentFocus++;
	if (currentFocus >= curChildren.length) {
		currentFocus = -1;
	}
	addActive();
}

function addEnter() {
	$("#searchInput").keydown(function (e) {
		let key = e["originalEvent"]["key"];

		if (key == "Enter") {
			validateGuess();
		} else if (key == "ArrowUp") {
			e.preventDefault();
			goUpAutocomplete();
		} else if (key == "ArrowDown") {
			e.preventDefault();
			goDownAutocomplete();
		}
	});

	$("#searchInput").keyup(function (e) {
		let key = e["originalEvent"]["key"];

		if (key == "ArrowUp" || key == "ArrowDown" || key == "ArrowLeft" || key == "ArrowRight") {
		} else {
			if (e.keyCode >= 65 && e.keyCode <= 90) {
				pastInputText = $("#searchInput").val();
			}
			filterFunction();
		}
	});
}

let secondPartFilter = false;
function filterFunction() {
	currentFocus = -1;
	var input, filter, button, i;
	input = document.getElementById("searchInput");
	filter = input.value.toUpperCase();

	div = document.getElementById("optionNames");
	button = div.getElementsByTagName("button");

	for (i = 0; i < button.length; i++) {
		txtValue = button[i].textContent || button[i].innerText;
		let filterIndex = txtValue.toUpperCase().indexOf(filter);
		if ((secondPartFilter && filterIndex == 0) || (filterIndex == 0 && filter.length > 0)) {
			button[i].style.display = "";
		} else {
			button[i].style.display = "none";
		}
	}
}

function animateGuess(parent, child, delayAmount) {
	setTimeout(() => {
		parent.prepend(child);
		child.animate(tileSpin, tileSpinTiming);
	}, delayAmount);
}
let agentP1 = false;
function validateGuess() {
	$("#searchInput").focus();
	let userInput = document.getElementById("searchInput");
	for (let i = 0; i < dataList.length; i++) {
		//TODO: case sens
		if (userInput.value.toUpperCase() == dataList[i]["displayName"].toUpperCase()) {
			if (persistentData["currentState"] == "p1") {
				persistAddTry(dataList[i]["displayName"]);
			} else if (persistentData["currentState"] == "p2") {
				persistP2Atempt(dataList[i]["displayName"]);
			}
			if (agentP1) {
				isCorrectAgentOption(dataList[i]["displayName"]);
			} else {
				isCorrectOption(dataList[i]["displayName"]);
			}

			return true;
		}
	}
	return false;
}

function isCorrectOption(userInput) {
	let guessParent = document.getElementById("fullListOfGuesses");
	let newDiv = document.createElement("div");

	let optionAnswer = dataList[randIndex]["displayName"];

	let text = document.createTextNode(userInput);
	let p = document.createElement("p");
	p.classList.add("guessText");
	p.classList.add("notranslate");

	let optionImg = document.createElement("img");
	let optionImgSrc = dataList[findUserIndex(userInput)]["displayIcon"];
	if (optionImgSrc == null) {
		optionImgSrc = dataList[findUserIndex(userInput)]["levels"][0]["displayIcon"];
	}
	optionImg.src = optionImgSrc;

	optionImg.classList.add("guessImg");

	// Apply different styling for weapons
	if (window.location.href.includes("guessWeapon")) {
		newDiv.classList.add("individualGuessesWeapons");
		p.classList.add("guessTextWeapons");
		optionImg.classList.add("guessImgWeapons");
	}

	newDiv.appendChild(optionImg);
	p.appendChild(text); //adds content to button
	newDiv.appendChild(p); //appends button to div

	if (optionAnswer == userInput) {
		newDiv.classList.add("correctGuess");
		$("#dropdown").remove();
		persistP2State();
		displayPartTwo();
	} else {
		newDiv.classList.add("wrongGuess");
		$("#searchInput").val("");
		removeOption(userInput);
		filterFunction();
		modeWrongActions();
	}
	newDiv.classList.add("individualGuesses");

	animateGuess(guessParent, newDiv, 0);
}

function findUserIndex(userInput) {
	for (let i = 0; i < dataList.length; i++) {
		if (userInput == dataList[i]["displayName"]) {
			return i;
		}
	}
}

function removeOption(name) {
	div = document.getElementById("optionNames");
	button = div.getElementsByTagName("button");
	let index = "empty";
	for (i = 0; i < button.length; i++) {
		txtValue = button[i].textContent || button[i].innerText;
		if (txtValue.toUpperCase() == name.toUpperCase()) {
			button[i].textContent = "";
			button[i].innerText = "";
			index = i;
		}
	}
	if (index != "empty") {
		button[index].remove();
	}
}

function partTwoWin(correctAnswer) {
	$("#dropdown").remove();
	$("#partTwoEndText").html("You Got It!");
	$("#partTwoEndText").addClass("correctTextGuess");
	// $('#partTwoEndText').html('Nice Job!<br>Correct Answer:');
	// $('#partTwoEndTextAnswer').text(correctAnswer);
	// $('#partTwoEndTextAnswer').addClass('correctTextGuess');
}

function partTwoLose(correctAnswer) {
	$("#dropdown").remove();
	$("#partTwoEndText").text("Better Luck Next Time");
	$("#partTwoEndText").addClass("wrongTextGuess");
	// $('#partTwoEndText').html('Better Luck Next Time!<br><br>Correct Answer:')
	// $('#partTwoEndTextAnswer').text(correctAnswer);
	// $('#partTwoEndTextAnswer').addClass('correctTextGuess');
}

function createNextPageBox(nextGame) {
	let nextPageBox = $(
		'<div id="nextPageBox">\
                            <div class="notranslate" id="victoryMessage"><p>GG!</p></div>\
                            <div id="correctGuessDiv">\
                                <img id="correctImg">\
                                <div id="correctTextDiv">\
                                    <p class="notranslate" id="correctGuess">\
                                    <div id="numTriesDiv"><p id="tries">Tries:&nbsp;</p><p class="notranslate" id="numTries"></p></div>\
                                </div>\
                            </div>\
                            <div id="partTwoDiv"></div>\
                            <div id = "endTextDiv"><p id="partTwoEndText"></p><p class="notranslate" id="partTwoEndTextAnswer"></p></div>\
                            <button id="statsButton" onclick="toggleStats()">\
                                <img src="static/images/statsIcon.webp" id="statsImg">\
                                <span id="statsButtonInner">Stats</span>\
                            </button>\
                            <div id="statsColumns" style="display: none;">\
                                <div class="statColumn">\
                                    <div class="statCategory">Total<br>Wins\
                                    <div class="statBorder"></div></div>\
                                    <div class="statInfo"></div>\
                                </div>\
                                <div class="statColumn">\
                                    <div class="statCategory">Average<br>Guesses\
                                    <div class="statBorder"></div></div>\
                                    <div class="statInfo"></div>\
                                </div>\
                                <div class="statColumn">\
                                    <div class="statCategory">Current<br>Winstreak\
                                    <div class="statBorder"></div></div>\
                                    <div class="statInfo"></div>\
                                </div>\
                                <div class="statColumn">\
                                    <div class="statCategory">Highest<br>Winstreak\
                                    <div class="statBorder"></div></div>\
                                    <div class="statInfo"></div>\
                                </div>\
                            </div>\
                            <div id = "nextValdleDiv">\
                                <hr>\
                                <div id = "cd">\
                                    <p id="nextValdleText">Refreshes in&nbsp;</p>\
                                    <p id="nextValdleCountdown"></p>\
                                </div>\
                            </div>\
                            <div id="nextPageButton"></div>\
                        </div>\
		<div style="padding-bottom: 60px"></div>'
	);
	let nextGameText = "";
	let nextPageUrl = "";
	if (nextGame != "home") {
		nextGameText = "Guess the " + nextGame;
		nextPageUrl = "guess" + nextGame.charAt(0).toUpperCase() + nextGame.slice(1);
	} else {
		nextGameText = "Homepage";
	}

	let nextButton = $(
		'\
                        <button id="nextGameButton" class="btn btn--light" onclick="location.href=\'/' +
			nextPageUrl +
			'\'">\
                            <span id = "nextGameButton_inner" class="btn__inner">\
                                <span class="btn__slide"></span>\
                                <span class="btn__content" >' +
			nextGameText +
			"</span>\
                            </span>\
                        </button>"
	);

	setInterval(createAndUpdateTimer, 1000);
	$("body").append(nextPageBox);
	$("#nextPageButton").append(nextButton);
	$("#correctImg").attr("src", correctImgSrc);
	$("#correctGuess").text(correctName);
	$("#numTries").append(persistentData["triesList"].length);

	setTimeout(() => {
		document.getElementById("nextPageBox").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		addShareDiv();
	}, 600);

	showStats();
}

function addShareDiv() {
	let modes = ["map", "agent", "ability", "weapon", "quote"];
	let output = [];
	let modeEmojis = {
		map: "🗺️",
		agent: "🕵️",
		ability: "✨",
		weapon: "🔫",
		quote: "💬",
	};

	for (let i = 0; i < modes.length; i++) {
		let curData = JSON.parse(localStorage.getItem(modes[i]));
		if (curData == null || curData.dayId != dayId || curData.currentState != "p2") {
			return;
		} else {
			let numTries = curData.triesList.length;
			output.push(`${modeEmojis[modes[i]]} ${modes[i].charAt(0).toUpperCase() + modes[i].slice(1)}: ${numTries}`);
		}
	}

	let shareMessage = "Valdle #" + dayId + ":\n" + output.join("\n");
	// Split the shareMessage by newline character
	let shareLines = shareMessage.split("\n");
	shareMessage += "\nhttps://valdle.gg/";

	// Create a new p tag for each line
	let shareHTML = shareLines.map((line) => `<p>${line}</p>`).join("");

	// Modal HTML structure
	let modalHTML = `
        <div id="completionModal" class="modal">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <h2 class="modal-header1">Congrats!</h1>
                <h3 class="modal-header2">You've completed all the challenges for today!</h3>
                <div class="linedeco">
                    <hr>
                </div>
                <div style="padding-top: 10px"></div>
                ${shareHTML}
                <button id="shareButton">Share</button>
            </div>
        </div>
    `;

	$("body").append(modalHTML);

	// Display the modal
	$("#completionModal").show();

	// Close modal functionality
	$(".close-button").click(function () {
		$("#completionModal").hide();
	});

	$(document).click(function (event) {
		if (!$(event.target).closest(".modal-content").length) {
			$("#completionModal").hide();
		}
	});

	// Share button functionality
	$("#shareButton").click(function () {
		$("#shareButton").text("Copied!");
		copyToClipboard(shareMessage);
	});
}
function copyToClipboard(text) {
	navigator.clipboard.writeText(text);
}

function createAndUpdateTimer() {
	// Get the current time in UTC
	let now = new Date();

	// Calculate the next 04:00 AM UTC
	let nextFourAM = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
	nextFourAM.setUTCHours(4, 0, 0, 0); // Set time to 04:00 AM UTC

	// If the current time is past 04:00 AM UTC, calculate for the next day
	if (now.getTime() >= nextFourAM.getTime()) {
		nextFourAM.setUTCDate(nextFourAM.getUTCDate() + 1);
	}

	// Calculate remaining time in seconds
	let rest = (nextFourAM.getTime() - now.getTime()) / 1000;

	const hours = Math.floor(rest / 3600);
	rest = rest - hours * 3600;
	const minutes = Math.floor(rest / 60);
	rest = rest - minutes * 60;
	const seconds = Math.floor(rest);

	// Format time as hh:mm:ss
	let timeString = hours.toString() + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
	$("#nextValdleCountdown").text(timeString);
	$("#nextValdleCountdown2").text(timeString);
}

function toggleStats() {
	if ($("#statsColumns").css("display") == "none") {
		$("#statsColumns").show();
	} else {
		$("#statsColumns").hide();
	}
}

function showStats() {
	// console.log(stats)
	// console.log(persistentData)
	let columns = $("#statsColumns").children();
	columns[0].children[1].innerText = stats["dayIds"].length;

	let tempSum = stats["triesList"].reduce((a, b) => a + b, 0);
	columns[1].children[1].innerText = Math.round((tempSum / stats["triesList"].length) * 100) / 100;

	columns[2].children[1].innerText = getCurrentWinStreak(stats);
	columns[3].children[1].innerText = getHighestWinStreak(stats);
}

function getCurrentWinStreak(statsObj) {
	let pastId = dayId;
	let counter = 0;
	for (let i = statsObj["dayIds"].length - 1; i >= 0; i--) {
		if (statsObj["dayIds"][i] >= pastId - 1) {
			counter++;
		} else {
			return counter;
		}
		pastId = statsObj["dayIds"][i];
	}
	return counter;
}

function getHighestWinStreak(statsObj) {
	let pastId = dayId;
	let counter = 0;
	let highest = 0;
	for (let i = statsObj["dayIds"].length - 1; i >= 0; i--) {
		if (statsObj["dayIds"][i] >= pastId - 1) {
			counter++;
		} else {
			highest = Math.max(highest, counter);
			counter = 1;
		}
		pastId = statsObj["dayIds"][i];
	}
	highest = Math.max(highest, counter);
	return highest;
}
