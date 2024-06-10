import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

export const UpdateUser = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/v1/users/${id}`);
        setUserName(data.user.username);
        setEmail(data.user.email);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    };
    getUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);

    setLoading(true);
    try {
      const { data } = await axios.post(`/api/v1/users/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      toast.success("User updated successfully!");
      navigate("/dashboard");
      setUserName(""); // Update the state with the new data
      setEmail("");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Update User
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link
            to={`/update-user-password/${id}`}
            className="text-sm text-slate-950 hover:underline"
          >
            {`update your password`}
          </Link>
        </div>
      </div>
    </div>
  );
};
