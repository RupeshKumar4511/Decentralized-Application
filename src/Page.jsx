import { useEffect, useContext, useState } from "react";

//INTERNAL IMPORT
import { CrowdFundingContext } from "./context/CrowdFunding";

import { Hero, Card, PopUp } from "./components/index";


const Page = () => {

  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,

  } = useContext(CrowdFundingContext);

  const [allcampaign, setAllcampaign] = useState();
  const [userCampaign, setUsercampaign] = useState();

  useEffect(() => {
    const getCampaignsData = getCampaigns();
    const userCampaignsData = getUserCampaigns();
    return async () => {
      const allData = await getCampaignsData;
      const userData = await userCampaignsData;

      console.log(allData);
      console.log(userData);
      setAllcampaign(allData);
      setUsercampaign(userData);
    };
  }, []);


  //DONATE POPUP MODEL
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  console.log(donateCampaign);
  console.log(allcampaign);
  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />

      <Card
        allcampaign={allcampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
        title="All Listed Campaign"
      />


      <Card
        allcampaign={userCampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
        title="Your Created Campaign"
      />
      {openModel && (
        <PopUp
          setOpenModel={setOpenModel}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
      {console.log(openModel)}
    </>
  );
};

export default Page;


