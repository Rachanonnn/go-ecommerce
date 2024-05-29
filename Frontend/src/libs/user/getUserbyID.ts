
export default async function getUserbyID(userID : string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/profile/get_user_by_id/?id=${userID}`, {
        method: "GET",
        // headers: {
        //     authorization: `Bearer ${token}`
        // }
    })

    if(!response.ok){
        throw new Error("Failed to fetch user")
    }

    // console.log("response", await response.json())

    return await response.json()
};
