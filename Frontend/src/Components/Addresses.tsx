import React from "react";
import { IconAddressBook } from "@tabler/icons-react";
import ModalUpdateAddress from "./ModalUpdateAddress";

interface Props {
  housename: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  index: number;
  fetchData: () => void;
}

const Addresses: React.FC<Props> = ({
  housename,
  street,
  city,
  state,
  pincode,
  index,
  fetchData,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <IconAddressBook size={20} stroke={2} className="text-slate-500" />
        <p className="text-md text-slate-500">
          Address {index + 1}: {housename}, {street}, {city}, {state}, {pincode}
        </p>
        <ModalUpdateAddress index={index} fetchData={fetchData} />
        <button
          className="btn bg-slate-300 ml-auto min-h-[2.5rem] h-[2.5rem]"
          onClick={() => {
            const modal = document.getElementById(
              `modalUpdateAddress${index}`
            ) as HTMLFormElement;
            if (modal) modal.showModal();
          }}
        >
          Edit
        </button>
      </div>
      {index < 2 ? <hr className="h-[1px] bg-slate-400 w-full mb-3" /> : <></>}
    </div>
  );
};

export default Addresses;
