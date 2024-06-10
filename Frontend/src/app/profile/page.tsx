"use client";

import { IconMail, IconUser, IconPhone } from "@tabler/icons-react";
import React, { useState, useEffect, useCallback } from "react";
import { useUserAuth } from "@/libs/context/UserAuthContext";
import Loading from "@/Components/Loading";
import getUserbyID from "@/libs/user/getUserbyID";
import ModalUpdateProfile from "@/Components/ModalUpdateProfile";
import updateUser from "@/libs/user/updateUserbyID";
import ModalAddAddress from "@/Components/ModalAddAddress";
import getAddressbyID from "@/libs/user/getAddressbyID";
import Addresses from "@/Components/Addresses";

interface AddressData {
  user_id: string;
  housename: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>({});
  const [hasImage, setHasImage] = useState<boolean>(false);
  const [addressesData, setAddressData] = useState<AddressData[]>([]);

  const { user } = useUserAuth();

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const userResponse = await getUserbyID(user.uid);
      const fetchedUserData = userResponse.data;
      setUserData(fetchedUserData);
      setHasImage(fetchedUserData.image !== "");

      const addressResponse = await getAddressbyID(user.uid);
      const fetchedAddressData = addressResponse.data.address_data;
      setAddressData(fetchedAddressData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const base64Image = reader.result as string;
          setUserData((prevData: any) => ({ ...prevData, image: base64Image }));
          setHasImage(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfile = async (event: any) => {
    event.preventDefault();
    const newData = {
      user_id: userData.user_id,
      uid: userData.uid,
      role: userData.role,
      email: userData.email,
      tel: userData.tel,
      first_name: userData.first_name,
      last_name: userData.last_name,
      image: userData.image,
      token: userData.token,
    };
    await updateUser(newData);
    fetchData();
  };

  return (
    <div className="min-h-[93vh] bg-base-200">
      <div>
        <h1 className="text-3xl font-bold text-center pt-12 mb-4 md:mb-8">
          Profile Info
        </h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap justify-center w-[80vw] mx-auto sm:mx-0">
            <div className="mb-8 flex flex-col justify-center sm:ml-52 sm:mr-32">
              <img
                src={
                  hasImage
                    ? userData.image
                    : "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611737.jpg"
                }
                className="w-[28rem] h-[28rem] rounded-full shadow-3xl mb-2"
                alt="User Avatar"
              />
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="file"
                  className="file-input file-input-bordered w-full text-center rounded-lg"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <button
                  className="btn w-full btn-neutral rounded-lg"
                  onClick={updateProfile}
                >
                  Upload
                </button>
              </div>
            </div>
            <ModalUpdateProfile onProfileUpdated={fetchData} />
            <ModalAddAddress onAddressAdd={fetchData} />
            <div className="w-96 flex flex-col gap-2">
              <h3 className="text-lg font-bold">Contact</h3>
              <div className="flex flex-col gap-4 bg-white rounded-lg border border-gray-300 w-full md:w-[30vw] p-6">
                <div className="flex items-center gap-2">
                  <IconMail size={20} stroke={2} className="text-slate-500" />
                  <p className="text-md text-slate-500">{userData.email}</p>
                </div>
                <hr className="bg-gray-300" />
                <div className="flex items-center gap-2">
                  <IconUser size={20} stroke={2} className="text-slate-500" />
                  <p className="text-md text-slate-500">
                    {userData.first_name} {userData.last_name}
                  </p>
                </div>
                <hr className="bg-gray-300" />
                <div className="flex items-center gap-2">
                  <IconPhone size={20} stroke={2} className="text-slate-500" />
                  <p className="text-md text-slate-500">{userData.tel}</p>
                </div>
                <button
                  className="btn btn-primary rounded-lg"
                  onClick={() => {
                    const modal = document.getElementById(
                      "ModalUpdateProfile"
                    ) as HTMLFormElement;
                    if (modal) modal.showModal();
                  }}
                >
                  Edit Contact
                </button>
              </div>
              <h3 className="text-lg font-bold">
                Address{" "}
                <span className="text-sm font-normal">- Up to 3 addresses</span>
              </h3>
              <div className="flex flex-col gap-4 bg-white rounded-lg border border-gray-300 w-full md:w-[30vw] p-6">
                <div>
                  {addressesData.length > 0 ? (
                    addressesData.map((address, index) => (
                      <Addresses
                        key={index}
                        housename={address.housename}
                        street={address.street}
                        city={address.city}
                        state={address.state}
                        pincode={address.pincode}
                        index={index}
                      />
                    ))
                  ) : (
                    <p>No addresses data</p>
                  )}
                </div>
                {addressesData.length < 3 ? (
                  <button
                    className="btn btn-primary rounded-lg"
                    onClick={() => {
                      const modal = document.getElementById(
                        "ModalAddAddress"
                      ) as HTMLFormElement;
                      if (modal) modal.showModal();
                    }}
                  >
                    Add Address
                  </button>
                ) : (
                  <button
                    className="btn btn-primary rounded-lg"
                    onClick={() => {
                      alert("You have reached the maximum number of addresses");
                    }}
                  >
                    Add Address
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
