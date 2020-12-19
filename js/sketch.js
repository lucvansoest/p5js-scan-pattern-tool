/***************************
 * Luc van Soest 2020
 * copied idea from instagram feed https://www.instagram.com/schultzschultzgrafik/
 * Schultzschultz
 * Design studio based in Frankfurt, Germany.
 * www.schultzschultz.com
 ***************************/

let scanLineLength;
let copyScanLineX;
let copyScanLineY = 0;
let copyScanLineRow = 0;

let mirrorLine = 0;

const numberOfRows = 8;

let img;
let imgCopy;

function preload(){

    img = loadImage('img/sample.jpg');
}

function setup() {

    createCanvas(img.width * 2, img.height);

    mirrorLine = width / 2;

    frameRate(60);
    scanLineLength = height / numberOfRows;

    copyScanLineX = 0;

    imgCopy = createImage(img.width, img.height);
    imgCopy.loadPixels();
}
  
function draw() {

    background(240);

    image(img, 0, 0);

    image(imgCopy, mirrorLine, 0);

    if (mouseX < mirrorLine && copyScanLineRow < numberOfRows) {

        let mouseYPosition = mouseY

        //check if line doesn't exit canvas
        if (mouseYPosition < (scanLineLength / 2)) {
            mouseYPosition = (scanLineLength / 2);
        }
        if (mouseYPosition > height - (scanLineLength / 2)) {
            mouseYPosition = height - (scanLineLength / 2);
        }

        let scanLineX = mouseX;
        let scanLineBeginY = mouseYPosition - (scanLineLength / 2);
        let scanLineEndY = mouseYPosition + (scanLineLength / 2);

        let copyScanLineBeginY = copyScanLineY;
        let copyScanLineEndY = copyScanLineY + scanLineLength;
    
        stroke(0, 255, 0);
        strokeWeight(1);

        //scanline
        line(scanLineX, scanLineBeginY, scanLineX, scanLineEndY)   
        //copy scanline  
        line(mirrorLine + copyScanLineX + 1, copyScanLineBeginY, mirrorLine + copyScanLineX + 1, copyScanLineEndY)

        //connect lines
        line(scanLineX, scanLineBeginY, mirrorLine + copyScanLineX + 1, copyScanLineBeginY)    
        line(scanLineX, scanLineEndY, mirrorLine + copyScanLineX + 1, copyScanLineEndY)   

    
        for(let scanLineY = scanLineBeginY; scanLineY <= scanLineEndY; scanLineY++) {
    
            let scanLineCurrentPixelColor = img.get(scanLineX, scanLineY);
    
            //stroke(scanLineCurrentPixelColor);
            //point(copyScanLineX, copyScanLineY)

            imgCopy.set(copyScanLineX, copyScanLineY, scanLineCurrentPixelColor);
    
            copyScanLineY++;
        }

        imgCopy.updatePixels();
    
        copyScanLineY = copyScanLineRow * scanLineLength;
        copyScanLineX++;
    
        if (copyScanLineX > mirrorLine) {
            copyScanLineX = 0;
            copyScanLineRow++;
        }

    }

    if (copyScanLineRow >= numberOfRows) {

        textSize(36);
        strokeWeight(2);
        textAlign(CENTER, TOP);
        text('Press the \'S\' button on your\n keyboard to save the image', 0, height / 3, width);

    }
}

function keyTyped() {

    if (key === 's') {

        imgCopy.save('scanpattern', 'jpg');

    }

  }
  
