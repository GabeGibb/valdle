function googleTranslateElementInit() {
    const storedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    new google.translate.TranslateElement({
        defaultLanguage: storedLanguage,
        includedLanguages: 'en,es',  // Languages to display in the dropdown
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

