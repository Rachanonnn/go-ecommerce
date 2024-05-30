import getUserbyID from "./getUserbyID";
import addUser from "./addUsertoData";
import setToken from "./cookies";

export default async function checkUser(user: any) {
  const user_id = user.uid;
  const newUser = {
    user_id: user.uid,
    first_name: user.displayName.split(" ")[0],
    last_name: user.displayName.split(" ")[1],
    email: user.email,
    tel: user.phoneNumber,
    role: "user",
  };

  const userData = await getUserbyID(user_id);
  if (userData === "403") {
    await addUser(newUser);
  } else {
    const userData = await getUserbyID(user_id);
    await setToken(userData.data.token);
  }
}
