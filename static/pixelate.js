function disableSmoothRendering(ctx) {
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  return ctx;
}

function Pixelate(image, blurFactor) {
  this.image = image;
  this.blurFactor = blurFactor;
  this.initialLoadIn();
}

Pixelate.prototype.render = function() {

  this.origCanvas.width = Math.floor(this.image.width / this.blurFactor);
  this.origCanvas.height = Math.floor(this.image.height / this.blurFactor);

  var w = this.origCanvas.width;
  var h = this.origCanvas.height;

  // clear original pixelated image
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // Draws updated blurFactor-sized image in hidden canvas
  this.ctx2.drawImage(this.pixelImage, 0, 0, w, h);

  // stretch the smaller image
  this.ctx.drawImage(this.origCanvas, 0, 0, w, h, 0, 0, this.width, this.height);

  $(this.image).css("display", "none");
  return this;
};

Pixelate.prototype.initialLoadIn = function() {
  var imageLoaded = function() {

    this.imageUrl = this.image.src;
    this.width = this.image.clientWidth;
    this.height = this.image.clientHeight;

    this.canvas = document.createElement('canvas'); // houses displayed pixelated image
    this.origCanvas = document.createElement('canvas'); // houses original shrunk image
    this.canvas.style.display = 'none';
    this.origCanvas.style.display = 'none';

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.origCanvas.width = Math.floor(this.image.width / this.blurFactor);
    this.origCanvas.height = Math.floor(this.image.height / this.blurFactor);

    this.canvas.style.cssText = 'image-rendering: optimizeSpeed;' + // FireFox < 6.0
                        'image-rendering: -moz-crisp-edges;' + // FireFox
                        'image-rendering: -o-crisp-edges;' +  // Opera
                        'image-rendering: -webkit-crisp-edges;' + // Chrome
                        'image-rendering: crisp-edges;' + // Chrome
                        'image-rendering: -webkit-optimize-contrast;' + // Safari
                        'image-rendering: pixelated; ' + // Future browsers
                        '-ms-interpolation-mode: nearest-neighbor;'; // IE

    this.ctx = this.canvas.getContext('2d');
    this.ctx2 = this.origCanvas.getContext('2d');
    this.ctx = disableSmoothRendering(this.ctx);
    this.ctx2 = disableSmoothRendering(this.ctx2);

    this.image.parentNode.appendChild(this.canvas, this.image);

    this.updatePixelImage();
  }.bind(this);

  this.image.onload = imageLoaded;
}

Pixelate.prototype.updatePixelImage = function() {
  this.pixelImage = new Image();
  this.pixelImage.onload = function() {
    this.render();
  }.bind(this);
  this.pixelImage.src = this.imageUrl;

};

Pixelate.prototype.updateBlurFactor = function(newBlurFactor) {
  this.blurFactor = newBlurFactor; // Update the stored blurFactor
  this.updatePixelImage(); // Recreate the pixelated image with the new blurFactor
};

Pixelate.prototype.turnIntoOriginalImage = function() {
  this.canvas.style.display = 'none';
  $(this.image).css({"visibility": "visible", "display": "flex"});
}