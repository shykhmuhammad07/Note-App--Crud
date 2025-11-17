// Signup.jsx - Fixed with better loading state
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
      try {
        const res = await fetch(`${URL}/auth/check`, {
          method:"GET",
          credentials: "include"
        })
        const data = await res.json()
        
        if(data.loggedIn){
          navigate("/create")
        }
      } catch (err) {
        console.log("Check signup error:", err);
      } finally {
        setLoading(false)
      }
    }
    checkSignup()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );

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