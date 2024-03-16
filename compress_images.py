import os
from PIL import Image

# Loop through all directories and files
for root, dirs, files in os.walk('./Valorant Maps'):
    print('hi')
    for file in files:
        # Check if the file is an image
        if file.lower().endswith(('.png', '.jpg', '.jpeg')):
            # Get the full path of the image file
            image_path = os.path.join(root, file)

            # Open the image using PIL
            image = Image.open(image_path)

            # Convert the image to lossless webp format
            webp_path = image_path.replace(os.path.splitext(file)[1], '.webp')
            image.save(webp_path, 'webp', lossless=True)

            # Optional: Delete the original image file
            os.remove(image_path)

            print(f"Compressed {file} to {webp_path}")
