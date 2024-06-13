export default async function deleteAddressbyID(userID: string, index: number) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/profile/delete_address?id=${userID}&index=${index}`,
    {
      method: "DELETE",
      // headers: {
      //     authorization: `Bearer ${token}`
      // }
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete address");
  }

  return await response.json();
}
