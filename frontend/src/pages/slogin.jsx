import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../component/ui/button";


export const SuperuserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/slogin`, 
        formData
      );

      const { token, message } = response.data;
      setSuccess(message);
      
      localStorage.setItem("superuser_token", token);
      localStorage.setItem("isSuperuser", true);
      
      navigate("/admin");

    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                         err.response?.data?.message || 
                         "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">

        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
            {success}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
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

          <div className="flex items-center justify-between">
            <Button
              text={loading ? "Authenticating..." : "Login"}
              variant={"blackBg"}
              size={"lg"}
              animation={true}
              type="submit"
              disabled={loading}
            />
            <Button
              text={"Back to Home"}
              animation={false}
              underLineAnimation={true}
              size={"md"}
              variant="transparent"
              onClickHandler={() => navigate("/")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};