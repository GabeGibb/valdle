let url = "static/api/agents/agents_en.json";
let qUrl = "static/api/quotes/quotes_en.json";
let quoteUrl = window.env.API_URL + "/guessQuote/api/quoteOfDay";

var tempData;
var audioFile;
var quote;
var audioHintTries = 5;

// jQuery.ajaxSetup({async:false});
$.get(quoteUrl, function (data, status) {
	//url defined in current webpage js file
	loadTemplate(url, true, "quote", data["dayId"]);
	// console.log(data)
	randIndex = data["randIndex"];
	randQuoteIndex = data["randQuoteIndex"];

	makeAudioElement();
	getQuoteAndAF(randIndex).then((data) => {
		$("#guessText").text(data["voiceInfo"][randQuoteIndex]["quote"]);
		addAudioElement(data["voiceInfo"][randQuoteIndex]["audioFile"]);
	});
	$("#audioHintText").text("Tries until audio clue: " + audioHintTries);
});

function getQuoteAndAF(randIndex) {
	return fetch(qUrl)
		.then((response) => response.json())
		.then((json) => json[randIndex]);
}

function addTries(tries) {
	templateAddTries(tries);
}

function doP2Guess(attempt) {}

function curGamemode() {
	correctImgSrc = dataList[randIndex]["displayIcon"];
	correctName = dataList[randIndex]["displayName"];
}

function revealAudio() {
	$("#audioHintText").text("Audio clue:");
	$("#audioContainer").css("display", "flex");
}

function displayPartTwo() {
	//WHAT TO DO ON WINNING FIRST MODE
	winConfetti();
	createNextPageBox("home");
	revealAudio();
}

function modeWrongActions() {
	audioHintTries--;
	if (audioHintTries == 0) {
		revealAudio();
	} else if (audioHintTries > 0) {
		var text = $("#audioHintText").text();
		$("#audioHintText").text(text.slice(0, -1) + audioHintTries);
	}
}
