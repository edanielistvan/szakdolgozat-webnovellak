import {
  allReportsQuery,
  dismissReportMutation,
  removeCommentMutation,
  toggleBanUserMutation,
} from "@/api/admin";
import { CSRFTokenQuery } from "@/api/authentication";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash, ShieldBan, Check } from "lucide-react";

export default function ReportsPage() {
  const { isSuccess: isTokenSuccess } = useQuery(CSRFTokenQuery);
  const queryClient = useQueryClient();

  const { data, isSuccess, error } = useQuery({
    queryKey: allReportsQuery.queryKey,
    queryFn: allReportsQuery.queryFn,
    enabled: isTokenSuccess,
  });

  const toggleBan = useMutation({
    mutationKey: toggleBanUserMutation.mutationKey("0"),
    mutationFn: toggleBanUserMutation.mutationFn,
  });

  const dismissReport = useMutation(dismissReportMutation);
  const removeComment = useMutation(removeCommentMutation);

  if (error)
    return (
      <p className="text-red-600">Error loading reports: {error.message}</p>
    );
  if (!isSuccess)
    return <p className="text-gray-900 dark:text-gray-100">Loading...</p>;

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>

      <table className="w-full border bg-white dark:bg-gray-800">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="p-2">Comment</th>
            <th>Commenter</th>
            <th>Reporter</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.reports?.map((r) => (
            <tr key={r.id} className="border-b">
              <td className="p-2 max-w-md">{r.comment.text}</td>
              <td>
                <a className="text-blue-500" href={`/user/${r.commenter.id}`}>
                  {r.commenter.name}
                </a>
              </td>
              <td>
                <a className="text-blue-500" href={`/user/${r.reporter.id}`}>
                  {r.reporter.name}
                </a>
              </td>

              <td className="flex gap-2 p-2">
                <button
                  title="Delete comment"
                  className="p-1 hover:text-red-700"
                  onClick={() => {
                    removeComment.mutate(r.comment.id, {
                      onSuccess: () => {
                        dismissReport.mutate(r.comment.id, {
                          onSuccess: () => {
                            queryClient.invalidateQueries({
                              queryKey: ["reports"],
                            });
                            queryClient.invalidateQueries({
                              queryKey: ["users"],
                            });
                          },
                        });
                      },
                    });
                  }}
                >
                  <Trash className="w-5 h-5" />
                </button>

                <button
                  title="Ban user"
                  className="p-1 hover:text-red-500"
                  onClick={() => {
                    toggleBan.mutate(r.commenter.id, {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ["reports"],
                        });
                        queryClient.invalidateQueries({ queryKey: ["users"] });
                      },
                    });
                  }}
                >
                  <ShieldBan className="w-5 h-5" />
                </button>

                <button
                  title="Dismiss report"
                  className="p-1 hover:text-green-500"
                  onClick={() => {
                    dismissReport.mutate(r.comment.id, {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ["reports"],
                        });
                        queryClient.invalidateQueries({ queryKey: ["users"] });
                      },
                    });
                  }}
                >
                  <Check className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
