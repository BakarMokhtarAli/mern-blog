import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState([
    {
      username: "",
      email: "",
      password: "",
    },
  ]);
  const { user, logIn } = useUser();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/users/sign-in", formData);
      logIn(data, data.expiresIn);
      toast.success("logged in success");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message || error.response.data);
      console.log(error);
    }
  };
  return (
    <section className="bg-white mb-4">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex items-center justify-center mt-6">
            <span className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-slate-800">
              sign In
            </span>
          </div>

          <div className="relative flex items-center mt-6">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <input
              onChange={handleInputChange}
              type="email"
              name="email"
              className="block w-full py-3 text-slate-900 border bg-white rounded-lg px-11 focus:outline-none focus:ring focus:ring-opacity-10 focus:ring-slate-950"
              placeholder="Email address"
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              onChange={handleInputChange}
              type="password"
              name="password"
              className="block w-full py-3 text-slate-900 border bg-white rounded-lg px-11 focus:outline-none focus:ring focus:ring-opacity-10 focus:ring-slate-950"
              placeholder="Password"
            />
          </div>

          <div className="mt-6">
            <button className="block w-full py-3 bg-slate-900 border text-white rounded-lg px-11 focus:outline-none focus:ring focus:ring-opacity-10 focus:ring-slate-950">
              {loading ? "login..." : "login"}
            </button>

            <div className="mt-6 text-center">
              <Link
                to="/register"
                className="text-sm text-slate-950 hover:underline"
              >
                {`didn't have an account? register`}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
