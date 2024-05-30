import { getCookie, deleteCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export default function checkCookies() {
  try {
    const token = `${getCookie("token")}`;

    jwtDecode(token);
    return true;
  } catch {
    deleteCookie("token");
    return false;
  }
}
