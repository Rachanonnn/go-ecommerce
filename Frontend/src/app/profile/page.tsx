"use client";

import {
  IconMail,
  IconUser,
  IconPhone,
  IconKey,
  IconAddressBook,
} from "@tabler/icons-react";
import React from "react";
import { useUserAuth } from "@/libs/context/UserAuthContext";
import Loading from "@/Components/Loading";
import getUserbyID from "@/libs/user/getUserbyID";
import ModalUpdateProfile from "@/Components/ModalUpdateProfile";

const page = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [userData, setUserData] = React.useState<any>({});
  const [hasImage, setHasImage] = React.useState<boolean>(false);

  const { user } = useUserAuth();

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      if (!user) return;
      const response = await getUserbyID(user.uid);
      const { data } = response;
      setUserData(data);
      if (data.image != "") {
        setHasImage(true);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="hero min-h-[93vh] bg-base-200">
      <div className="hero-content flex-wrap md:flex-row gap-x-12">
        {loading ? (
          <Loading />
        ) : (
          <div className="">
            <div className="mb-8 flex flex-col items-center">
              {hasImage ? (
                <img
                  src={userData.image}
                  // src="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611737.jpg?t=st=1717690136~exp=1717693736~hmac=d1b28deddab281a32ed845e29e0b68148cee4cb621e7ba53f726e04d98549581&w=826"
                  className="w-[17rem] rounded-lg shadow-2xl mb-2"
                />
              ) : (
                <img
                  src="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611737.jpg?t=st=1717690136~exp=1717693736~hmac=d1b28deddab281a32ed845e29e0b68148cee4cb621e7ba53f726e04d98549581&w=826"
                  className="w-[17rem] rounded-lg shadow-2xl mb-2"
                />
              )}
              <input
                type="file"
                className="file-input file-input-bordered w-[17rem] max-w-xs text-center"
              />
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
                  if (document) {
                    (
                      document.getElementById(
                        "ModalUpdateProfile"
                      ) as HTMLFormElement
                    ).showModal();
                  }
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

export default page;
