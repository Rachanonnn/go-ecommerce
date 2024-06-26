interface UserData {
  user_id: string;
  uid: string;
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
  role: string;
  image: string;
  token: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export default async function updateUser({
  user_id,
  uid,
  first_name,
  last_name,
  email,
  tel,
  role,
  image,
  token,
}: UserData): Promise<ApiResponse> {
  const data: UserData = {
    user_id,
    uid,
    first_name,
    last_name,
    email,
    tel,
    role,
    image,
    token,
  };

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/profile/update_user?id=${user_id}`,
      {
        method: "PUT",
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
