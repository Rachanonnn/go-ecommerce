interface PostProductData {
  product_name: string;
  quantity: number;
  price: number;
  file: File;
}

export default async function addProduct({
  product_name,
  quantity,
  price,
  file,
}: PostProductData): Promise<any> {
  const formData = new FormData();
  formData.append("product_name", product_name);
  formData.append("quantity", quantity.toString());
  formData.append("price", price.toString());
  formData.append("image", file);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/product/add_product`,
      {
        method: "POST",
        body: formData,
      }
    );

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
