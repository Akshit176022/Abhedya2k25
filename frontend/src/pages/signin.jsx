import { useState } from "react";
import { LinearGradientText } from "../component/ui/linearGradientText";
import { Button } from "../component/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ;

export const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem("token", response.data.token);
      navigate("/gamepage");
      
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                         err.response?.data?.message || 
                         "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex lg:w-3xl justify-center items-center min-h-screen p-5">
        <form 
          onSubmit={handleSubmit}
          className="bg-slate-600/20 lg:w-1/2 rounded-xl py-10 px-10 backdrop-blur-[3px] border-2 border-teal-800 h-fit"
        >
          <LinearGradientText
            text={"Sign In"}
            subtitlePreset={false}
            size={"md"}
          />

          {error && (
            <div className="mt-4 p-2 bg-red-100 text-red-700 rounded text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-5 mt-10">
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-teal-950 text-teal-50 outline-0 w-full md:text-xl md:rounded-lg rounded md:py-2 md:px-3 py-1 px-2 placeholder:text-teal-600 focus:outline-1 outline-teal-600"
            />
            <input
              type="password" 
              name="password"
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-teal-950 text-teal-50 outline-0 w-full md:text-xl md:rounded-lg rounded md:py-2 md:px-3 py-1 px-2 placeholder:text-teal-600 focus:outline-1 outline-teal-600"
            />
          </div>

          <div className="mt-8 flex justify-between items-center">
            <Button
              text={isLoading ? "Signing In..." : "Sign In"}
              variant={"blackBg"}
              animation={true}
              size={"lg"}
              type="submit"
              disabled={isLoading}
            />
            <Button
              text={"Sign Up"}
              animation={false}
              underLineAnimation={true}
              size={"lg"}
              variant="transparent"
              onClickHandler={() => navigate("/signup")}
              type="button"
            />
          </div>
        </form>
      </div>
      <div className="w-1/2 min-h-screen hidden lg:flex justify-end items-end">
        <img
          className="object-bottom object-cover h-[35vw] rotate-y-180"
          src="../../public/webImage.webp"
          alt="Sign in visual"
        />
      </div>
    </div>
  );
};