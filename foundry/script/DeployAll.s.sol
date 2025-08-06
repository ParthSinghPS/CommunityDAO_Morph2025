// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";
import {CommunityDAO} from "../src/communityDAO.sol";
import {CreateCommunity} from "../src/createCommunity.sol";
import {DAO} from "../src/dao.sol";
import {ContractDAO} from "../src/contract.sol";

contract DeployAll is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        Counter counter = new Counter();
        console.log("Counter deployed at:", address(counter));

        CommunityDAO communityDAO = new CommunityDAO(); // if constructor needs args, pass them
        console.log("CommunityDAO deployed at:", address(communityDAO));

        CreateCommunity createCommunity = new CreateCommunity(); // if constructor needs args, pass them
        console.log("CreateCommunity deployed at:", address(createCommunity));

        DAO dao = new DAO(); // if constructor needs args, pass them
        console.log("DAO deployed at:", address(dao));

        ContractDAO contractDAO = new ContractDAO();
        console.log("ContractDAO deployed at:" , address(contractDAO));

        vm.stopBroadcast();
    }
}
