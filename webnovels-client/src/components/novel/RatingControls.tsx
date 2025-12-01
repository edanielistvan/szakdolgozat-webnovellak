import { CSRFTokenQuery } from "@/api/authentication";
import {
  deleteRatingMutation,
  didUserRateQuery,
  rateNovelMutation,
} from "@/api/novels";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function RatingControls({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { isSuccess: isTokenSuccess } = useQuery(CSRFTokenQuery);

  const { data, isSuccess, error } = useQuery({
    queryKey: didUserRateQuery.queryKey(id),
    queryFn: didUserRateQuery.queryFn,
    enabled: !!id && isTokenSuccess,
  });

  const initial = data?.didUserRateNovel?.rating ?? 0;

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  const [value, setValue] = useState(initial);
  const rated = data?.didUserRateNovel?.exists === true;

  const rateMutation = useMutation({
    mutationKey: rateNovelMutation.mutationKey(id, value),
    mutationFn: rateNovelMutation.mutationFn,
  });

  const deleteRateMutation = useMutation({
    mutationKey: deleteRatingMutation.mutationKey(id),
    mutationFn: deleteRatingMutation.mutationFn,
  });

  const onRate = () => {
    rateMutation.mutate(
      {
        novelId: id,
        rating: value,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getNovel"] });
          queryClient.invalidateQueries({ queryKey: ["didUserRate"] });
        },
        onError: () => {
          console.log(rateMutation.error?.message);
        },
      }
    );
  };

  const onRemove = () => {
    deleteRateMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getNovel"] });
        queryClient.invalidateQueries({ queryKey: ["didUserRate"] });
      },
    });
  };

  if (error)
    return <p className="text-gray-900 dark:text-gray-100">{error.message}</p>;

  if (!isSuccess)
    return <p className="text-gray-900 dark:text-gray-100">Loading...</p>;

  return (
    <div className="flex flex-col gap-3 mt-2 w-full">
      {/* Slider */}
      <div className="flex flex-col w-full">
        <label className="text-sm mb-1 text-gray-600 dark:text-gray-300">
          Your Rating: {value.toFixed(2)} / 10
        </label>

        <input
          type="range"
          min="0"
          max="10"
          step="0.01"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300 dark:bg-gray-700"
          style={{
            background: `linear-gradient(90deg, #FFD700 ${value * 10}%, #ccc ${
              value * 10
            }%)`,
          }}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onRate}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
        >
          {rated ? "Update" : "Rate"}
        </button>

        {rated && (
          <button
            onClick={onRemove}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm transition"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
