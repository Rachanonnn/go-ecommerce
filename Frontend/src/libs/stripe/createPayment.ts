
export default async function getCreatePayment(price: number, cart_id: string, quantity = 1) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/stripe/create_payment?price=${price}&cart_id=${cart_id}&quantity=${quantity}`, {
        method: "GET",

        // headers: {
        //     authorization: `Bearer ${token}`
        // }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch product")
    }

    // console.log("response", await response.json())

    return await response.json()
};
