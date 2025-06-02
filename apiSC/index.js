const express = require('express');
const cors=require('cors');
const {Web3} = require('web3');
const dotenv=require('dotenv');

const app= express();
dotenv.config();

const {RPC_BASEp,adminHC_BASEp, ownerAd, privateKey_owner} = process.env;
const web3 = new Web3(RPC_BASEp);

const abiContractHC=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_identity",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_password",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_tlf",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_address",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_speciality",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_pais",
				"type": "string"
			}
		],
		"name": "addHospital",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_identity",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_diag",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_treat",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_notes",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "_exams",
				"type": "string[]"
			}
		],
		"name": "registerDiagnostic",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_identity",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_nombre",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_nacimiento",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_genero",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_address",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_password",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			}
		],
		"name": "registerPerson",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_pass",
				"type": "address"
			}
		],
		"name": "checkHospital",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_pass",
				"type": "address"
			}
		],
		"name": "checkPatient",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_identity",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "getDiagnosis",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "nombre",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "diagnosis",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "treatment",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "exams",
						"type": "string[]"
					}
				],
				"internalType": "struct LegacyKey.diagnosis",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_identity",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "getDiagnosisArray",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "history",
		"outputs": [
			{
				"internalType": "string",
				"name": "nombre",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "diagnosis",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "treatment",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "notes",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hospitales",
		"outputs": [
			{
				"internalType": "string",
				"name": "nombre",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "password",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tlf",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_address",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "speciality",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "pais",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "loginHospital",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "loginPatient",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "personas",
		"outputs": [
			{
				"internalType": "string",
				"name": "nombre",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "nacimiento",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "genero",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_address",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "password",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "contDate",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contract1 = new web3.eth.Contract(abiContractHC, adminHC_BASEp);

app.use( 
    express.urlencoded({
        extended:true
    })
);

app.use( 
    express.json({
        type: "*/*"
    })
);

app.use(cors());

app.listen(3000, () => {
    console.log('Corriendo en puerto NFT');    
});

app.get('/HC',(req,res)=>{	
    console.log('Api aca');
    res.send(JSON.stringify('Bienvenido al API de HC'));
})

app.post('/login',async(req,res)=>{    
    const data=await contract1.methods.checkPatient(req.body.id,req.body.password).call({from:ownerAd});		
    res.send(JSON.stringify(data));
})

app.post('/loginH',async(req,res)=>{    
    const data=await contract1.methods.checkHospital(req.body.id,req.body.password).call({from:ownerAd});		
    res.send(JSON.stringify(data));
})

app.post('/info',async(req,res)=>{    
    const data=await contract1.methods.personas(req.body.id).call({from:ownerAd})
	res.send(JSON.stringify(data,(key, value) => typeof value === "bigint" ? Number(value) : value,));
})

app.post('/diagcount',async(req,res)=>{    
    const data=await contract1.methods.getDiagnosis(req.body.id, req.body.num).call({from:ownerAd});	
    res.send(JSON.stringify(data));
})

app.post('/register',async(req,res)=>{    
    const data=await registro(req.body.identity,req.body.name,req.body.birth,req.body.gender,req.body.address,req.body.email,req.body.password,req.body.id);	
    res.send(JSON.stringify('Usuario registrado correctamente: '+'\nhttps://base-sepolia.blockscout.com/tx/'+data ));
})

app.post('/registerH',async(req,res)=>{    
    const data=await registroH(req.body.identity,req.body.nombre,req.body.password,req.body.telf,req.body.direccion,req.body.espe,req.body.pais);	
    res.send(JSON.stringify('Hospital registrado correctamente: '+'\nhttps://base-sepolia.blockscout.com/tx/'+data ));
})

app.post('/diagnosis',async(req,res)=>{    
    const data=await diagnosis(req.body.name,req.body.date,req.body.diagnosis,req.body.treatment,req.body.notes,req.body.exams);	
    res.send(JSON.stringify('Diagnostico registrado correctamente: '+'\nhttps://base-sepolia.blockscout.com/tx/'+data ));
})

async function login(id,password){ //un maximo de 50 links
    const nonce = await web3.eth.getTransactionCount(ownerAd, 'pending'); // nonce starts counting from 0
    const block = await web3.eth.getBlock('pending');  
	
    const transaction = {
        'from': ownerAd,
        'to': adminHC_BASEp,
        'value': 0,
        'gas': 30000000,
        'gasPrice': block.baseFeePerGas+BigInt(10000),
        'nonce': nonce,
        'data': contract1.methods.checkPatient(id,password).encodeABI()
    };
    
    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey_owner);	
    const res = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
	 
	return res.transactionHash;
}

async function registro(identity,nombre,nacimiento,genero,direccion,email,password,id){ //un maximo de 50 links
    const nonce = await web3.eth.getTransactionCount(ownerAd, 'pending'); // nonce starts counting from 0
    const block = await web3.eth.getBlock('pending');  
	
    const transaction = {
        'from': ownerAd,
        'to': adminHC_BASEp,
        'value': 0,
        'gas': 30000000,
        'gasPrice': BigInt(15217716)+BigInt(10000),
        'nonce': nonce,
        'data': contract1.methods.registerPerson(identity,nombre,nacimiento,genero,direccion,email,password,id).encodeABI()
    };
    
    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey_owner);  
    const res = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);  
	return res.transactionHash;
}

async function registroH(identity,nombre,password,telf,direccion,espe,pais){ //un maximo de 50 links
    const nonce = await web3.eth.getTransactionCount(ownerAd, 'pending'); // nonce starts counting from 0
    const block = await web3.eth.getBlock('pending');  
	
    const transaction = {
        'from': ownerAd,
        'to': adminHC_BASEp,
        'value': 0,
        'gas': 30000000,
        'gasPrice': BigInt(15093945)+BigInt(10000),
        'nonce': nonce,
        'data': contract1.methods.addHospital(identity,nombre,password,telf,direccion,espe,pais).encodeABI()
    };
    
    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey_owner);  
    const res = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);  
	return res.transactionHash;
}

async function diagnosis(name,date,diagnosis,treatment,notes,exams){ //un maximo de 50 links
    const nonce = await web3.eth.getTransactionCount(ownerAd, 'pending'); // nonce starts counting from 0
    const block = await web3.eth.getBlock('pending');  
	
    const transaction = {
        'from': ownerAd,
        'to': adminHC_BASEp,
        'value': 0,
        'gas': 30000000,
        'gasPrice': block.baseFeePerGas+BigInt(10000),
        'nonce': nonce,
        'data': contract1.methods.registerDiagnostic(name,date,diagnosis,treatment,notes,exams).encodeABI()
    };
    
    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey_owner);  
    const res = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);  
	return res.transactionHash;
}
