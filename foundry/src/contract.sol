// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract DAO {
    address payable public owner;
    uint256 public proposalCount;
    uint256 public communityCount;
    uint256 public votingperiod = 7 days;
    uint256 public votingstart;
    uint256 public votingend;

    // We'll track the leading proposal and its votes for a global scope as there is only one voting period
    // You could also track this per community if voting periods were separate.
    uint256 public leadingProposalId;
    uint256 public leadingProposalVotes;

    mapping(uint256 => mapping(address => bool)) public hasVoted;

    struct Proposal {
        uint256 id;
        uint256 communityId;
        string description;
        uint256 votes;
        bool executed;
    }

    struct Community {
        uint256 id;
        string name;
        address[] members;
        mapping(address => bool) isMember;
        uint256 pool; // New: A dedicated pool for each community
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => Community) public communities;

    event ProposalCreated(
        uint256 id,
        uint256 communityId,
        address proposer,
        string description
    );
    event Voted(uint256 proposalId, address voter, uint256 weight);
    event ProposalExecuted(uint256 proposalId);
    event CommunityCreated(uint256 communityId, string name, address owner);
    event MemberAdded(uint256 communityId, address member);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyCommunityMember(uint256 _communityId) {
        require(
            communities[_communityId].isMember[msg.sender],
            "Not a member of this community"
        );
        _;
    }

    constructor() {
        owner = payable(msg.sender);
        votingstart = block.timestamp;
        votingend = votingstart + votingperiod;
    }

    function createCommunity(string calldata _name) external onlyOwner {
        Community storage newCommunity = communities[communityCount];
        newCommunity.id = communityCount;
        newCommunity.name = _name;

        newCommunity.members.push(owner);
        newCommunity.isMember[owner] = true;

        emit CommunityCreated(newCommunity.id, _name, owner);
        communityCount++;
    }

    function getCommunityMembers(
        uint256 _communityId
    ) external view returns (address[] memory) {
        require(_communityId < communityCount, "Community does not exist");
        return communities[_communityId].members;
    }

    function isCommunityMember(
        uint256 _communityId,
        address _member
    ) external view returns (bool) {
        require(_communityId < communityCount, "Community does not exist");
        return communities[_communityId].isMember[_member];
    }

    function addMemberToCommunity(
        uint256 _communityId,
        address _member
    ) external onlyOwner {
        require(_communityId < communityCount, "Community does not exist");
        Community storage community = communities[_communityId];
        require(!community.isMember[_member], "Address is already a member");

        community.members.push(_member);
        community.isMember[_member] = true;

        emit MemberAdded(_communityId, _member);
    }

    function createProposal(
        uint256 _communityId,
        string calldata _description
    ) external onlyOwner {
        require(_communityId < communityCount, "Community does not exist");
        Proposal storage proposal = proposals[proposalCount];
        proposal.id = proposalCount;
        proposal.communityId = _communityId;
        proposal.description = _description;

        emit ProposalCreated(
            proposal.id,
            _communityId,
            msg.sender,
            _description
        );
        proposalCount++;
    }

    // Modified: vote is now payable, combining donation and voting power.
    function vote(
        uint256 _proposalId
    ) external payable onlyCommunityMember(proposals[_proposalId].communityId) {
        require(_proposalId < proposalCount, "Proposal does not exist");
        Proposal storage proposal = proposals[_proposalId];

        require(!proposal.executed, "Proposal already executed");
        require(
            !hasVoted[_proposalId][msg.sender],
            "Already voted on this proposal"
        );
        require(block.timestamp <= votingend, "Voting period has ended");

        uint256 weight = msg.value;
        require(weight > 0, "No voting power");

        // Add the donated funds to the community's pool
        communities[proposal.communityId].pool += weight;

        hasVoted[_proposalId][msg.sender] = true;
        proposal.votes += weight;

        emit Voted(_proposalId, msg.sender, weight);

        // This logic is global. It assumes one voting period for all proposals.
        // If you want separate voting periods, this would need to be per community.
        if (
            leadingProposalVotes == 0 || proposal.votes > leadingProposalVotes
        ) {
            leadingProposalId = _proposalId;
            leadingProposalVotes = proposal.votes;
        }
    }

    // Modified: executeProposal now transfers the community's pool to the winner.
    function executeProposal() public onlyOwner {
        require(block.timestamp >= votingend, "Voting period not ended");

        Proposal storage winner = proposals[leadingProposalId];
        require(!winner.executed, "Proposal already executed");

        winner.executed = true;
        emit ProposalExecuted(leadingProposalId);

        // Transfer the winning community's pool to the owner.
        // In a real-world scenario, the owner would be the one to execute the proposal's purpose.
        uint256 winningCommunityId = winner.communityId;
        communities[winningCommunityId].executed = true;
        uint256 amountToTransfer = communities[winningCommunityId].pool;

        // Reset the pool to zero to prevent double spending
        communities[winningCommunityId].pool = 0;

        payable(owner).transfer(amountToTransfer);
    }

    // The receive function is no longer needed since vote() is payable.
    // We can keep it to revert any direct transfers to the contract address.
    receive() external payable {
        revert(
            "Direct ETH transfers are not allowed. Use the vote function to contribute."
        );
    }
}
