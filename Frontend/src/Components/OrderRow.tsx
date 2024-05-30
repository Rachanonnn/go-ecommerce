import React from "react";

interface Props {
  index: number;
  name: string;
  price: number;
  quantities: number;
  totalprice: number;
}

const OrderRow: React.FC<Props> = ({
  index,
  name,
  price,
  quantities,
  totalprice,
}) => {
  return (
    <>
      {/* row */}
      <tr>
        <th>{index + 1}</th>
        <td>{name}</td>
        <td>{price}</td>
        <td>{quantities}</td>
        <td>{totalprice}</td>
      </tr>
    </>
  );
};

export default OrderRow;
