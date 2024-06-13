import { useUserAuth } from "@/libs/context/UserAuthContext";
import addAddress from "@/libs/user/addAddressbyID";
import getAddressbyID from "@/libs/user/getAddressbyID";
import {
  IconRefresh,
  IconUpload,
  IconHome,
  IconRoad,
  IconBuilding,
  IconBuildingEstate,
  IconMailbox,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

interface ModalAddAddressProps {
  onAddressAdd: () => void;
}

const ModalAddAddress: React.FC<ModalAddAddressProps> = ({ onAddressAdd }) => {
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
          housename: "",
          street: "",
          city: "",
          state: "",
          pincode: "",
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
        housename: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
      });
      setHasChanged(false);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(addressData.data.address_data.length);
    // const index = addressData.data.address_data.length;
    const newData = {
      // user_id: addressData.data.user_id,
      // housename: addressData.data.address_data[index].housename,
      // street: addressData.data.address_data[index].street,
      // city: addressData.data.address_data[index].city,
      // state: addressData.data.address_data[index].state,
      // pincode: addressData.data.address_data[index].pincode,
      user_id: addressData.data.user_id,
      housename: formData.housename,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    };
    await addAddress(newData);
    (document.getElementById("ModalAddAddress") as HTMLDialogElement).close();
    onAddressAdd();
  };

  return (
    <>
      <dialog id="ModalAddAddress" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add Address</h3>
          <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
            <label className="input input-bordered flex items-center gap-2">
              <p className="p-2">
                <IconHome stroke={1.4} size={32} className="text-slate-500" />
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
                <IconRoad stroke={1.4} size={32} className="text-slate-500" />
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
                <IconBuilding
                  stroke={1.4}
                  size={30}
                  className="text-slate-500"
                />
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
                <IconBuildingEstate
                  stroke={1.4}
                  size={30}
                  className="text-slate-500"
                />
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
                <IconMailbox
                  stroke={1.4}
                  size={30}
                  className="text-slate-500"
                />
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
                  <p className="text-sm">Add Address</p>
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

export default ModalAddAddress;
