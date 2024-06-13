import { useUserAuth } from "@/libs/context/UserAuthContext";
import deleteAddressbyID from "@/libs/user/deleteAddress";
import getAddressbyID from "@/libs/user/getAddressbyID";
import updateAddress from "@/libs/user/updateAddressbyID";
import { cuteAlert } from "cute-alert";
import {
  IconRefresh,
  IconUpload,
  IconMail,
  IconUser,
  IconPhone,
  IconTrash,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

interface ModalAddAddressProps {
  index: number;
  fetchData: () => void;
}

const ModalUpdateAddress: React.FC<ModalAddAddressProps> = ({
  index,
  fetchData,
}) => {
  const { user } = useUserAuth();
  const [addressData, setAddressData] = useState<any>(null);
  const [formData, setFormData] = useState({
    housename: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (user) {
      getAddressbyID(user.uid).then((data) => {
        setAddressData(data);
        setFormData({
          housename: data.data.address_data[index].housename,
          street: data.data.address_data[index].street,
          city: data.data.address_data[index].city,
          state: data.data.address_data[index].state,
          pincode: data.data.address_data[index].pincode,
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
    if (addressData) {
      setFormData({
        housename: addressData.data.address_data[index].housename,
        street: addressData.data.address_data[index].street,
        city: addressData.data.address_data[index].city,
        state: addressData.data.address_data[index].state,
        pincode: addressData.data.address_data[index].pincode,
      });
      setHasChanged(false);
    }
  };

  const handleDelete = async () => {
    if (user) {
      try {
        await deleteAddressbyID(user.uid, index);
        fetchData();
      } catch {
        alert("Failed to delete address");
      }
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newData = {
      userID: addressData.data.user_id,
      index: index,
      housename: formData.housename,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    };
    await updateAddress(newData);
    const modalId = `modalUpdateAddress${index}`;
    const modalElement = document.getElementById(
      modalId
    ) as HTMLFormElement | null;
    if (modalElement) {
      (modalElement as any).close();
    } else {
      console.error(`Element with ID ${modalId} not found.`);
    }
  };

  return (
    <>
      <dialog id={`modalUpdateAddress${index}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Update Address</h3>
          <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
            <label className="input input-bordered flex items-center gap-2">
              <p className="p-2">
                <IconMail stroke={1.4} size={32} className="text-slate-500" />
              </p>
              <input
                type="text"
                className="grow text-gray-500"
                placeholder="House Name"
                name="housename"
                value={formData.housename}
                onChange={handleChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <p className="p-2">
                <IconUser stroke={1.4} size={32} className="text-slate-500" />
              </p>
              <input
                type="text"
                className="grow text-gray-500"
                placeholder="Street"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <p className="p-2">
                <IconUser stroke={1.4} size={30} className="text-slate-500" />
              </p>
              <input
                type="text"
                className="grow text-gray-500"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <p className="p-2">
                <IconPhone stroke={1.4} size={30} className="text-slate-500" />
              </p>
              <input
                type="text"
                className="grow text-gray-500"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <p className="p-2">
                <IconPhone stroke={1.4} size={30} className="text-slate-500" />
              </p>
              <input
                type="text"
                className="grow text-gray-500"
                placeholder="Pincode"
                name="pincode"
                value={formData.pincode}
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
                  <p className="text-sm">Update Address</p>
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
              <button
                className="btn bg-red-400 hover:bg-red-500 w-full text-white"
                onClick={() => {
                  cuteAlert({
                    type: "error",
                    title: "Delete Address",
                    description: "Do you want to delete this address?",
                    primaryButtonText: "Confirm",
                    secondaryButtonText: "Cancel",
                  }).then((event) => {
                    if (event === "primaryButtonClicked") {
                      handleDelete();
                    }
                  });
                }}
              >
                <span className="flex justify-center gap-2 items-center">
                  <IconTrash size={20} />
                  <p className="text-sm">Delete Address</p>
                </span>
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ModalUpdateAddress;
