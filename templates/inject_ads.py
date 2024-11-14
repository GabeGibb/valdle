import os
from bs4 import BeautifulSoup

# Define a dictionary for the ad scripts
ad_dict = {
  "left-banner": {
    "type": "web",
    "script": '''
<script async type="application/javascript" src="https://a.magsrv.com/ad-provider.js"></script> 
 <ins class="eas6a97888e17" data-zoneid="5453290"></ins> 
 <script>(AdProvider = window.AdProvider || []).push({"serve": {}});</script>
    '''
  },
  "right-banner": {
    "type": "web",
    "script": '''
<script async type="application/javascript" src="https://a.magsrv.com/ad-provider.js"></script> 
 <ins class="eas6a97888e17" data-zoneid="5453292"></ins> 
 <script>(AdProvider = window.AdProvider || []).push({"serve": {}});</script>
    '''
  },
  "mobile-bottom-banner": {
    "type": "mobile",
    "script": '''
<script async type="application/javascript" src="https://a.magsrv.com/ad-provider.js"></script> 
 <ins class="eas6a97888e14" data-zoneid="5453798"></ins> 
 <script>(AdProvider = window.AdProvider || []).push({"serve": {}});</script>
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

# Function to inject HTML tags wrapped in divs with metadata, and remove old ones
def inject_html_tags(file_path, ad_dict, ad_group_id="ad-group"):
    # Open and parse the HTML file with BeautifulSoup
    with open(file_path, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'lxml')
    
    # Remove any existing ads by searching for the div with the group identifier
    remove_previous_ads(soup, ad_group_id)
    
    # UNCOMMENT/COMMENT THE FOLLOWING CODE BLOCK TO ENABLE/DISABLE AD INJECTION
    # Create a new div with data-ad-group and inject the new ads
    # ad_group_div = soup.new_tag('div', **{'data-ad-group': ad_group_id})
    
    # # Add each ad script into the new div
    # for key, obj in ad_dict.items():
    #     ad_div = soup.new_tag('div', **{'class': f"ad-{obj['type']}", 'data-ad-key': key})
    #     ad_div.append(BeautifulSoup(obj['script'], 'lxml'))  # Parse the script and append
    #     ad_group_div.append(ad_div)

    # # Insert the new ads before the closing body tag
    # body_tag = soup.find('body')
    # if body_tag:
    #     body_tag.append(ad_group_div)
    # else:
    #     print(f"No closing <body> tag found in {file_path}")
    #     return
    
    # Write the modified content back to the file with utf-8 encoding
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(str(soup.prettify()))


# Function to remove previously injected ads and associated media queries
def remove_previous_ads(soup, ad_group_id):
    # Find and decompose (remove) the div with data-ad-group
    ad_group = soup.find('div', {'data-ad-group': ad_group_id})
    if ad_group:
        ad_group.decompose()

# Iterate over each HTML file and inject the tags
for html_file in html_files:
    file_path = os.path.join(directory, html_file)
    inject_html_tags(file_path, ad_dict)

print("HTML ads have been successfully injected and old ads removed.")
