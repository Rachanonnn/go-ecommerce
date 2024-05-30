export default async function getUserbyID(userID : string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/profile/get_user_by_id/?id=${userID}`, {
        method: "GET",
        // headers: {
        //     authorization: `Bearer ${token}`
        // }
    })

    if (response.status === 403) {
        return "403"
    }

    if (!response.ok) {
        throw new Error("Failed to fetch user")
    }

    return await response.json()
};
