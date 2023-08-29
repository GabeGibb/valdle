let myCanvas = document.createElement('canvas');
myCanvas.id = 'confettiCanvas'
document.body.appendChild(myCanvas);

var myConfetti = confetti.create(myCanvas, {
    resize: true,
    useWorker: true
  });

function winConfetti(){

    var end = Date.now() + (1.25 * 1000);

    var colors = ['#bb0000', '#ffffff'];
    
    (function frame() {
        myConfetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      myConfetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1},
        colors: colors
      });
    
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());


}