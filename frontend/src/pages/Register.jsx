import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
export const Register = () => {
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    // console.log(event.target.value);
    // console.log(formData);
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/users/sign-up", formData);
      console.log(data);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <section className="bg-white mb-4">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex items-center justify-center mt-6">
            <span className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-slate-800">
              sign up
            </span>
          </div>

          <div className="relative flex items-center mt-8">
            {/* <span className="absolute">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span> */}
            <span className="absolute">
              <CiUser className="w-6 h-6 mx-3 text-gray-300 " />
            </span>
            <input
              onChange={handleInputChange}
              type="text"
              id="username"
              className="block w-full py-3 text-slate-900 border bg-white rounded-lg px-11 focus:outline-none focus:ring focus:ring-opacity-10 focus:ring-slate-950"
              placeholder="Username"
            />
          </div>

          {/* <label
            htmlFor="dropzone-file"
            className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-300 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <h2 className="mx-3 text-gray-400">Profile Photo</h2>
            <input id="dropzone-file" type="file" className="hidden" />
          </label> */}

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
              type="email"
              id="email"
              className="block w-full py-3 text-slate-900 border bg-white rounded-lg px-11 focus:outline-none focus:ring focus:ring-opacity-10 focus:ring-slate-950"
              placeholder="Email address"
              onChange={handleInputChange}
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
              type="password"
              id="password"
              className="block w-full py-3 text-slate-900 border bg-white rounded-lg px-11 focus:outline-none focus:ring focus:ring-opacity-10 focus:ring-slate-950"
              placeholder="Password"
              onChange={handleInputChange}
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
              type="password"
              id="passwordConfirm"
              className="block w-full py-3 text-slate-900 border bg-white rounded-lg px-11 focus:outline-none focus:ring focus:ring-opacity-10 focus:ring-slate-950"
              placeholder="Confirm Password"
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="block w-full py-3 bg-slate-900 border text-white rounded-lg px-11 focus:outline-none focus:ring focus:ring-opacity-10 focus:ring-slate-950"
            >
              {loading ? "signuping..." : "sign up"}
            </button>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-slate-950 hover:underline"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
