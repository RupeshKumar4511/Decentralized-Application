import { useState, useEffect, createContext } from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";

//INTERNAL IMPORT
import { CrowdFundingABI, CrowdFundingAddress } from "./constants";

//--FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);


export const CrowdFundingContext = createContext();
export const CrowdFundingProvider = ({ children }) => {
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");

    const handleChange = (e, name) => {
    };


    const createCampaign = async (campaign) => {
        const { title, description, amount, deadline } = campaign;
        const web3Modal = new Wenb3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        console.log(currentAccount);
        try {
            const transaction = await contract.createCampaign(
                currentAccount, //owner
                title, //title
                description, //description
                ethers.utils.parseUnits(amount, 18),
                new Date(deadline).getTime() //deadline,
            );
            await transaction.wait();

            console.log("contract call success", transaction);

        }
        catch (error) {
            console.log("contract call failure ", error);
        }
    };

    const getCampaigns = async () => {
        // const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/-TvD4yfDsiwdaJOjBNC9GJ9XyqWcr3Hb");
        const web3Modal = new Wenb3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const contract = fetchContract(provider);
        console.log(provider);
        console.log(contract);

        const campaigns = await contract.getCampaigns();
        console.log(campaigns);

        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()

            ),
            pId: i,
        }));

        console.log(parsedCampaigns);
        return parsedCampaigns;
    };

    const getUserCampaigns = async () => {
        // const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/-TvD4yfDsiwdaJOjBNC9GJ9XyqWcr3Hb");
        // console.log(provider)
        const web3Modal = new Wenb3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const contract = fetchContract(provider);

        const allCampaigns = await contract.getCampaigns();



        const accounts = await window.ethereum.request({
            method: "eth_accounts",

        });
        const currentUser = accounts[0];

        const filteredCampaigns = allCampaigns.filter(
            (campaign) => (campaign).owner === "0xc9D5c179E104942608219b8b7Ae30A4F699dFd68"
        );
        const userData = filteredCampaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i,

        }));
        return userData;
    };


    const donate = async (pId, amount) => {
        const web3Modal = new Wenb3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        const campaignData = await contract.donateToCampaign(pId, {
            value: ethers.utils.parseEther(amount),

        });
        console.log(campaignData)

        await campaignData.wait();
        location.reload();

        return campaignData;
    };

    const getDonations = async (pId) => {
        // const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/-TvD4yfDsiwdaJOjBNC9GJ9XyqWcr3Hb");
        const web3Modal = new Wenb3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const contract = fetchContract(provider);

        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString()),
            });

        }
        return parsedDonations;
    };

    //CHECK IF WALLET IS CONNECTED

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum)
                return setOpenError(true), setError("install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",

            });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

            }
            else {
                console.log("No Account Found");

            }
        }
        catch (error) {
            console.log("something wrong while connecting to wallet");

        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    //CONNECT WALLET FUNCTION 
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return alert("Install Metamask");
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
        }
        catch (error) {
            alert("Error while connecting to wallet");
        }

    };

    return (
        <CrowdFundingContext.Provider
            value={{
                titleData,
                currentAccount,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                connectWallet,
                handleChange
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    );
};



