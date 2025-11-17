import { useEffect, useState } from "react";
import LoginForm from "../Components/LoginForm";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  let URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch(`${URL}/auth/check`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.loggedIn) {
          navigate("/create");
        }
      } catch (err) {
        console.log("Check login error:", err);
      } finally {
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  if (loading) return <div>Loading...</div>;

  async function getData(value) {
    try {
      const res = await fetch(`${URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok) {
        navigate("/create");
      } else {
        console.log("Login Error:", data.msg || data);
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  }

  return <LoginForm getData={getData} />;
}

export default Login;
