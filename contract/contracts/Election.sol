// SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;

import "hardhat/console.sol";

error Election_NotAdmin();
error Election_VoterNotVerified();

contract Election {
    // state variables
    address private immutable i_admin;
    uint256 private candidateCount;
    uint private start;
    uint private end;

    // structs
    struct ElectionDetails {
        string adminName;
        string adminPosition;
        string electionTitle;
        string organizationTitle;
    }

    struct Candidate {
        string name;
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

    ElectionDetails private electionDetails;

    // structs arrays
    Candidate[] private Candidates;

    // mapping
    mapping(address => Voter) private voterDetails;
    mapping(uint => Candidate) private candidateDetails;
    mapping(address => uint) private votedDetail;

    // events----
    event CandidateAdded(string indexed name, string partyName, string slogan);
    event VoterRegistered(address indexed voter, string data, string phoneNo);
    event electionCreated(
        string indexed adminName,
        string indexed electionTitle,
        string adminPosition,
        string organizationTitle
    );

    constructor(
        string memory _adminName,
        string memory _adminPosition,
        string memory _aadhar,
        string memory _phoneNo,
        string memory _electionTitle,
        string memory _organizationTitle
    ) {
        bytes32 data = bytes32(
            keccak256(abi.encodePacked(_aadhar, _phoneNo, msg.sender))
        );
        i_admin = msg.sender;
        candidateCount = 1;

        voterDetails[msg.sender] = Voter(msg.sender, data, true, true, false);

        electionDetails = ElectionDetails(
            _adminName,
            _adminPosition,
            _electionTitle,
            _organizationTitle
        );
        emit electionCreated(
            _adminName,
            _adminPosition,
            _electionTitle,
            _organizationTitle
        );
    }

    modifier onlyAdmin() {
        if (msg.sender != i_admin) {
            revert Election_NotAdmin();
        }
        _;
    }

    function addCandidate(
        string calldata _name,
        string calldata _partyName,
        string calldata _slogan
    ) external onlyAdmin {
        Candidates.push(Candidate(_name, _partyName, _slogan, 0));
        candidateCount++;
        emit CandidateAdded(_name, _partyName, _slogan);
    }

    function initiateElection() external onlyAdmin {
        start = block.timestamp;
        end = start + 1 minutes;
    }

    function registerVoter(
        string calldata _aadhar,
        string calldata _phoneNo
    ) external {
        bytes32 data = bytes32(
            keccak256(abi.encodePacked(_aadhar, _phoneNo, msg.sender))
        );
        voterDetails[msg.sender] = Voter(msg.sender, data, true, false, false);
        emit VoterRegistered(msg.sender, _aadhar, _phoneNo);
    }

    function verifyVoter(address _voter, bool _hasVerified) external onlyAdmin {
        require(voterDetails[_voter].isVerified != true);
        voterDetails[_voter].isVerified = _hasVerified;
    }

    function Vote(uint _candidateId) external {
        if (!voterDetails[msg.sender].isVerified) {
            revert Election_VoterNotVerified();
        }
        if (voterDetails[msg.sender].hasVoted) {
            uint candidate = votedDetail[msg.sender];
            Candidates[candidate].votes--;
        }
        require(block.timestamp >= start && block.timestamp <= end);
        Candidates[_candidateId].votes++;
        voterDetails[msg.sender].hasVoted = true;
    }

    // Getter Functions -----------

    function getAdmin() external view returns (address) {
        return i_admin;
    }

    function getCandidateCount() external view returns (uint256) {
        return candidateCount;
    }

    function getStartTime() external view returns (uint) {
        return start;
    }

    function getEndTime() external view returns (uint) {
        return end;
    }

    function getElectionDetails()
        external
        view
        returns (ElectionDetails memory)
    {
        return electionDetails;
    }

    function getCandidate() external view returns (Candidate[] memory) {
        return Candidates;
    }

    function getCandidateDetails(
        uint _candidateID
    ) external view returns (Candidate memory) {
        return Candidates[_candidateID];
    }

    function getVoterDetails(
        address _voter
    ) external view returns (Voter memory) {
        return voterDetails[_voter];
    }
}
