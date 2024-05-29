 
// import { cookies } from 'next/headers'
import { jwtDecode } from "jwt-decode";
import { setCookie } from "cookies-next";
 
export default async function setToken(token : string) {

    const decoded = jwtDecode(token);

    setCookie("token", token, { maxAge: decoded.exp });
}