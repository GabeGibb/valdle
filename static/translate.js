$(document).ready(function() {
    // Allows toggle with globe button, between visible and hidden dropdown language menu
    const button = document.getElementById('changeLanguageButton');
    const dropdown = document.getElementById('google_translate_element');

    button.addEventListener('click', function () {
        dropdown.style.visibility = dropdown.style.visibility == "visible" ? "hidden" : "visible";
        dropdown.style.position = dropdown.style.position == "relative" ? "absolute" : "relative";
    });

    $(".goog-te-gadget-icon").attr("id", "testing1");
});

function googleTranslateElementInit() {
    const storedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    new google.translate.TranslateElement({
        defaultLanguage: storedLanguage,
        includedLanguages: 'en,es',  // Languages to display in the dropdown
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

function translatePageContent() {
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    new google.translate.TranslateElement({
        defaultLanguage: selectedLanguage,
        pageLanguage: 'auto',
        includedLanguages: 'en,es',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

