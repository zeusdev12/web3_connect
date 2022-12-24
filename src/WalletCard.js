import React, {useState} from 'react'
import {ethers} from 'ethers'
import './WalletCard.css'

const WalletCard = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);//จดจำค่าก่อนได้ถ้ามีการเปลี่ยนแปลงจะรีเฟลชทุกครั้ง ถ้าเปลี่ยนแปลงตลอดเวลาไม่ควรใช้
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');//ค่าเริ่มต้น

	const connectWalletHandler = () => {
		if (window.ethereum) { //ตรวจพบเครือข่ายบริการ Ethereum ตรวจหาผู้ให้บริการที่ window.ethereum เพื่อตรวจสอบว่าเป็น MetaMask หรือไม่
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'}) //ส่ง request ป๊อปอัปและแจ้งให้ผู้ใช้เลือกบัญชีที่ต้องการเชื่อมต่อ
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})


		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
	};


	
	window.ethereum.on('accountsChanged', accountChangedHandler);

	
	return (
		<div className='walletCard'>
		<h4> {"Connection to MetaMask"} </h4>
			<button onClick={connectWalletHandler}>{connButtonText}</button>
			<div className='accountDisplay'>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<div className='balanceDisplay'>
				<h3>Balance: {userBalance}</h3>
			</div>
			{errorMessage}
		</div>
	);
}

export default WalletCard;