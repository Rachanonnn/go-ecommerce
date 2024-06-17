interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export default async function updateProductImage(
  product_id: string,
  file: File
): Promise<ApiResponse> {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/product/upload_product_picture?product_id=${product_id}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const responseText = await response.text();

    if (!response.ok) {
      console.error("Server response (error):", responseText);
      let errorDetails: any = { message: response.statusText };
      try {
        errorDetails = JSON.parse(responseText);
      } catch (e) {}
      throw new Error(`Failed to update user: ${errorDetails.message}`);
    }

    console.log("Server response (success):", responseText);
    let responseData: ApiResponse;
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
