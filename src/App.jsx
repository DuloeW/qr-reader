import { Html5QrcodeScanner } from 'html5-qrcode'
import React, { useEffect } from 'react'

const App = () => {

  useEffect(() => {
    // startDetection()
    startDetection2()
  }, [])

  const startDetection = () => {
    
    const scanner = new Html5QrcodeScanner('barcode-detection', {
      qrbox: {
        width: 200,
        height: 200,
      },
      fps: 20,
    });

    const success = (result) => {
      console.log(result)
      document.getElementById("result").innerHTML = `
      <h2>Success</h2>
      <p><a href="${result}">${result}</a></p>
      `
      scanner.clear()
    }

    const error = (error) => {
      console.log(error)
    }

    scanner.render(success, error);

  }

  const startDetection2 = async () => {
    console.log("Starting detection");

    let video = document.getElementById('barcode-detection-video');
    video.srcObject = await navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}});
    await video.play();

    let barcodeDetector = new BarcodeDetector({formats: ["qr_code"]});

    setTimeout(async () => {
        let canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        let context = canvas.getContext('2d');

        let checkForQrCode = async function () {
            console.log("Checking for QR code");

            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            let barcodes = await barcodeDetector.detect(canvas);

            if (barcodes.length > 0) {
                let barcodeData = barcodes[0].rawValue;
                alert("Detected barcode " + barcodeData);
            }

            // Check again in 10ms
            setTimeout(() => requestAnimationFrame(checkForQrCode), 10);
        };

        await checkForQrCode();
    }, 1000);
}

  return (
    <div>
      <video id='barcode-detection-video' style={{width: "100%"}}></video>
      <div id='barcode-detection' style={{width: 400}}></div>
      <div id="result"></div>
    </div>
  )
}

export default App