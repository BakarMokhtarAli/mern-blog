import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

export const UpdateUser = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/v1/users/${id}`);

        setUserName(data.user.username);
        setEmail(data.user.email);
        setPreview(data.user.photo);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    };
    getUser();
  }, [id]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setPhoto(file);
      console.log(preview);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("photo", photo);

    setLoading(true);
    try {
      const { data } = await axios.post(`/api/v1/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      toast.success("User updated successfully!");
      navigate("/dashboard");
      setUserName(""); // Update the state with the new data
      setEmail("");
      setPhoto(null);
      setPreview("");
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
          <div>
            <img
              src={preview}
              alt={username}
              className="w-40 h-40 rounded-full mx-auto"
            />
          </div>
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

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              upload photo
            </label>
            <input
              onChange={handlePhotoChange}
              className="w-full px-3 py-2 border rounded-lg"
              id="photo"
              type="file"
              accept="image/*"
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
