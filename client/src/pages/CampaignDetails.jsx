import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useCrowdfunding } from "../context";
import { CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { scrollLogo } from "../assets";
import CountBox from "../components/CountBox";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useCrowdfunding();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState();
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount);

    navigate("/");
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchDonators();
    }
  }, [contract, address]);

  return (
    <div className="">
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] mt-2 bg-[#3a3a43]">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px] ">
          <CountBox title="Days left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators?.length ?? 0} />
        </div>
      </div>
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px] ">
          <div className="">
            <h4 className="font-epilogue font-semibold text-[18px] uppercase text-white rounded-t-[10px] w-full truncate">
              Creator
            </h4>
            <div className="mt-[20px] flex flex-wrap flex-row gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer overflow-hidden">
                <img
                  src={scrollLogo}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="">
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  10 Campaigns
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <h4 className="font-epilogue font-semibold text-[18px] uppercase text-white w-full truncate">
              Story
            </h4>
            <div className="mt-[20px] flex flex-wrap flex-row gap-[14px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>
          <div className="">
            <h4 className="font-epilogue font-semibold text-[18px] uppercase text-white w-full truncate">
              Donators
            </h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] break-11 leading-[26px]">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="">{item.donation}</p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet be the first one
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] uppercase text-white w-full truncate">
            Fund
          </h4>
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px] space-y-5">
              <input
                type="nummber"
                placeholder="ETH 0.1"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[16px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step={0.01}
              />

              <div className="mt-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-white text-[14px] leading-[22px]">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just becuase it speaks to
                  you.
                </p>
              </div>
              <CustomButton
                btnType="button"
                title={"Fund Campaign"}
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
