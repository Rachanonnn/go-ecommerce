
export default async function getAllProducts() {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/product/get_all_products`, {
        method: "GET",
        // headers: {
        //     authorization: `Bearer ${token}`
        // }
    })

    if(!response.ok){
        throw new Error("Failed to fetch product")
    }

    // console.log("response", await response.json())

    return await response.json()
};
