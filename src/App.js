import './App.css';
import { useEffect, useState } from 'react';
import { Othent } from 'othent'

function App() {
  
  const [othent, setOthent] = useState('')
  const [user, setUser] = useState()
  const [txId, setTxId] = useState("")

  useEffect(() => {
    const initializeOthent = async () => {
      const othentInstance = await Othent({ API_ID: 'd7a29242f7fdede654171a0d3fd25163' });
      setOthent(othentInstance);
    };
    initializeOthent();
  }, []);

  async function logIn() {
    const userDetails = await othent.logIn()
    setUser(userDetails)
    console.log('User details:', userDetails)
  }

  async function logOut() {
    const logOutResponse = await othent.logOut()
    setUser(null)
    setTxId("")
    console.log('logOut Response:', logOutResponse)
  }

  async function uploadFile(event) {
    const file = event.target.files[0];
    console.log('Uploaded file:', file);

    if (!file) return;

    const signedFile = await othent.signTransactionBundlr({
        othentFunction: 'uploadData', 
        data: file,
        tags: [ {name: "Content-Type", value: file.type } ]
    });
    console.log('Signed file:', signedFile)

    const transaction = await othent.sendTransactionBundlr(signedFile);
    console.log('Transaction', transaction)

    if (transaction.success)
        setTxId(transaction.transactionId)
  }

  return (
    <div className="App" style={styles.app}>

        {user && <img src={user.picture} alt="avatar" style={styles.avatar} />}

        <button onClick={!user ? logIn : logOut}>{!user ? "Log in" : "Log out"}</button>

        {user && <h2>Hello, {user.name}</h2>}

        {user && <input type="file" onChange={uploadFile} disabled={!user} style={styles.input}/>}

        {txId && <a href={`https://arweave.net/${txId}`} alt="" target="_blank" rel="noreferrer">Uploaded File</a>}

    </div>
  );
}

export default App;

const styles = {
    app: {
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    avatar: {
        width: "2em",
        height: "2em",
        borderRadius: "2em",
        marginBottom: "1em"
    },
    input: {
        marginBottom: "1em"
    }
}