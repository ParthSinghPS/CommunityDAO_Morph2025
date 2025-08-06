// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract DAO {

    uint256 public reservedpool;
    uint256 public proposalCount;
    uint256 public leadingProposalId;
    uint256 public leadingProposalVotes;
    uint256 public votingperiod = 7 days;
    address payable public owner;
    uint256 public votingstart;
    uint256 public votingend;

    mapping(uint256 => mapping(address => bool)) public hasVoted;

    struct Proposal {
        uint256 id;
        string description;
        uint256 votes;
        bool executed;
    }

    // Currently unused; can be implemented later
    struct Community {
        uint256 id;
        Proposal[] proposals;   
    }

    mapping(uint256 => Proposal) public proposals;

    event ProposalCreated(uint256 id, address proposer, string description);
    event Voted(uint256 proposalId, address voter, uint256 weight);
    event ProposalExecuted(uint256 proposalId);

    modifier onlyowner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        owner = payable(msg.sender);
        votingstart = block.timestamp;
        votingend = votingstart + votingperiod;
    }

    function createProposal(string calldata _description) external onlyowner {
        Proposal storage proposal = proposals[proposalCount];
        proposal.id = proposalCount;
        proposal.description = _description;

        emit ProposalCreated(proposal.id, msg.sender, _description);
        proposalCount++; 
    }

    function vote(uint256 _proposalId) external payable {
        require(_proposalId < proposalCount, "Proposal does not exist");

        Proposal storage proposal = proposals[_proposalId];

        require(!proposal.executed, "Proposal already executed");
        require(!hasVoted[_proposalId][msg.sender], "Already voted on this proposal");
        require(block.timestamp <= votingend, "Voting period has ended");

        uint256 weight = msg.value;
        require(weight > 0, "No voting power");

        reservedpool += weight;
        hasVoted[_proposalId][msg.sender] = true;
        proposal.votes += weight;

        emit Voted(_proposalId, msg.sender, weight);

        if (leadingProposalVotes == 0 || proposal.votes > leadingProposalVotes) {
            leadingProposalId = _proposalId;
            leadingProposalVotes = proposal.votes;
        }
    }

    function executeProposal() public onlyowner {
        require(block.timestamp >= votingend, "Voting period not ended");

        Proposal storage winner = proposals[leadingProposalId];
        require(!winner.executed, "Proposal already executed");

        winner.executed = true;
        emit ProposalExecuted(leadingProposalId);

        owner.transfer(reservedpool);
    }

    receive() external payable {
        reservedpool += msg.value;
    }
}
