import React from "react";
import { Link } from "react-router-dom";

export const EmptyPosts = () => {
  return (
    <section className="text-xl text-center max-w-4xl mx-auto my-10 py-5 text-slate-950 m-2 border dark:border-slate-700 rounded mb-20">
      <div className="my-5">
        <p className="bi bi-file-post text-slate-800 text-7xl mb-5"></p>
        <p>Oops! Your posts dashboard looks empty!</p>
        <p>
          Add new posts to your dashboard from
          <span className="text-blue-500 hover:underline">
            <Link to={`/create-post`}> Here👉 </Link>
          </span>
          .
        </p>
      </div>
      <Link
        to="/"
        type="button"
        className="text-white bg-slate-700 hover:bg-blue-800 rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
      >
        Go to Home Page
      </Link>
    </section>
  );
};
