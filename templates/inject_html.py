import os

# Define a dictionary for the ad scripts (no need to wrap in divs, we'll do that in the code)
ad_dict = {
    "left-banner": '''<script async type="application/javascript" src="https://a.magsrv.com/ad-provider.js"></script>
<ins class="eas6a97888e17" data-zoneid="5453194"></ins>
<script>
  (AdProvider = window.AdProvider || []).push({ serve: {} });
</script>''',
    "bottom-banner": '''<script async type="application/javascript" src="https://a.magsrv.com/ad-provider.js"></script>
<ins class="eas6a97888e17" data-zoneid="5453152"></ins>
<script>
  (AdProvider = window.AdProvider || []).push({ serve: {} });
</script>''',
    "right-banner": '''<script async type="application/javascript" src="https://a.magsrv.com/ad-provider.js"></script>
<ins class="eas6a97888e17" data-zoneid="5453206"></ins>
<script>
  (AdProvider = window.AdProvider || []).push({ serve: {} });
</script>'''
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
    with open(file_path, 'r') as file:
        content = file.read()
    
    # Remove any existing ads by searching for the div with the group identifier
    content = remove_previous_ads(content, ad_group_id)
    
    # Find the closing body tag
    closing_body_index = content.rfind("</body>")
    
    if closing_body_index == -1:
        print(f"No closing </body> tag found in {file_path}")
        return
    
    # Inject new ads wrapped in a parent div with an identifier
    injected_tags = f'<div data-ad-group="{ad_group_id}">\n'
    for key, ad_script in ad_dict.items():
        injected_tags += f'<div class="{key}-ad" data-ad-key="{key}">\n{ad_script}\n</div>\n'
    injected_tags += '</div>\n'  # Close the parent div
    
    # Insert the injected content before the closing body tag
    new_content = content[:closing_body_index] + injected_tags + content[closing_body_index:]
    print(new_content)
    
    # Write the modified content back to the file
    with open(file_path, 'w') as file:
        file.write(new_content)

# Function to remove previously injected ads and associated media queries
def remove_previous_ads(content, ad_group_id):
    div_start_tag = f'<div data-ad-group="{ad_group_id}">'
    div_end_tag = '</div>'
    
    # Start by finding the first occurrence of the ad-group div
    start_index = content.find(div_start_tag)
    
    while start_index != -1:
        # Find the closing div tag after the start tag
        end_index = content.find(div_end_tag, start_index) + len(div_end_tag)
        if end_index != -1:
            # Remove the content between the start and end tags
            content = content[:start_index] + content[end_index:]
        else:
            break  # Stop if the end tag is not found
        
        # Search for the next occurrence of the div start tag
        start_index = content.find(div_start_tag)
    
    return content

# Iterate over each HTML file and inject the tags
for html_file in html_files:
    file_path = os.path.join(directory, html_file)
    inject_html_tags(file_path, ad_dict)

print("HTML ads have been successfully injected and old ads removed.")
