// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/access/Ownable.sol";

contract LegacyKey is Ownable(0x02e7520482045E2bA8a127C5d0D6E40a17024127){
    struct person {
        string nombre; 
        string nacimiento;
        string genero;
        string _address;
        string email;        
        address password;
        string id;
        uint contDate;
    }

    struct diagnosis {
        string nombre; 
        string date;
        string diagnosis;
        string treatment;
        string notes;        
        string[] exams;
    }

    struct hospital{
        string nombre;
        address password;
        string tlf;
        string _address;
        string speciality;
        string pais;
    }

    mapping (address => person) public personas;
    mapping (address => mapping (address => bool) ) public loginPatient;
    mapping (address => mapping (address => bool) ) public loginHospital;
    mapping (address => mapping (uint => diagnosis)) public history;
    mapping(address => hospital) public hospitales;

    function checkPatient(address _id, address _pass ) external onlyOwner view returns (bool) {
        return loginPatient [_id][_pass];
    }

    function checkHospital(address _id, address _pass ) external onlyOwner view returns (bool) {
        return loginHospital [_id][_pass];
    }

    function registerPerson(address _identity, string memory _nombre, string memory _nacimiento ,string memory _genero, 
        string memory _address, string memory _email, address _password, string memory _id) external onlyOwner {        
        personas[_identity].nombre =_nombre;
        personas[_identity].nacimiento =_nacimiento;
        personas[_identity].genero = _genero;
        personas[_identity]._address  = _address;
        personas[_identity].email     = _email;
        personas[_identity].password   = _password;
        personas[_identity].id        = _id;
        loginPatient[_identity][_password]=true;
    }

    function getDiagnosis(address _identity, uint _num) external onlyOwner view returns (diagnosis memory){
        return history[_identity][_num];
    }
    
    function getDiagnosisArray(address _identity, uint _num) external onlyOwner view returns (string[] memory){
        return history[_identity][_num].exams;
    }

    function registerDiagnostic(address _identity, string memory _date, string memory _diag, string memory _treat,
        string memory _notes, string[] memory _exams) external onlyOwner{
        personas[_identity].contDate+=1;
        uint _num = personas[_identity].contDate;
        history[_identity][_num].date =_date;
        history[_identity][_num].diagnosis    = _diag;
        history[_identity][_num].treatment   = _treat;
        history[_identity][_num].notes        = _notes;
        history[_identity][_num].exams    = _exams;
        
    }

    function addHospital(address _identity, string memory name, address _password, string memory _tlf, string memory _address , 
        string memory _speciality, string memory _pais )external onlyOwner{
        hospitales[_identity] .nombre = name ;
        hospitales[_identity ].password  = _password;
        hospitales[_identity].tlf    =  _tlf   ;
        hospitales[_identity]._address =  _address      ;
        hospitales[_identity].speciality = _speciality  ;
        hospitales[_identity].pais = _pais;
        loginHospital[_identity][_password]=true;
    }


}
