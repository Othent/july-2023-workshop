import './App.css';
import { useEffect, useState } from 'react';
import { Othent } from 'othent'

function App() {
  
  const [othent, setOthent] = useState('')
  useEffect(() => {
    const initializeOthent = async () => {
      const othentInstance = await Othent({ API_ID: 'd7a29242f7fdede654171a0d3fd25163' });
      setOthent(othentInstance);
    };
    initializeOthent();
  }, []);

  async function logIn() {
    const userDetails = await othent.logIn()
    console.log('User details:', userDetails)
  }

  async function uploadFile(event) {
    const file = event.target.files[0];
    console.log('Uploaded file:', file);

    const signedFile = await othent.signTransactionBundlr({
        othentFunction: 'uploadData', 
        data: file
    });
    console.log('Signed file:', signedFile)

    const transaction = await othent.sendTransactionBundlr(signedFile);
    console.log('Transaction', transaction)
  }

  return (
    <div className="App">

      <button onClick={logIn}>Log in</button>

      <input type="file" onChange={uploadFile} />

    </div>
  );
}

export default App;