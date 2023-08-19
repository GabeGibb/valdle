$(document).ready(function() {
    // Allows toggle with globe button, between visible and hidden dropdown language menu
    const button = document.getElementById('changeLanguageButton');
    const dropdown = document.getElementById('languageDropdown');

    button.addEventListener('click', function () {
        dropdown.style.visibility = dropdown.style.visibility == "visible" ? "hidden" : "visible";
        dropdown.style.position = dropdown.style.position == "relative" ? "absolute" : "relative";
    });

    $(".goog-te-gadget-icon").attr("id", "testing1");
});

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        includedLanguages: 'en,es',  // Languages to display in the dropdown
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'languageDropdown');
}