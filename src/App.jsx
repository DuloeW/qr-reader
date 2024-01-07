import React, { useEffect } from 'react'

const App = () => {

  useEffect(() => {
    startDetection()
  }, [])

  const startDetection = async () => {
    alert("Start detection")

    let video = document.getElementById("barcode-detection")
    video.srcObject = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })

    let barcodeDetector = new BarcodeDetector({ format: ["ean_13"] })

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
      <video id='barcode-detection'></video>
    </div>
  )
}

export default App