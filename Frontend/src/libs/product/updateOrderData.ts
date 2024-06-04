interface OrderData {
  product_id: string;
  quantity: number;
  user_id: string;
}

export default async function updateOrderData({
  product_id,
  quantity,
  user_id,
}: OrderData): Promise<any> {
  const data: OrderData = {
    product_id,
    quantity,
    user_id,
  };

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/profile/update_order?id=${user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    console.log(response);

    const responseText = await response.text();

    if (!response.ok) {
      console.error("Server response (error):", responseText);
      let errorDetails;
      try {
        errorDetails = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Failed to update order: ${response.statusText}`);
      }
      throw new Error(
        `Failed to update order: ${errorDetails.message || response.statusText}`
      );
    }

    console.log("Server response (success):", responseText);
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      throw new Error("Invalid JSON response from server");
    }

    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
