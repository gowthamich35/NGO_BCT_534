import {useState} from 'react';
import './DesignPage.css'; 
const DesignPage = ({ account , contract , web3}) => {
  const[Donor_bal, setDonor_bal] = useState("");
  const[Donor_ad, setDonor_ad] = useState("");
  const[manager_name,setManager_name] = useState("");
  const[manager_location,setManager_loc] = useState("");
  const[manager_ad,setManager_ad] = useState("");
  const[manager_id,setManager_id] = useState("");
  const[T_amount,setT_amount] = useState("");
  const[To_address,setTo_address] = useState("");
  const[to_address,setToDuplicate_address] = useState("");
  const[to_amount,setToDuplicateAmount] = useState("");
  const[Donate,setDonate] = useState("");
  async function donor_details()
  {
    const d_bal = parseInt(Donor_bal);
    const d_ad = Donor_ad;
    await contract.methods.addDonors(Donor_bal,Donor_ad).send({from: account});
  }
  async function add_managers()
  {
    const m_id = parseInt(manager_id);
    const m_name = manager_name;
    const m_loc = manager_location;
    const m_ad = manager_ad;
    const gas = await contract.methods.addingManger(m_id,m_name,m_ad,m_loc).estimateGas({ from: account });

    await contract.methods.addingManger(m_id,m_name,m_ad,m_loc).send({from: account, gas});
  }
  async function add_to_addresses() {
    const t_amount = parseInt(to_amount);
    const t_ad = to_address;
  
    try {
      // Estimate gas
      const gas = await contract.methods.addToad(t_amount, t_ad).estimateGas({ from: account });
  
      // Get gas price
      const gasPrice = await web3.eth.getGasPrice();
  
      // Calculate gas fee
      const gasFee = gas * gasPrice;
  
      console.log('Gas Fee:', web3.utils.fromWei(gasFee.toString(), 'ether'), 'ETH');
  
      // Perform transaction with calculated gas fee
      const tx = await contract.methods.addToad(t_amount, t_ad)
        .send({ from: account, gas, gasPrice });
  
      console.log('Transaction Hash:', tx.transactionHash);
    } catch (error) {
      console.error('Error occurred:', error);
    }

  }
  
  async function Transactions()
  {
    const amt = Number(T_amount);
    const to_addr = To_address;
    await contract.methods.Transaction(amt,to_addr).send({from: account});
  }
  async function donation()
  {
    const damt = Donate;
    const gas = await contract.methods.Donation(Number(damt)).estimateGas({ from: account });

    await contract.methods.Donation(damt).send({from: account,gas: gas});
  }
  return (
    <div className="design-page-container">
      <h1 className="text-5xl mb-10 mt-10 text-white">Welcome to NGO Transactions and Donations</h1>
      <br></br>
      <h1 className='text-5xl text-amber-100 text-center'>Adding Manager</h1>
      <br/>
      <div className='formContainer'>
        <div className='formField'>
        <label className='text-3xl my-10 text-white'>Enter Manager ID</label>
        <input type="number" 
        placeholder="Manager ID"
        className="inputField"
        value={manager_id} onChange={(e) => setManager_id(e.target.value)} required/>
        <br/>
        <label className='text-3xl my-10'>Enter Manager Name</label>
        <input type="text" 
        placeholder="Manager Name"
        className="inputField"
        value={manager_name} onChange={(e) => setManager_name(e.target.value)} required/>
        <br/>
        <label className='text-3xl my-10'>Enter Manager Address</label>
        <input type="text" 
        placeholder="Manager Address"
        className="inputField"
        value={manager_ad} onChange={(e) => setManager_ad(e.target.value)} required/>
        <br/>
        <label className='text-3xl my-10'>Enter Manager Location</label>
        <input type="text" 
        placeholder="Manager Location"
        className="inputField"
        value={manager_location} onChange={(e)=>setManager_loc(e.target.value)} required/>
        <br/>
        <button className='ml-10'type="submit" onClick={() => {add_managers(); alert('Added Manager to NGO'); }}>Add Manager</button>
    </div>
    </div>
    <h1 className='text-5xl text-amber-100 text-center'>Adding Donor</h1>
      <br/>
      <div className='formContainer'>
        <div className='formField'>
        <label className='text-3xl my-10'>Enter Donor Address</label>
        <input 
        type="text"
        placeholder="Donor Address"
        className="inputField"
        value={Donor_ad} onChange={(e) => setDonor_ad(e.target.value)} required/>
        <br/>
        <label className='text-3xl my-10'>Enter Donor Balance</label>
        <input type="Number" 
        placeholder="Donor Balance"
        className="inputField"
        value={Donor_bal} onChange={(e) => setDonor_bal(e.target.value)} required/>
        <br/>
        <button className='ml-10'type="submit" onClick={() => { donor_details(); alert('Added Donor Details'); }}>Add DONOR</button>
        <br/>
        </div>
    </div>
    <h1 className='text-5xl text-amber-100 text-center'>Adding Accounts</h1>
    <br/>
    <div className='formContainer'>
      <div className='formField'>
        <label className='text-3xl my-10'>Enter To Amount to Transfer</label>
        <input type="float" 
        placeholder="Amount to be Added"
        className="inputField"
        value={to_amount} onChange={(e) => setToDuplicateAmount(e.target.value)} required/>
        <br/>
        <label className='text-3xl my-10'>Enter 'To' Address</label>
        <input type="text"
        placeholder='To Duplicate Address'
        className="inputField"
        value={to_address} onChange={(e) => setToDuplicate_address(e.target.value)} required/>
        <br/>
        <button className='ml-10' type="submit" onClick={() => {add_to_addresses(); alert('Amount Added to Duplicate Account');}}>Add To Address</button>
      </div>
    </div>
    <h1 className='text-5xl text-amber-100 text-center'>Do Transactions</h1>
    <br/>
    <div className='formContainer'>
      <div className='formField'>
        <label className='text-3xl my-10'>Enter Amount to be Transacted</label>
        <input type="float" 
        placeholder="Amount to be Transacted"
        className="inputField"
        value={T_amount} onChange={(e) => setT_amount(e.target.value)}/>
        <br/>
        <label className='text-3xl my-10'>Enter To Address</label>
        <input type="text"
        placeholder='To address'
        className="inputField"
        value={To_address} onChange={(e) => setTo_address(e.target.value)}/>
        <button className='ml-10' type="submit" onClick={() => {Transactions(); alert('Amount Transaction Sent');}}>Transact</button>
      </div>
    </div>
    <h1 className='text-5xl text-amber-100 text-center'>Donate Here</h1>
    <br/>
    <div className='formContainer'>
      <div className='formField'>
        <label className='text-3xl my-10'>Enter Amount to Donated</label>
        <input type="float" 
        placeholder="Amount to be Donated"
        className="inputField"
        value={Donate} onChange={(e) => setDonate(e.target.value)}/>
        <br/>
        <button className='ml-10' type="submit" onClick={() => {donation(); alert('Amount Donated');}}>Donate</button>
      </div>
    </div>
  </div>
  );
};

export default DesignPage;



// import { useState } from 'react';

// const DesignPage = ({ contract, account, web3 }) => {
//     // Add your Dapp's specific functionality here
//     const [val, setVal] = useState("");
//     const [storedValue, setStoredValue] = useState("");

//     // Handler for storing value
//     const handleStoreValue = async () => {
//         // Convert input value to number
//         const valueToStore = parseInt(val);
        
//         // Call the contract method to store the value
//         await contract.methods.store(valueToStore).send({ from: account });

//         // Update stored value state
//         setStoredValue(valueToStore);
//     };

//     // Handler for retrieving stored value
//     const handleRetrieveValue = async () => {
//         // Call the contract method to retrieve the stored value
//         const retrievedValue = await contract.methods.retrieve().call();
//         const valParsed = web3.utils.toNumber(retrievedValue)
//         // Update stored value state
//         setStoredValue(valParsed);
//     };

//     return (
//         <div className="w-full h-full flex flex-col items-center p-8">
//             <div className='flex'>
//                 <h2>Welcome to Your Dapp</h2>
//                 <p className='ml-4'>Connected Account: {account}</p>
//             </div>

//             <div className='bg-slate-500 w-full h-full rounded-2xl flex justify-center items-center'>
//                 <input 
//                     type="number" 
//                     value={val} 
//                     onChange={(e) => setVal(e.target.value)} 
//                     className="input-style"
//                 />
//                 <button onClick={handleStoreValue} className="button-style">Store Value</button>
//                 <button onClick={handleRetrieveValue} className="button-style">Retrieve Value</button>
//             </div>

//             <p className="mt-4">Stored Value: {storedValue}</p>
//         </div>
//     );
// };

// export default DesignPage;
