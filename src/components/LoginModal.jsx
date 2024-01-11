import React, { useState } from "react";
import Backdrop from "../components/Backdrop";
import { IoMdClose } from "react-icons/io";
import Loader from "../components/Loader"; // Assuming you have a Loader component
import supabase from '../utilities/supabase'; // Import the common Supabase initialization

export default function Modal({ handleClose,onChildData }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
    // Reset error message when the user types
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!loginData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        console.error('Error logging in:', error.message);
        setErrors({ ...errors, email: "Invalid email or password" });
      } else {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          onChildData(data.user);
          handleClose(false);
        } else {
          console.error('Error: User is undefined after successful login');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Backdrop>
      <IoMdClose
        color={"white"}
        size={40}
        onClick={() => handleClose(false)}
        className="fixed cursor-pointer opacity-60 top-[16.1px] left-[16.1px]"
      />
      <div
        className="absolute max-w-[1200px] mb-[16.1px] mt-[32.2px] outline-none bg-white rounded-md p-[15px]"
        style={{ width: "calc(100vw - 2rem)" }}
      >
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Login</h2>
          <form>
            <div className="mb-2">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className={`w-full border rounded p-2 ${
                  errors.email && "border-red-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className={`w-full border rounded p-2 ${
                  errors.password && "border-red-500"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-blue-500 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? <Loader /> : "Login"}
            </button>
          </form>
        </section>
      </div>
    </Backdrop>
  );
}

7