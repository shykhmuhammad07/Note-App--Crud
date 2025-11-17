import { useEffect } from "react";
import SignupForm from "../Components/SignuForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(true)
  let URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function checkSignup() {
       const res = await fetch(`${URL}/auth/check`, {
        method:"GET",
        credentials: "include"
      })
      const data = await res.json()
      
      if(data.loggedIn){
        navigate("/create")
      }
      setLoading(false)
    }
    checkSignup()
  }, [])

  async function getData(value) {
    console.log("Data Values", value);
    try {
      const res = await fetch(`${URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      const data = await res.json();
      console.log("Data:", data);

      if (res.ok) {
        navigate("/login");
      } else {
        console.log("Signup Failed", data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <>
      <SignupForm getData={getData} />
    </>
  );
}

export default Signup;
