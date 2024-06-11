import React, { useEffect, useState } from "react";
import { Post, Loading } from "../components";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";
export const Posts = () => {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(0);
  const { user } = useUser();
  useEffect(() => {
    const getUserPosts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/v1/users/posts");
        setPostData(data.posts);
        setResult(data.result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data?.message || "An error occured!");
        console.log(error);
      }
    };
    // if (user) {
    //   getUserPosts();
    // }
    getUserPosts();
  }, []);
  // console.log(postData);
  return (
    <>
      {loading && <Loading />}
      <div className="max-w-5xl flex justify-between items-center mx-6 mt-4">
        <>
          <div className="flex flex-row gap-1">
            <p>Posts:</p>
            <span className="bg-slate-950 text-white rounded-full shadow-md w-6 font-bold h-6 text-center">
              {result}
            </span>
          </div>
          <Link
            to="/create-post"
            className="py-2 px-2 rounded-md text-white bg-slate-950"
          >
            create a post
          </Link>
        </>
      </div>
      <div className="max-w-5xl grid sm:grid-cols-2 md:grid-cols-3 gap-2 m-2 mx-auto">
        {postData?.map((post) => (
          <Post key={post._id} post={post} showButtons={true} />
        ))}
      </div>
    </>
  );
};
