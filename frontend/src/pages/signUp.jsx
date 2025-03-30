import { useState } from "react";
import { LinearGradientText } from "../component/ui/linearGradientText";
import { Button } from "../component/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    rollNo: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      { name: "username", message: "Username is required" },
      { name: "email", message: "Email is required" },
      { name: "password", message: "Password is required" },
      { name: "confirmPassword", message: "Please confirm your password" },
      { name: "phone", message: "Phone number is required" },
      { name: "rollNo", message: "Roll number is required" }
    ];

    for (const field of requiredFields) {
      if (!formData[field.name]?.trim()) {
        setError(field.message);
        return false;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const response = await axios.post(`${API_BASE_URL}/register`, {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim(),
        rollNo: formData.rollNo.trim(),
      });

      if (response.status === 201) {
        alert("Registration successful! Please check your email for verification (also check spam folder).");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          rollNo: ""
        });
        navigate("/signin");
      }
    } catch (err) {
      if (err.response?.data?.code === 11000 || 
          err.response?.data?.message?.includes('duplicate') || 
          err.response?.data?.error?.includes('duplicate')) {
        if (err.response?.data?.message?.includes('email')) {
          setError("Email is already registered. Please use a different email.");
        } else {
          setError(`Username "${formData.username}" is already taken. Please try a different one.`);
        }
      } else {
        setError(err.response?.data?.message || "Registration failed. Please try again.");
      }
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex lg:w-3xl justify-center items-center min-h-screen p-5">
        <form onSubmit={handleSubmit} className="bg-slate-600/20 lg:w-1/2 rounded-xl py-8 px-12 backdrop-blur-[3px] border-2 border-teal-800 h-fit">
          <LinearGradientText
            text={"Sign Up"}
            subtitlePreset={false}
            size={"md"}
          />
          
          {error && (
            <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-5 mt-10">
            <input
              type="text" 
              name="username"
              placeholder="Username" 
              value={formData.username}
              onChange={handleChange}
              className="bg-teal-950 text-teal-50 outline-0 w-full md:text-xl md:rounded-lg rounded md:py-2 md:px-3 py-1 px-2 placeholder:text-teal-600 focus:outline-1 outline-teal-600"
              required
              minLength={3}
              maxLength={20}
            />
            <input
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              className="bg-teal-950 text-teal-50 outline-0 w-full md:text-xl md:rounded-lg rounded md:py-2 md:px-3 py-1 px-2 placeholder:text-teal-600 focus:outline-1 outline-teal-600"
              required
            />
            <input
              type="password" 
              name="password"
              placeholder="Password (min 6 characters)" 
              value={formData.password}
              onChange={handleChange}
              className="bg-teal-950 text-teal-50 outline-0 w-full md:text-xl md:rounded-lg rounded md:py-2 md:px-3 py-1 px-2 placeholder:text-teal-600 focus:outline-1 outline-teal-600"
              required
              minLength={6}
            />
            <input
              type="password" 
              name="confirmPassword"
              placeholder="Confirm Password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="bg-teal-950 text-teal-50 outline-0 w-full md:text-xl md:rounded-lg rounded md:py-2 md:px-3 py-1 px-2 placeholder:text-teal-600 focus:outline-1 outline-teal-600"
            />
            <input
              type="tel" 
              name="phone"
              placeholder="Phone Number (10 digits)" 
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="bg-teal-950 text-teal-50 outline-0 w-full md:text-xl md:rounded-lg rounded md:py-2 md:px-3 py-1 px-2 placeholder:text-teal-600 focus:outline-1 outline-teal-600"
            />
            <input
              type="text" 
              name="rollNo"
              placeholder="Roll Number" 
              value={formData.rollNo}
              onChange={handleChange}
              required
              className="bg-teal-950 text-teal-50 outline-0 w-full md:text-xl md:rounded-lg rounded md:py-2 md:px-3 py-1 px-2 placeholder:text-teal-600 focus:outline-1 outline-teal-600"
            />
          </div>
          
          <div className="mt-8 flex justify-between items-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 rounded-lg text-white font-medium ${
                isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
              } transition-colors duration-200`}
            >
              {isLoading ? "Processing..." : "Sign Up"}
            </button>
            <Button
              text={"Sign In"}
              animation={false}
              underLineAnimation={true}
              size={"lg"}
              variant="transparent"
              onClickHandler={() => navigate("/signin")}
              type="button"
            />
          </div>
        </form>
      </div>
      <div className="w-1/2 min-h-screen hidden lg:flex justify-end items-end">
        <img
          className="object-bottom object-cover h-[35vw] rotate-y-180"
          src="../../public/webImage.webp"
          alt="Sign up visual"
        />
      </div>
    </div>
  );
};