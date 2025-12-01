import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  Trash,
  ShieldBan,
  UserCog,
  BookOpen,
  Check,
  X,
} from "lucide-react";
import {
  allUsersQuery,
  deleteUserMutation,
  swapUserRoleMutation,
  toggleBanUserMutation,
} from "@/api/admin";
import { CSRFTokenQuery } from "@/api/authentication";

export default function UsersPage() {
  const { isSuccess: isTokenSuccess } = useQuery(CSRFTokenQuery);
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [dir, setDir] = useState("asc");

  const { data, isSuccess, error } = useQuery({
    queryKey: allUsersQuery.queryKey(search, sort, dir),
    queryFn: allUsersQuery.queryFn,
    enabled: isTokenSuccess,
  });

  const swapRole = useMutation({
    mutationKey: swapUserRoleMutation.mutationKey("0"),
    mutationFn: swapUserRoleMutation.mutationFn,
  });

  const toggleBan = useMutation({
    mutationKey: toggleBanUserMutation.mutationKey("0"),
    mutationFn: toggleBanUserMutation.mutationFn,
  });

  const deleteUser = useMutation({
    mutationKey: deleteUserMutation.mutationKey("0"),
    mutationFn: deleteUserMutation.mutationFn,
  });

  if (error)
    return (
      <p className="text-red-600">Error loading reports: {error.message}</p>
    );
  if (!isSuccess)
    return <p className="text-gray-900 dark:text-gray-100">Loading...</p>;

  const changeDir = () => {
    if (dir == "asc") setDir("desc");
    else setDir("asc");
  };

  const checkSetSort = (value: string) => {
    if (sort == value) {
      changeDir();
    } else {
      setSort(value);
      if (dir == "desc") {
        changeDir();
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Users
      </h2>

      {/* Search + Sort Row */}
      <div className="flex gap-4 mb-4">
        <div className="flex flex-row gap-4">
          <Search className="self-center text-gray-900 dark:text-gray-100 w-4 h-4" />
          <input
            className="p-2 rounded border dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <table className="w-full border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th>
              <button
                className={"p-2" + (sort == "name" ? " underline" : "")}
                onClick={() => checkSetSort("name")}
              >
                Name
              </button>
            </th>

            <th>
              <button
                className={sort == "email" ? " underline" : ""}
                onClick={() => checkSetSort("email")}
              >
                Email
              </button>
            </th>
            <th>
              <button
                className={sort == "role" ? " underline" : ""}
                onClick={() => checkSetSort("role")}
              >
                Role
              </button>
            </th>
            <th>
              <button
                className={sort == "request" ? " underline" : ""}
                onClick={() => checkSetSort("request")}
              >
                Writer Request
              </button>
            </th>
            <th>Banned</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="items-center">
          {data?.users?.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-2">
                <a className="text-blue-500" href={`/user/${u.id}`}>
                  {u.name}
                </a>
              </td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td className="align-middle">
                {u.writer_request ? (
                  <Check className="text-green-500 block mx-auto" />
                ) : (
                  <X className="text-red-500 block mx-auto" />
                )}
              </td>
              <td className="align-middle">
                {u.banned ? (
                  <Check className="text-red-500 block mx-auto" />
                ) : (
                  <X className="text-green-500 block mx-auto" />
                )}
              </td>

              <td className="flex gap-2 p-2">
                {/* Change role */}
                {u.role == "reader" || u.role == "writer" ? (
                  <button
                    title="Change Role"
                    className="p-1 hover:text-blue-500"
                    onClick={() =>
                      swapRole.mutate(u.id, {
                        onSuccess: () => {
                          queryClient.invalidateQueries({
                            queryKey: ["users"],
                          });
                        },
                      })
                    }
                  >
                    <UserCog className="w-5 h-5" />
                  </button>
                ) : (
                  <></>
                )}

                {/* Writer novels link */}
                {u.role === "writer" && (
                  <a
                    title="View Novels"
                    className="p-1 hover:text-purple-500"
                    href={`/user/${u.id}/novels`}
                  >
                    <BookOpen className="w-5 h-5" />
                  </a>
                )}

                {/* Ban user */}
                <button
                  title="Ban User"
                  className="p-1 hover:text-red-500"
                  onClick={() =>
                    toggleBan.mutate(u.id, {
                      onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["users"] });
                      },
                    })
                  }
                >
                  <ShieldBan className="w-5 h-5" />
                </button>

                {/* Delete user */}
                <button
                  title="Delete User"
                  className="p-1 hover:text-red-700"
                  onClick={() =>
                    deleteUser.mutate(u.id, {
                      onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["users"] });
                      },
                    })
                  }
                >
                  <Trash className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
