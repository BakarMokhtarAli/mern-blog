import axios from "axios";
import { useUser } from "../hooks/useUser";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loading, Post } from "../components";

export const Home = () => {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(0);
  const { user } = useUser();
  useEffect(() => {
    const getAllPosts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/v1/posts");
        const response = data.data.posts;
        setPostData(response);
        setResult(data.results);
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
    getAllPosts();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      <div className="max-w-5xl flex justify-around items-center mr-10 mx-auto mt-4">
        <div className="flex flex-row gap-1">
          <p>Posts:</p>
          <span className="bg-slate-950 text-white rounded-full shadow-md w-6 font-bold h-6 text-center">
            {result}
          </span>
        </div>
      </div>

      <div className="max-w-5xl grid sm:grid-cols-2 md:grid-cols-3 gap-2 m-2 mx-auto">
        {postData?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
