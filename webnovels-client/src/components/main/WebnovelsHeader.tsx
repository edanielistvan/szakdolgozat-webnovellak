import { Link } from "@tanstack/react-router";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export function WebnovelsHeader() {
  const { darkMode, toggleDarkMode } = useTheme();

  const { loggedIn, user } = useAuth();

  const [searchInput, setSearchInput] = useState("");

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="mx-auto flex flex-col px-6 py-4">
        {/* Title and search bar */}

        <div className="flex justify-between items-center mt-2">
          <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Webnovels
          </h1>

          {loggedIn && (
            <div className="flex flex-row gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                required
                placeholder="Search novels..."
                className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                        placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        transition-colors duration-200"
              />

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded"
              >
                <Link to={"/search"} search={{ text: searchInput }}>
                  Search
                </Link>
              </button>
            </div>
          )}
        </div>

        {/* Menu + Auth Buttons */}

        <div className="flex justify-between items-center mt-2">
          {/* Menu (Left column)*/}

          <div className="flex items-center gap-6 text-gray-700 dark:text-gray-300 text-sm">
            <p className="hover:text-blue-500 transition-colors">
              <Link to="/">Home</Link>
            </p>

            {loggedIn ? (
              <>
                <p className="hover:text-blue-500 transition-colors">
                  <Link to={"/user/" + user?.id}>Profile</Link>
                </p>

                <p className="hover:text-blue-500 transition-colors">
                  <Link to={"/readinglist/" + user?.id}>Reading List</Link>
                </p>

                <p className="hover:text-blue-500 transition-colors">
                  <Link to={"/quotes/" + user?.id}>Quotes</Link>
                </p>
              </>
            ) : (
              <></>
            )}

            {loggedIn && (user!.role == "writer" || user!.role == "admin") ? (
              <>
                <p className="hover:text-blue-500 transition-colors">
                  <Link to={"/publish/" + user?.id}>Publish</Link>
                </p>
              </>
            ) : (
              <></>
            )}

            {loggedIn && user!.role == "admin" ? (
              <>
                <p className="hover:text-blue-500 transition-colors">
                  <Link to={"/admin"}>Admin</Link>
                </p>
              </>
            ) : (
              <></>
            )}
          </div>

          {/* Auth buttons (Right column) */}

          <div className="flex items-center gap-4">
            {loggedIn ? (
              <>
                <p className="text-gray-900 dark:text-gray-100">
                  Logged in: {user?.name}
                </p>

                <button className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-500">
                  <Link to="/logout">Logout</Link>
                </button>
              </>
            ) : (
              <>
                <button className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500">
                  <Link to="/register">Register</Link>
                </button>

                <button className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500">
                  <Link to="/login">Login</Link>
                </button>
              </>
            )}

            {/* Light/Dark Mode Toggle */}

            <button
              onClick={() => toggleDarkMode()}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
