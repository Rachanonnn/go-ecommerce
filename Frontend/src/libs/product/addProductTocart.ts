interface ProductData {
  product_id: string;
  quantity: number;
  user_id: string;
}

export default async function addProductTocart({
  product_id,
  quantity,
  user_id,
}: ProductData): Promise<any> {
  const data: ProductData = {
    product_id,
    quantity,
    user_id,
  };

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/profile/add_order?id=${user_id}`,
      {
        method: "POST",
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
        throw new Error(`Failed to fetch product: ${response.statusText}`);
      }
      throw new Error(
        `Failed to fetch product: ${
          errorDetails.message || response.statusText
        }`
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
