export default async function getAddressbyID(userID: string) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/profile/get_address_by_user_id/?id=${userID}`,
    {
      method: "GET",
      // headers: {
      //     authorization: `Bearer ${token}`
      // }
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return await response.json();
}
