"use client";

import AdminLogin from "@/components/AdminLogin";
import { useCookies } from "react-cookie";
import { apiHost } from "@/utils";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const [cookies, setCookie] = useCookies(["user"]);

  // Expires cookie
  var oneWeek = new Date();
  oneWeek.setDate(oneWeek.getDate() + 7);

  async function handleLogin(e) {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    if (username !== "" && password !== "") {
      try {
        const response = await fetch(`${apiHost}/api/user/admin/login`, {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          setCookie(
            "user",
            { username, password },
            {
              path: "/",
              expires: oneWeek,
            }
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    // setCookie('user', user, { path: '/' })
  }
  if (cookies.user) {
    return <Sidebar>{children}</Sidebar>;
  } else {
    return <AdminLogin onLogin={handleLogin} />;
  }
}
