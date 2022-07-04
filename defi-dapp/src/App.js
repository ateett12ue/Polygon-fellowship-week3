import './App.css';
import React, {useEffect, useState} from "react"
import contractAbi from "./Abi/valut.json"
import {ethers} from "ethers"
function App() {
  const [account, setAccount] = useState("");
  const [deposit, setDeposit] = useState("");
  const [withdraw, setWithdraw] = useState("0.001")
  const [ethPrice, setEthPrice] = useState(-1);
  const contractAddress = "0x0d6712258223eeecb587ecC101eCA75277Ea190e"
  const abi = contractAbi.abi;
  const { ethereum } = window;
  useEffect(() => {
    checkForConnection();
  }, [])

  const connectWallet = async() => {
      const {ethereum} = window;
      if(!ethereum)
      {
        alert("Wallet not present")
      }
      else
      {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        console.log("Account Connected", accounts[0]);
        setAccount(accounts[0]); 
      }
  }
  const checkForConnection = async() => {
      if (!ethereum) {
        alert("Wallet not present");
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found", account);
        setAccount(account);
      } else {
        console.log("No authorized account found")
      }
  }

  const handleDeposit = async (event) => {
    event.preventDefault();
    const res = await depositEth();
    console.log('handleDeposit',res);
  }

  const handleWithdraw = async (event) => {
    event.preventDefault();

    const res = await withdrawEth();
    console.log('handleWithdraw',res);
  }

  const withdrawEth = async () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const amt = ethers.utils.parseEther(withdraw);
        const Txn = await contract.withdraw({gasLimit: 300000});
        await Txn.wait();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const depositEth = async () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const amt = ethers.utils.parseEther(deposit);
        const Txn = await contract.deposit(amt.toString(), {value: amt, gasLimit: 300000});
        await Txn.wait();

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="App">
      <div className="AppContainer">
        <div className="header">
         Decentralised Financing
        </div>
        <br/>

        {!account ? (
          <button className="connecButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) 
        :
        (
        <div>
        <br/>
        <div className="boxContainer">
        <form onSubmit={handleDeposit}>
          <div className='formItems'>
          <div className='form'>
            <div className='label'>Enter amount of ETH to deposit:</div>
            <input
            className='input'
              type="number" 
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              step="any"
            />
            </div>
            <input type="submit" className='button'/>
            </div>
        </form>

        <br/>
        <form onSubmit={handleWithdraw}>
        <div className='formItems'>
        <div className='form'>
        <div className='label'> Withdraw deposit</div>
          </div>
          <input type="submit" className='button'/>
          </div>
        </form>
        </div>
        </div>
        )
}
      </div>
    </div>
  );
}

export default App;

