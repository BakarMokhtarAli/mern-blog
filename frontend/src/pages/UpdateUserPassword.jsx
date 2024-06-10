import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

export const UpdateUserPassword = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const getUser = async () => {
  //       try {
  //         const { data } = await axios.get(`/api/v1/users/${id}`);
  //         setCurrentPassword(data.user.password);
  //         //   setEmail(data.user.email);
  //         console.log(data);
  //       } catch (error) {
  //         toast.error(error.response.data.message);
  //         console.log(error);
  //       }
  //     };
  //     getUser();
  //   }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      passwordCurrent: currentPassword,
      password: newPassword,
      passwordConfirm: confirmNewPassword,
    };

    setLoading(true);
    try {
      const { data } = await axios.post(
        `/api/v1/users/update-password/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success(data.message);
      navigate("/dashboard");
      setLoading(false);
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
          {/* current password */}
          <input
            id="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            className="block w-full py-3 text-slate-900 border bg-white rounded-lg px-11 focus:outline-none focus:ring focus:ring-opacity-10 focus:ring-slate-950"
            placeholder="Enter current password"
            value={currentPassword || ""}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <div className="flex my-2">
            <input
              id="toggle-current-password"
              type="checkbox"
              className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
              checked={showCurrentPassword}
              onChange={() => setShowCurrentPassword(!showCurrentPassword)}
            />
            <label
              htmlFor="toggle-current-password"
              className="text-sm text-gray-500 ms-3"
            >
              Show password
            </label>
          </div>

          {/* New Password */}

          <input
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            className="block w-full py-3 text-slate-900 border bg-white rounded-lg px-11 focus:outline-none focus:ring focus:ring-opacity-10 focus:ring-slate-950"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div className="flex my-2">
            <input
              id="toggle-new-password"
              type="checkbox"
              className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
              checked={showNewPassword}
              onChange={() => setShowNewPassword(!showNewPassword)}
            />
            <label
              htmlFor="toggle-new-password"
              className="text-sm text-gray-500 ms-3"
            >
              Show password
            </label>
          </div>

          {/* Confirm New Password */}

          <input
            id="confirmNewPassword"
            type={showConfirmNewPassword ? "text" : "password"}
            className="block w-full py-3 text-slate-900 border bg-white rounded-lg px-11 focus:outline-none focus:ring focus:ring-opacity-10 focus:ring-slate-950"
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <div className="flex my-2">
            <input
              id="toggle-confirm-new-password"
              type="checkbox"
              className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
              checked={showConfirmNewPassword}
              onChange={() =>
                setShowConfirmNewPassword(!showConfirmNewPassword)
              }
            />
            <label
              htmlFor="toggle-confirm-new-password"
              className="text-sm text-gray-500 ms-3"
            >
              Show password
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 bg-blue-600 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
    // <div className="max-w-sm mb-5">
    //   {/* Current Password */}
    //   <label htmlFor="current-password" className="block text-sm mb-2">
    //     Current password
    //   </label>
    //   <input
    //     id="current-password"
    //     type={showCurrentPassword ? "text" : "password"}
    //     className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
    //     placeholder="Enter current password"
    //     value={currentPassword}
    //     onChange={(e) => setCurrentPassword(e.target.value)}
    //   />
    //   <div className="flex mt-4">
    //     <input
    //       id="toggle-current-password"
    //       type="checkbox"
    //       className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
    //       checked={showCurrentPassword}
    //       onChange={() => setShowCurrentPassword(!showCurrentPassword)}
    //     />
    //     <label
    //       htmlFor="toggle-current-password"
    //       className="text-sm text-gray-500 ms-3"
    //     >
    //       Show password
    //     </label>
    //   </div>

    //   {/* New Password */}
    //   <label htmlFor="new-password" className="block text-sm mb-2 mt-4">
    //     New password
    //   </label>
    //   <input
    //     id="new-password"
    //     type={showNewPassword ? "text" : "password"}
    //     className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
    //     placeholder="Enter new password"
    //     value={newPassword}
    //     onChange={(e) => setNewPassword(e.target.value)}
    //   />
    //   <div className="flex mt-4">
    //     <input
    //       id="toggle-new-password"
    //       type="checkbox"
    //       className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
    //       checked={showNewPassword}
    //       onChange={() => setShowNewPassword(!showNewPassword)}
    //     />
    //     <label
    //       htmlFor="toggle-new-password"
    //       className="text-sm text-gray-500 ms-3"
    //     >
    //       Show password
    //     </label>
    //   </div>

    //   {/* Confirm New Password */}
    //   <label htmlFor="confirm-new-password" className="block text-sm mb-2 mt-4">
    //     Confirm new password
    //   </label>
    //   <input
    //     id="confirm-new-password"
    //     type={showConfirmNewPassword ? "text" : "password"}
    //     className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
    //     placeholder="Confirm new password"
    //     value={confirmNewPassword}
    //     onChange={(e) => setConfirmNewPassword(e.target.value)}
    //   />
    //   <div className="flex mt-4">
    //     <input
    //       id="toggle-confirm-new-password"
    //       type="checkbox"
    //       className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
    //       checked={showConfirmNewPassword}
    //       onChange={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
    //     />
    //     <label
    //       htmlFor="toggle-confirm-new-password"
    //       className="text-sm text-gray-500 ms-3"
    //     >
    //       Show password
    //     </label>
    //   </div>
    // </div>
  );
};
