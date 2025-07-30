// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


contract DAO {

    uint256 public thresholdpool = 5 ether;
    uint256 public reservedpool;
    uint256 public proposalthreshold = 0.2 ether;
    uint256 public proposalCount;
    uint256 public leadingProposalId;
    uint256 public leadingProposalVotes;

  
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    struct Proposal {
        uint256 id;
        address payable proposer;
        string description;
        uint256 votes;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;

    event ProposalCreated(uint256 id, address proposer, string description);
    event Voted(uint256 proposalId, address voter, uint256 weight);
    event ProposalExecuted(uint256 proposalId);

    constructor() {}

    function createProposal(string calldata _description) external payable {
        require(msg.value >= proposalthreshold, "Not enough ETH to propose");

        Proposal storage proposal = proposals[proposalCount];
        proposal.id = proposalCount;
        proposal.proposer = payable(msg.sender);
        proposal.description = _description;
        

        emit ProposalCreated(proposal.id, msg.sender, _description);

        proposalCount++; 
    }

    function vote(uint256 _proposalId) external payable {
        Proposal storage proposal = proposals[_proposalId];

        require(proposal.id == _proposalId, "Proposal does not exist");
        require(!proposal.executed, "Proposal already executed");
      
        require(!hasVoted[_proposalId][msg.sender], "Already voted on this proposal");

        uint256 weight = msg.value;
        require(weight > 0, "No voting power");

        reservedpool += weight;
        hasVoted[_proposalId][msg.sender] = true;
        proposal.votes += weight;

        emit Voted(_proposalId, msg.sender, weight);

        if (proposal.votes > leadingProposalVotes) {
            leadingProposalId = _proposalId;
            leadingProposalVotes = proposal.votes;
        }

        if (reservedpool >= thresholdpool) {
            Proposal storage winner = proposals[leadingProposalId];
            require(!winner.executed, "Winning proposal already executed");
            winner.proposer.transfer(thresholdpool);
            winner.executed = true;
            emit ProposalExecuted(leadingProposalId);

            reservedpool -= thresholdpool; 
            leadingProposalVotes = 0; 
        }
    }
}
