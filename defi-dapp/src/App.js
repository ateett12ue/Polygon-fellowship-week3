import './App.css';
import React, {useEffect, useState} from "react"
import contract from "./Abi/valut.json"
import {ethers} from "ethers"
function App() {
  const [account, setAccount] = useState("");
  const [deposit, setDeposit] = useState("");
  const [withdraw, setWithdraw] = useState("")
  const contractAddress = "0x8Aa0403017Cfd038475A54CBD36d6754B1446545"
  const abi = contract.abi;

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
    const { ethereum } = window;
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
    console.log(res);
  }

  const handleWithdraw = async (event) => {
    event.preventDefault();

    const res = await withdrawEth();
    console.log(res);
  }

  const withdrawEth = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const amt = ethers.utils.parseEther(withdraw);
        
        const lendContract = new ethers.Contract(contractAddress, abi, signer);
        const waveTxn = await lendContract.withdraw(amt.toString(), {value: amt, gasLimit: 30000});
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const depositEth = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const amt = ethers.utils.parseEther(deposit);
        
        console.log(amt.toString());
        const lendContract = new ethers.Contract(contractAddress, abi, signer);
        console.log("!!" + deposit);
        const waveTxn = await lendContract.deposit(amt.toString(), {value: amt, gasLimit: 30000});
        console.log("Mining...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <div className="AppContainer">
        <div className="header">
         Decentralised Financing
        </div>

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
            <div className='label'>Enter amount of ETH (in wei) to deposit:</div>
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
            <input
              className='input'
              type="number" 
              value={withdraw}
              onChange={(e) => setWithdraw(e.target.value)}
              step="any"
            />
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

