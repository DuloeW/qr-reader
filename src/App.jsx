import { Html5QrcodeScanner } from 'html5-qrcode'
import React, { useEffect } from 'react'

const App = () => {

  useEffect(() => {
    startDetection()
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

  return (
    <div>
      {/* <video id='barcode-detection'></video> */}
      <div id='barcode-detection' style={{width: 400}}></div>
      <div id="result"></div>
    </div>
  )
}

export default App