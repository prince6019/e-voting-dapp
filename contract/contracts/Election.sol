// SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;

import "hardhat/console.sol";

error Election_NotAdmin();
error Election_VoterNotVerified();

contract Election {
    // state variables
    address private immutable i_admin;
    uint256 private candidateCount;

    // structs
    struct Admin {
        address admin;
        string name;
        bool isVerified;
        bool isRegistered;
        bool hasVoted;
    }

    struct Candidate {
        string name;
        address candidate;
        string partyName;
        string slogan;
        uint256 votes;
    }

    struct Voter {
        address voter;
        bytes32 dataHash;
        bool isRegistered;
        bool isVerified;
        bool hasVoted;
    }

    // structs arrays
    address[] private Voters;
    Candidate[] private Candidates;

    // mapping
    mapping(address => Voter) private voterDetails;
    mapping(uint => Candidate) private candidateDetails;
    mapping(address => uint) private votedDetail;

    // events----
    event CandidateAdded(string, address, string, string);
    event VoterRegistered(address voter, string data, string phoneNo);

    constructor() {
        i_admin = msg.sender;
        candidateCount = 1;
    }

    modifier onlyAdmin() {
        if (msg.sender != i_admin) {
            revert Election_NotAdmin();
        }
        _;
    }

    function addCandidate(
        string calldata _name,
        address _candidate,
        string calldata _partyName,
        string calldata _slogan
    ) external onlyAdmin {
        Candidates[candidateCount] = Candidate(
            _name,
            _candidate,
            _partyName,
            _slogan,
            0
        );
        candidateCount++;
        emit CandidateAdded(_name, _candidate, _partyName, _slogan);
    }

    function registerVoter(
        string memory _aadhar,
        string memory _phoneNo
    ) external {
        bytes32 data = bytes32(
            keccak256(abi.encodePacked(_aadhar, _phoneNo, msg.sender))
        );
        voterDetails[msg.sender] = Voter(msg.sender, data, true, false, false);
        console.logBytes32(data);

        emit VoterRegistered(msg.sender, _aadhar, _phoneNo);
    }

    function verifyVoter(address _voter) external onlyAdmin {
        require(voterDetails[_voter].isVerified != true);
        voterDetails[_voter].isVerified = true;
    }

    function Vote(uint _candidateId) external {
        if (!voterDetails[msg.sender].isVerified) {
            revert Election_VoterNotVerified();
        }
        if (voterDetails[msg.sender].hasVoted) {
            uint candidate = votedDetail[msg.sender];
            candidateDetails[candidate].votes--;
        }

        candidateDetails[_candidateId].votes++;
    }

    // Getter Functions -----------

    function getAdmin() external view returns (address) {
        return i_admin;
    }

    function getCandidate() external view returns (Candidate[] memory) {
        return Candidates;
    }

    function getVoterDetails() external view returns (Voter memory) {}
}
