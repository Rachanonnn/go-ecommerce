export default async function getProductbyID(userID: string) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/product/get_product_by_id/?id=${userID}`,
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
