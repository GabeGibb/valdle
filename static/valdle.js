const languageList = {
    "en-US": {
        "languageName": "English",
        "websiteSummary": "Guess different parts of VALORANT with the given clues!",
        "button1": {
            "name": "Map",
            "desc": "Guess the map from an image"
        },
        "button2": {
            "name": "Ability",
            "desc": "9 tiles reveal an agent's ability icon"
        },
        "button3": {
            "name": "Weapon",
            "desc": "Guess the weapon from an image"
        },
        "button4": {
            "name": "Quote",
            "desc": "Guess which agent said the quote"
        },
        "button5": {
            "name": "About"
        }
    },
    "es-ES": {
        "languageName": "Español",
        "websiteSummary": "¡Adivina diferentes partes de VALORANT con las pistas dadas!",
        "button1": {
            "name": "Mapa",
            "desc": "Adivina el mapa a partir de una imagen"
        },
        "button2": {
            "name": "Habilidad",
            "desc": "9 fichas revelan el icono de habilidad de un agente"
        },
        "button3": {
            "name": "Arma",
            "desc": "Adivina el arma a partir de una imagen"
        },
        "button4": {
            "name": "Cita",
            "desc": "Adivina qué agente dijo la cita"
        },
        "button5": {
            "name": "Acerca de"
        }
    }
}

// Changes content to stored language on load
$(function() {
    var value;
    if (localStorage.getItem("language")) {
        value = localStorage.getItem("language");
    }
    else {
        value = "en-US";
    }
    $("#selectedOption").attr("value", value);
    $("#selected-flag").attr("src", '/static/images/flags/' + value + '.png');
    $("#selected-option").text(languageList[value]["languageName"]);
    $("#selectedOption").text(languageList[value]["languageName"]);
    $("#websiteSummary").text(languageList[value]["websiteSummary"]);
    $("#button1Name").text(languageList[value]["button1"]["name"]);
    $("#button1Desc").text(languageList[value]["button1"]["desc"]);
    $("#button2Name").text(languageList[value]["button2"]["name"]);
    $("#button2Desc").text(languageList[value]["button2"]["desc"]);
    $("#button3Name").text(languageList[value]["button3"]["name"]);
    $("#button3Desc").text(languageList[value]["button3"]["desc"]);
    $("#button4Name").text(languageList[value]["button4"]["name"]);
    $("#button4Desc").text(languageList[value]["button4"]["desc"]);
    $("#button5Name").text(languageList[value]["button5"]["name"]);
});

$(document).ready(function() {

    // Allows toggle with globe button, between visible and hidden dropdown language menu
    const button = document.getElementById('changeLanguageButton');
    const dropdown = document.getElementById('languageDropdown');

    button.addEventListener('click', function () {
        dropdown.style.visibility = dropdown.style.visibility == "visible" ? "hidden" : "visible";
        dropdown.style.position = dropdown.style.position == "relative" ? "absolute" : "relative";
    });

    // Makes dropdown options
    function addOption(language, label, imagePath) {
        var optionHtml = `
            <div class='option' onclick="selectOption('${language}', '${label}', '${imagePath}')">
                <img src='${imagePath}' alt='${label}'>
                ${label}
            </div>
        `;
        $('#options').append(optionHtml);
    }

    Object.entries(languageList).forEach((entry) => {
        const [key, value] = entry;
        addOption(key, value.languageName, '/static/images/flags/' + key + '.png');
    });

});

// Toggles between showing and not showing dropdown options
function toggleOptions() {
    const options = document.getElementById('options');
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
}

// Selects new language option
function selectOption(value, name, flag) {
    // Updates selected language
    const select = document.getElementById('language-select');
    const selectedOption = document.getElementById('selected-option');
    const selectedFlag = document.getElementById('selected-flag');

    select.value = value;
    selectedOption.textContent = name;
    selectedFlag.src = flag;

    // Updates webpage with translated text
    $("#websiteSummary").text(languageList[value]["websiteSummary"]);
    $("#button1Name").text(languageList[value]["button1"]["name"]);
    $("#button1Desc").text(languageList[value]["button1"]["desc"]);
    $("#button2Name").text(languageList[value]["button2"]["name"]);
    $("#button2Desc").text(languageList[value]["button2"]["desc"]);
    $("#button3Name").text(languageList[value]["button3"]["name"]);
    $("#button3Desc").text(languageList[value]["button3"]["desc"]);
    $("#button4Name").text(languageList[value]["button4"]["name"]);
    $("#button4Desc").text(languageList[value]["button4"]["desc"]);
    $("#button5Name").text(languageList[value]["button5"]["name"]);

    // Set local storage language to chosen
    localStorage.setItem("language", value);

    toggleOptions();
}

// Updates selected option
function updateSelected() {
    const select = document.getElementById('language-select');
    const selectedOption = document.getElementById('selected-option');
    const selectedFlag = document.getElementById('selected-flag');
    const selectedText = select.options[select.selectedIndex].text;
    const selectedValue = select.value;
    
    selectedOption.textContent = selectedText;
    selectedFlag.src = '/static/images/flags/' + selectedValue + '.png';
}