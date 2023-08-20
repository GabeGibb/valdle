function googleTranslateElementInit() {
    const storedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    new google.translate.TranslateElement({
        defaultLanguage: storedLanguage,
        includedLanguages: 'en,es',  // Languages to display in the dropdown
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

function getLanguageCookie() {
    const value = `; ${document.cookie}`;
    if (document.cookie.indexOf('googtrans=') == -1) {
        return "en"
    }
    const parts = value.split(`; googtrans=`);
    return parts.pop().split(';').shift().substring(6);
}
