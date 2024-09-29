// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Crowdfunding
/// @notice This contract allows users to create and donate to crowdfunding campaigns
contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    // errors
    error DeadlinePassed();
    error CampaignNotFound();
    error DonationFailed();

    // events
    event CampaignCreated(uint256 indexed campaignId, address indexed owner, string title);
    event DonationReceived(uint256 indexed campaignId, address indexed donor, uint256 amount);

    /// @notice Creates a new crowdfunding campaign
    /// @param _owner The address of the campaign owner
    /// @param _title The title of the campaign
    /// @param _description The description of the campaign
    /// @param _target The funding target of the campaign
    /// @param _deadline The deadline of the campaign
    /// @param _image The URL of the campaign image
    /// @return The ID of the newly created campaign
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        if (_deadline <= block.timestamp) {
            revert DeadlinePassed();
        }

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    /// @notice Allows a user to donate to a specific campaign
    /// @param _id The ID of the campaign to donate to
    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected += amount;
        } else {
            revert DonationFailed();
        }
    }

    /// @notice Retrieves the list of donators and their donations for a specific campaign
    /// @param _id The ID of the campaign
    /// @return Two arrays: one with donator addresses and another with their corresponding donation amounts
    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        if (_id >= numberOfCampaigns) {
            revert CampaignNotFound();
        }
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    /// @notice Retrieves all campaigns
    /// @return An array of all campaigns
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns; 
    }
}