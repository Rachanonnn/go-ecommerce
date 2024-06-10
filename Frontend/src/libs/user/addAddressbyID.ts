interface AddressData {
  user_id: string;
  housename: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export default async function addAddress({
  user_id,
  housename,
  street,
  city,
  state,
  pincode,
}: AddressData): Promise<ApiResponse> {
  const data: AddressData = {
    user_id,
    housename,
    street,
    city,
    state,
    pincode,
  };

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/profile/add_address?id=${user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const responseText = await response.text();

    if (!response.ok) {
      console.error("Server response (error):", responseText);
      let errorDetails: any = { message: response.statusText };
      try {
        errorDetails = JSON.parse(responseText);
      } catch (e) {}
      throw new Error(`Failed to update address: ${errorDetails.message}`);
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
