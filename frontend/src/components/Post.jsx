import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AlertDialog } from "./AlertDialog";
import { useUser } from "../hooks/useUser";
import { EmptyPosts } from "../components/EmptyPosts";
export const Post = ({ post, showButtons }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useUser();

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex justify-center items-center">
      {isOpen && (
        <AlertDialog
          id={post._id}
          post={post}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <div className="max-w-xs container bg-white border rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl mx-auto m-2">
        <div>
          {/* <span className="text-white text-xs font-bold rounded-lg bg-green-500 inline-block mt-4 ml-4 py-1.5 px-4 cursor-pointer"></span> */}
          <h1 className="w-full border-b-2 text-xl mt-2 p-3 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">
            {post.title}
          </h1>
          <p className="ml-4 mt-1 mb-2 text-gray-700 cursor-pointer">
            {post.content.length > 50 ? (
              <>
                {isExpanded
                  ? post.content
                  : `${post.content.substring(0, 50)}...`}
                <button
                  onClick={toggleReadMore}
                  className="text-slate-900 ml-2"
                >
                  {isExpanded ? "See Less" : "See More"}
                </button>
              </>
            ) : (
              post.content
            )}
          </p>
        </div>
        <img
          className="w-full h-52 cursor-pointer"
          src={post.image}
          alt={post.title}
        />
        <div className="flex p-4 justify-between">
          <div className="flex items-center space-x-2">
            <img
              className="w-10 rounded-full"
              src={post.author?.photo}
              alt={post.author?.username}
            />
            <h2 className="text-gray-800 font-bold cursor-pointer">
              {post.author?.username || "deleted author"}
            </h2>
          </div>
          {user?.user._id === post.author?._id && (
            <div className="flex space-x-2">
              <div className="flex space-x-1 items-center">
                <Link
                  to={`/update-post/${post._id}`}
                  className="text-xl text-yellow-400 font-semibold"
                >
                  <FaEdit />
                </Link>
              </div>
              <div className="flex space-x-1 items-center">
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-red-500 text-xl hover:scale-95"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
