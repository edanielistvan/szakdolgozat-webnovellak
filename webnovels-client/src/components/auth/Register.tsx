import { registerMutation } from "@/api/authentication";
import { useAuth } from "@/context/AuthContext";
import type { RegisterMutation } from "@/graphql/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const register = useMutation({
    ...registerMutation,
    onSuccess: (data: RegisterMutation) => {
      queryClient.invalidateQueries({ queryKey: ["csrf-token"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      login(data.register);
      navigate({ to: "/" });
    },
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    register.mutate({
      name: username,
      email: email,
      password: password,
      password_confirmation: passwordConfirm,
    });
  };

  return (
    <div
      className="flex flex-col border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 border 
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700
        max-w-md mx-auto"
    >
      <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
        Register
      </h3>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 text-sm mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 
                        text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 text-sm mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 
                        text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 text-sm mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 
                            text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 text-sm mb-1">
            Password
          </label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 
                            text-gray-900 dark:text-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-2"
        >
          Register
        </button>
      </form>
    </div>
  );
}
