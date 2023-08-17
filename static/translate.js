const languageList = {
    "en-US": {
        "languageName": "English",
    },
    "es-ES": {
        "languageName": "Español",
    }
}

$(function() {
    var value;
    if (localStorage.getItem("language")) {
        value = localStorage.getItem("language");
    }
    else {
        value = "en-US";
    }

    // $("#selectedOption").attr("value", value);
    // $("#selected-flag").attr("src", '/static/images/flags/' + value + '.png');
    // $("#selected-option").text(languageList[value]["languageName"]);
    // $("#selectedOption").text(languageList[value]["languageName"]);
    updateSelected();
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


function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'languageSelector');
  }
