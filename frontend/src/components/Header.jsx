import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { DropdownLoggedIn } from "./DropdownLoggedIn";
export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = useUser();
  // console.log(user);
  const logOutUser = () => {
    logOut();
    navigate("/login");
  };
  return (
    <header className="sticky top-0 z-30 w-full px-2 py-4 bg-slate-800 text-white sm:px-4">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <Link to="/" className="flex items-center">
          <span className="text-2xl">plog</span>
        </Link>
        <div className="flex items-center justify-center space-x-1 gap-4 underline-none">
          {user ? (
            <div className="hidden space-x-1  md:inline-flex">
              <Link to="/" className="btn btn-sm mx-3 btn-link">
                Home
              </Link>
              <Link to="/dashboard" className="btn btn-sm mx-3 btn-link">
                dashboard
              </Link>
              {user?.user.photo != "default.jpg" ? (
                <img
                  onClick={() => setDropdown(!dropdown)}
                  src={user?.user.photo}
                  alt={
                    <span className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white"></span>
                  }
                  className="cursor-pointer w-10 h-10 rounded-full text-gray-700 dark:text-white"
                />
              ) : (
                <span
                  onClick={() => setDropdown(!dropdown)}
                  className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white"
                ></span>
              )}
              {dropdown && (
                <DropdownLoggedIn setDropdown={setDropdown} user={user} />
              )}
            </div>
          ) : (
            <>
              <div className="hidden space-x-1 md:inline-flex gap-2">
                <Link to="/" className="btn btn-sm mx-3 text-xl">
                  Home
                </Link>
                <Link to="/login" className="btn btn-sm mx-3 text-xl btn-link">
                  Sign-in
                </Link>
              </div>
              <Link to="/register" className="btn btn-sm mx-3 btn-primary">
                <button className="p-2 bg-white rounded-md text-black">
                  Get Started
                </button>
              </Link>
            </>
          )}
          <div className="inline-flex md:hidden">
            {user && (
              <img
                onClick={() => setDropdown(!dropdown)}
                src={user?.user.photo}
                alt={user?.user.username}
                className="cursor-pointer w-10 h-10 rounded-full text-gray-700 dark:text-white"
              />
            )}
            {dropdown && user && (
              <DropdownLoggedIn setDropdown={setDropdown} user={user} />
            )}
            <button
              className="flex-none px-2 btn btn-link btn-sm text-2xl"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <span className="sr-only">Open Menu</span>
            </button>
            {menuOpen && (
              <>
                <div
                  className="absolute top-4 left-0 right-0 z-50 flex flex-col p-2 pb-4 space-y-3 bg-slate-800 text-white rounded shadow"
                  onClick={() => setMenuOpen(false)}
                >
                  <button
                    className="self-end flex-none px-2 ml-2 btn btn-link btn-icon"
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span className="sr-only">Close Menu</span>
                  </button>
                  {user ? (
                    <>
                      <Link to="/" className="w-full m-2 btn btn-link">
                        Home
                      </Link>
                      <Link to="/dashboard" className="w-full m-2 btn btn-link">
                        dashboard
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/" className="w-full m-2 btn btn-link">
                        Home
                      </Link>
                      <Link to="/dashboard" className="w-full m-2 btn btn-link">
                        dashboard
                      </Link>
                      <Link to="/login" className="w-full m-2 btn btn-link">
                        Sign-in
                      </Link>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
