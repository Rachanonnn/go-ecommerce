import { useUserAuth } from "@/libs/context/UserAuthContext";
import getUserbyID from "@/libs/user/getUserbyID";
import updateUser from "@/libs/user/updateUserbyID";
import {
  IconStack,
  IconPackage,
  IconCash,
  IconRefresh,
  IconUpload,
  IconMail,
  IconUser,
  IconPhone,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

interface ModalUpdateProfileProps {
  onProfileUpdated: () => void;
}

const ModalUpdateProfile: React.FC<ModalUpdateProfileProps> = ({
  onProfileUpdated,
}) => {
  const { user } = useUserAuth();
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: "",
    tel: "",
    first_name: "",
    last_name: "",
  });
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (user) {
      getUserbyID(user.uid).then((data) => {
        setUserData(data);
        setFormData({
          email: data.data.email,
          tel: data.data.tel,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
        });
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasChanged(true);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    if (userData) {
      setHasChanged(false);
      setFormData({
        email: userData.data.email,
        tel: userData.data.tel,
        first_name: userData.data.first_name,
        last_name: userData.data.last_name,
      });
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newData = {
      user_id: userData.data.user_id,
      uid: userData.data.uid,
      role: userData.data.role,
      email: formData.email,
      tel: formData.tel,
      first_name: formData.first_name,
      last_name: formData.last_name,
      image: userData.data.image,
      token: userData.data.token,
    };
    await updateUser(newData);
    (
      document.getElementById("ModalUpdateProfile") as HTMLDialogElement
    ).close();
    onProfileUpdated();
  };

  return (
    <>
      <dialog id="ModalUpdateProfile" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Update Profile</h3>
          <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
            <label className="input input-bordered flex items-center gap-2">
              <p className="p-2">
                <IconMail stroke={1.4} size={32} />
              </p>
              <input
                type="text"
                className="grow text-gray-500"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <p className="p-2">
                <IconUser stroke={1.4} size={32} />
              </p>
              <input
                type="text"
                className="grow text-gray-500"
                placeholder="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <p className="p-2">
                <IconUser stroke={1.4} size={30} />
              </p>
              <input
                type="text"
                className="grow text-gray-500"
                placeholder="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <p className="p-2">
                <IconPhone stroke={1.4} size={30} />
              </p>
              <input
                type="text"
                className="grow text-gray-500"
                placeholder="Tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
              />
            </label>
            <div className="gap-2 flex flex-col">
              <button
                type="submit"
                className="btn btn-primary mt-4 w-full text-white"
              >
                <span className="flex justify-center gap-2 items-center">
                  <IconUpload size={20} />
                  <p className="text-sm">Update Profile</p>
                </span>
              </button>
              {hasChanged && (
                <div
                  className="btn btn-primary w-full text-white"
                  onClick={handleReset}
                >
                  <span className="flex justify-center gap-2 items-center">
                    <IconRefresh size={20} />
                    <p className="text-sm">Reset</p>
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ModalUpdateProfile;
