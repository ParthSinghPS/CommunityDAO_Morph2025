//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./communityDAO.sol";

contract CreateCommunity is CommunityDAO {
    struct Community {
        string name;
        string description;
        address creator;
        uint256 creationTime;
        uint256 id;
        address[] members;
        address[] pollCreators;
        // ❌ Remove polls array from here
    }

    struct Poll {
        string question;
        string[] options;
        mapping(uint256 => uint256) votes; // mapping can't be used in memory
        address creator;
        uint256 creationTime;
        uint256 id;
    }

    // Mapping to store polls separately
    mapping(uint256 => Poll[]) public communityPolls;

    Community[] public communities;
    uint256 public communityCount = 1; // Start from 1 for easier indexing
    mapping(uint256 => address[]) public communityMembers;

    event CommunityCreated(
        uint256 indexed communityId,
        string name,
        string description,
        address indexed creator
    );
    event PollCreated(
        uint256 indexed communityId,
        uint256 indexed pollId,
        string question,
        address indexed creator
    );
    event VoteCast(
        uint256 indexed communityId,
        uint256 indexed pollId,
        uint256 optionId,
        address indexed voter
    );
    event PollClosed(
        uint256 indexed communityId,
        uint256 indexed pollId,
        address indexed creator
    );
    event MemberAddedToCommunity(
        uint256 indexed communityId,
        address indexed member
    );

    modifier onlyCreator(uint256 _communityId) {
        require(
            communities[_communityId].creator == msg.sender,
            "Not the community creator"
        );
        _;
    }

    function createCommunity(
        string memory _name,
        string memory _description
    ) public nftMintedOnly returns (uint256) {
        // Create empty arrays for members and pollCreators
        address[] memory emptyMembersArray;
        address[] memory emptyPollCreatorsArray;
        
        Community memory newCommunity = Community({
            name: _name,
            description: _description,
            creator: msg.sender,
            creationTime: block.timestamp,
            id: communityCount,
            members: emptyMembersArray, // ✅ Fixed: Use empty array
            pollCreators: emptyPollCreatorsArray // ✅ Fixed: Use empty array
        });

        communities.push(newCommunity);
        // Initialize the community members mapping with empty array
        communityMembers[communityCount] = emptyMembersArray;

        emit CommunityCreated(communityCount, _name, _description, msg.sender);
        communityCount++;
        return communityCount - 1;
    }

    function addPoll(
        uint256 communityId,
        string memory _question,
        string[] memory _options
    ) public {
        Poll storage newPoll = communityPolls[communityId].push();
        newPoll.question = _question;
        newPoll.options = _options;
        newPoll.creator = msg.sender;
        newPoll.creationTime = block.timestamp;
        newPoll.id = communityPolls[communityId].length - 1;
        
        emit PollCreated(communityId, newPoll.id, _question, msg.sender);
    }

    function vote(
        uint256 communityId,
        uint256 pollId,
        uint256 optionId
    ) public {
        Poll storage poll = communityPolls[communityId][pollId];
        poll.votes[optionId] += 1;
        
        emit VoteCast(communityId, pollId, optionId, msg.sender);
    }

    function addMemberToCommunity(
        uint256 _communityId,
        address _member
    ) public {
        require(
            members[_member].memberAddress != address(0),
            "Member does not exist"
        );
        require(
            !isMemberInCommunity(_communityId, _member),
            "Member already in community"
        );

        communities[_communityId].members.push(_member);
        communityMembers[_communityId].push(_member);
        members[_member].communities.push(_communityId);

        emit MemberAddedToCommunity(_communityId, _member);
    }

    function isMemberInCommunity(
        uint256 _communityId,
        address _member
    ) public view returns (bool) {
        for (uint256 i = 0; i < communities[_communityId].members.length; i++) {
            if (communities[_communityId].members[i] == _member) {
                return true;
            }
        }
        return false;
    }

    // Additional helper functions
    function getCommunityDetails(uint256 _communityId) 
        public 
        view 
        returns (
            string memory name,
            string memory description,
            address creator,
            uint256 creationTime,
            uint256 memberCount
        ) 
    {
        require(_communityId < communities.length, "Community does not exist");
        Community storage community = communities[_communityId];
        
        return (
            community.name,
            community.description,
            community.creator,
            community.creationTime,
            community.members.length
        );
    }

    function getPollVotes(uint256 _communityId, uint256 _pollId, uint256 _optionId)
        public
        view
        returns (uint256)
    {
        return communityPolls[_communityId][_pollId].votes[_optionId];
    }
}