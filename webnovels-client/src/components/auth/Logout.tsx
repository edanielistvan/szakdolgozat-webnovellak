import { logoutMutation } from "@/api/authentication";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...logoutMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["csrf-token"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      logout();
      navigate({ to: "/" });
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  return null;
}
