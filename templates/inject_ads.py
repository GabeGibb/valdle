import os
from bs4 import BeautifulSoup

# Define a dictionary for the ad scripts
ad_dict = {
    "left-banner-ad": {
        "type": "web",
        "script": '''
<div id="ntv_2096408"></div>
<script defer type="text/javascript">
(function(d) {
    var params =
    {
        bvwidgetid: "ntv_2096408",
        bvlinksownid: 2096408,
        rows: 4,
        cols: 1,
        textpos: "below",
        imagewidth: 150,
        mobilecols: 1,
        cb: (new Date()).getTime()
    };
    params.bvwidgetid = "ntv_2096408" + params.cb;
    d.getElementById("ntv_2096408").id = params.bvwidgetid;
    var qs = Object.keys(params).reduce(function(a, k){ a.push(k + '=' + encodeURIComponent(params[k])); return a},[]).join(String.fromCharCode(38));
    var s = d.createElement('script'); s.type='text/javascript';s.async=true;
    var p = 'https:' == document.location.protocol ? 'https' : 'http';
    s.src = p + "://cdn.hyperpromote.com/bidvertiser/tags/active/bdvws.js?" + qs;
    d.getElementById(params.bvwidgetid).appendChild(s);
})(document);
</script>
        '''
    },
    "right-banner-ad": {
        "type": "web",
        "script": '''
<div id="ntv_2096408"></div>
<script defer type="text/javascript">
(function(d) {
    var params =
    {
        bvwidgetid: "ntv_2096408",
        bvlinksownid: 2096408,
        rows: 4,
        cols: 1,
        textpos: "below",
        imagewidth: 150,
        mobilecols: 1,
        cb: (new Date()).getTime()
    };
    params.bvwidgetid = "ntv_2096408" + params.cb;
    d.getElementById("ntv_2096408").id = params.bvwidgetid;
    var qs = Object.keys(params).reduce(function(a, k){ a.push(k + '=' + encodeURIComponent(params[k])); return a},[]).join(String.fromCharCode(38));
    var s = d.createElement('script'); s.type='text/javascript';s.async=true;
    var p = 'https:' == document.location.protocol ? 'https' : 'http';
    s.src = p + "://cdn.hyperpromote.com/bidvertiser/tags/active/bdvws.js?" + qs;
    d.getElementById(params.bvwidgetid).appendChild(s);
})(document);
</script>
        '''
    }
}

# List of HTML files to be modified
html_files = [
    "guessAbility.html",
    "guessAgent.html",
    "guessMap.html",
    "guessQuote.html",
    "guessWeapon.html",
    "valdle.html"
]

# Directory containing the HTML files
directory = "./"

# Function to inject HTML tags directly into the body and remove old ones
def inject_html_tags(file_path, ad_dict):
    # Open and parse the HTML file with BeautifulSoup
    with open(file_path, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'lxml')
    
    # Remove any existing ads with a data-ad-group attribute
    remove_previous_ads(soup)
    
    # Add each ad script directly into the <body> tag
    body_tag = soup.find('body')
    if body_tag:
        for key, obj in ad_dict.items():
            ad_div = soup.new_tag('div', **{'class': f"ad-{obj['type']} {key}", 'data-ad-key': key, 'data-ad-group': True})
            ad_div.append(BeautifulSoup(obj['script'], 'html.parser'))  # Parse the script and append as raw HTML
            body_tag.append(ad_div)
    else:
        print(f"No closing <body> tag found in {file_path}")
        return
    
    # Write the modified content back to the file with utf-8 encoding
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(str(soup.prettify(formatter=None)))  # Prevents unnecessary escaping


# Function to remove previously injected ads by identifying divs with data-ad-group
def remove_previous_ads(soup):
    # Find and decompose (remove) all div elements with a data-ad-group attribute
    for ad_group in soup.find_all('div', {'data-ad-group': True}):
        ad_group.decompose()

# Iterate over each HTML file and inject the tags
for html_file in html_files:
    file_path = os.path.join(directory, html_file)
    inject_html_tags(file_path, ad_dict)

print("HTML ads have been successfully injected and old ads removed.")
