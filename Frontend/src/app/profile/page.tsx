"use client";

import {
  IconMail,
  IconUser,
  IconPhone,
  IconKey,
  IconAddressBook,
} from "@tabler/icons-react";
import React, { useState, useEffect, useCallback } from "react";
import { useUserAuth } from "@/libs/context/UserAuthContext";
import Loading from "@/Components/Loading";
import getUserbyID from "@/libs/user/getUserbyID";
import ModalUpdateProfile from "@/Components/ModalUpdateProfile";
import updateUser from "@/libs/user/updateUserbyID";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>({});
  const [hasImage, setHasImage] = useState<boolean>(false);

  const { user } = useUserAuth();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (!user) return;
      const response = await getUserbyID(user.uid);
      const { data } = response;
      setUserData(data);
      if (data.image !== "") {
        setHasImage(true);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
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
    <div className="hero min-h-[93vh] bg-base-200">
      <div className="hero-content flex-wrap md:flex-row gap-x-12">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div className="mb-8 flex flex-col items-center">
              <img
                src={
                  hasImage
                    ? userData.image
                    : "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611737.jpg"
                }
                className="w-[17rem] rounded-lg shadow-2xl mb-2"
                alt="User Avatar"
              />
              <div className="flex flex-wrap gap-1">
                <input
                  type="file"
                  className="file-input file-input-bordered w-[17rem] max-w-xs text-center"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <button className="btn btn-ghost" onClick={updateProfile}>
                  Upload
                </button>
              </div>
            </div>
            <ModalUpdateProfile onProfileUpdated={fetchData} />
            <div className="w-96 mx-auto flex flex-col gap-4">
              <div className="input input-bordered flex items-center gap-2">
                <IconMail size={20} stroke={2} className="text-slate-500" />
                <p className="text-md text-slate-500">{userData.email}</p>
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <IconUser size={20} stroke={2} className="text-slate-500" />
                <p className="text-md text-slate-500">
                  {userData.first_name} {userData.last_name}
                </p>
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <IconPhone size={20} stroke={2} className="text-slate-500" />
                <p className="text-md text-slate-500">{userData.tel}</p>
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <IconKey size={20} stroke={2} className="text-slate-500" />
                <p className="text-md text-gray-400">●●●●●●●●</p>
              </div>
              <div className="input input-bordered flex items-center gap-2 mb-2">
                <IconAddressBook
                  size={20}
                  stroke={2}
                  className="text-slate-500"
                />
                <p className="text-md text-slate-400">Address</p>
                <button className="btn btn-ghost btn-sm ml-auto text-gray-500">
                  Edit
                </button>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  const modal = document.getElementById(
                    "ModalUpdateProfile"
                  ) as HTMLFormElement;
                  if (modal) modal.showModal();
                }}
              >
                Update Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
