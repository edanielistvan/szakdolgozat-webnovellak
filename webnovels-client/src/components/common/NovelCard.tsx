import type { Novel } from "@/types/novel";
import { Link } from "@tanstack/react-router";

export function NovelCard(novel: Novel) {
  const starPercentage = ((novel.rating ?? 0) / 10) * 100;

  const cat_image =
    "https://hips.hearstapps.com/hmg-prod/images/cutest-cat-breeds-ragdoll-663a8c6d52172.jpg";

  return (
    <div
      className="border-gray-200 dark:border-gray-700 border shadow-md overflow-hidden hover:shadow-lg 
                        transition-shadow duration-300 w-auto h-auto"
    >
      <div className="flex flex-row p-4 items-start">
        <img
          className="max-w-30 h-auto object-cover self-center"
          src={cat_image}
          alt={novel.title}
        />
        <div className="pl-4 flex flex-col items-start justify-start">
          <h2 className="text-md font-bold text-gray-900 dark:text-gray-100 hover:text-blue-500 ">
            <Link to={"/novels/" + novel.id}>{novel.title}</Link>
          </h2>
          <p className="text-sm text-gray-500">
            by <Link to={"/user/" + novel.user?.id}>{novel.user?.name}</Link>
          </p>
          <div className="mt-2">
            <div className="relative w-30 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  width: `${starPercentage}%`,
                  background: "linear-gradient(90deg, #FFD700, #FFA500)",
                }}
              />
            </div>
            <span className="text-sm text-gray-600 mt-1 block">
              {novel.rating}/10
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {(novel.reads ?? 0).toLocaleString()} reads
          </p>
        </div>
      </div>
    </div>
  );
}
