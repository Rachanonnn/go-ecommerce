import React from "react";

const TabButton = ({
  active,
  selectTab,
  children,
}: {
  active: any;
  selectTab: any;
  children: any;
}) => {
  const buttonClasses = active
    ? "text-black border-b border-purple-500"
    : "text-gray-500";

  return (
    <div>
      <button onClick={selectTab}>
        <p className={`mr-3 font-semibold hover:text-black ${buttonClasses}`}>
          {children}
        </p>
      </button>
    </div>
  );
};

export default TabButton;
