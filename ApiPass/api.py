from flask import Flask, jsonify, request
import  feedparser
from flask_cors import CORS
from ecpy.curves import Curve
from ecpy.keys import ECPublicKey, ECPrivateKey
from sha3 import keccak_256
from web3 import Web3
#from flask.ext.cors import CORS, cross_origin

app=Flask(__name__)
CORS(app)

@app.route("/apipass",methods=['GET'])
def get_msg():
    response = "Bienvenido al encriptador"
    #response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/user",methods=['POST'])
def get_caps():
    print(request.get_json())
    password=request.get_json()
    
    ether = Web3(Web3.HTTPProvider('https://eth-mainnet.g.alchemy.com/v2/XI5n-4e2DEkb-vLW61SkU5GC0vITflWE'))
    hexa_cod=''.join(str(ord(c)) for c in password['password'])
    pv_key = ECPrivateKey(int(hexa_cod,16), Curve.get_curve('secp256k1'))
    pu_key = pv_key.get_public_key()
    eth_addr = ether.to_checksum_address('0x' + keccak_256(pu_key.W.x.to_bytes(32, byteorder='big') + pu_key.W.y.to_bytes(32, byteorder='big')).digest()[-20:].hex())    
    
    response = jsonify({'pass':eth_addr})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    
if __name__== "__main__":
    app.run(debug=True)
