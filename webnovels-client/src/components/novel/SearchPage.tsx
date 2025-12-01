import { CSRFTokenQuery } from "@/api/authentication";
import { searchNovelsQuery } from "@/api/novels";
import { NovelCardList } from "@/components/common/NovelCardList";
import {
  QuerySearchNovelsOrderByColumn,
  QuerySearchNovelsWhereColumn,
  SortOrder,
  SqlOperator,
  type QuerySearchNovelsWhereWhereConditions,
} from "@/graphql/graphql";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

type SearchType = "TITLE" | "AUTHOR" | "TAGS";

interface SortState {
  column: QuerySearchNovelsOrderByColumn;
  order: SortOrder;
}

const sortOptions: { label: string; column: QuerySearchNovelsOrderByColumn }[] =
  [
    { label: "Title", column: QuerySearchNovelsOrderByColumn.Title },
    { label: "Rating", column: QuerySearchNovelsOrderByColumn.Rating },
    { label: "Reads", column: QuerySearchNovelsOrderByColumn.Reads },
    { label: "Chapters", column: QuerySearchNovelsOrderByColumn.ChaptersCount },
    {
      label: "Favorites",
      column: QuerySearchNovelsOrderByColumn.FavouritesCount,
    },
    { label: "Comments", column: QuerySearchNovelsOrderByColumn.CommentsCount },
  ];

export function SearchPage() {
  const { text } = useSearch({ from: "/search" });
  const navigate = useNavigate();
  const { isSuccess: isTokenSuccess } = useQuery(CSRFTokenQuery);

  const [searchInput, setSearchInput] = useState(text);
  const [searchType, setSearchType] = useState<SearchType>("TITLE");
  const [sort, setSort] = useState<SortState>({
    column: QuerySearchNovelsOrderByColumn.Title,
    order: SortOrder.Asc,
  });

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      navigate({ to: "/search", search: { text: searchInput } });
    },
    [searchInput, navigate]
  );

  const handleSortChange = (column: QuerySearchNovelsOrderByColumn) => {
    setSort((prev) => ({
      column: column,
      order:
        prev.column === column && prev.order === SortOrder.Desc
          ? SortOrder.Asc
          : SortOrder.Desc,
    }));
  };

  const whereClause = useMemo(() => {
    const currentText = text.trim();
    if (!currentText || currentText == "") return {};

    const searchText = `%${currentText}%`;

    let clause: QuerySearchNovelsWhereWhereConditions = {};

    if (searchType === "TITLE") {
      clause.column = QuerySearchNovelsWhereColumn.Title;
      clause.operator = SqlOperator.Like;
      clause.value = searchText;
    } else if (searchType === "AUTHOR") {
      clause.column = QuerySearchNovelsWhereColumn.Author;
      clause.operator = SqlOperator.Like;
      clause.value = searchText;
    } else if (searchType === "TAGS") {
      clause.column = QuerySearchNovelsWhereColumn.TagString;
      clause.operator = SqlOperator.Like;
      clause.value = searchText;
    }

    return clause;
  }, [text, searchType]);

  const orderByClause = useMemo(() => {
    return [{ column: sort.column, order: sort.order }];
  }, [sort]);

  const { data, isSuccess, error } = useQuery({
    queryKey: searchNovelsQuery.queryKey(whereClause, orderByClause),
    queryFn: searchNovelsQuery.queryFn,
    enabled: isTokenSuccess,
  });

  if (error)
    return (
      <p className="text-red-600">
        Error loading search results: {error.message}
      </p>
    );
  if (!isSuccess)
    return <p className="text-gray-900 dark:text-gray-100">Loading...</p>;

  return (
    <div className="flex flex-col gap-4 self-start mt-4 w-full items-center">
      {/* 1. Combined Search Bar and Type Selector */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-2 w-full max-w-4xl p-4 border rounded-box text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md self-center"
      >
        <div className="flex flex-row gap-2">
          {/* Search Input */}
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search novels..."
            className="input input-bordered w-full input-primary"
          />
          {/* Search Button */}
          <button type="submit" className="btn btn-primary flex flex-row gap-2">
            <Search size={20} />
            <span>Search</span>
          </button>
        </div>

        {/* Search Type Radios */}
        <div className="flex flex-wrap justify-start gap-4 text-sm mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 ">
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Search By:
          </span>
          {(["TITLE", "AUTHOR", "TAGS"] as SearchType[]).map((type) => (
            <label key={type} className="label cursor-pointer gap-1">
              <input
                type="radio"
                name="searchType"
                className="radio radio-primary radio-xs"
                checked={searchType === type}
                onChange={() => setSearchType(type)}
              />
              <span className="label-text text-gray-700 dark:text-gray-300">
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </span>
            </label>
          ))}
        </div>
      </form>

      {/* 2. Controls Row: Sorting and Filtering */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl text-gray-900 dark:text-gray-100">
        {/* 2A. Sort Controls (Full width on mobile) */}
        <div className="flex flex-col gap-2 p-4 border rounded-box border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md w-full md:w-3/4 ">
          <strong className="text-lg mb-1 text-gray-900 dark:text-gray-100">
            Sort Results
          </strong>
          <div className="flex flex-wrap gap-2 text-sm">
            {sortOptions.map(({ label, column }) => {
              const isActive = sort.column === column;
              const directionIcon =
                isActive && sort.order === SortOrder.Desc ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronUp size={14} />
                );

              return (
                <button
                  key={column}
                  onClick={() => handleSortChange(column)}
                  className={`btn btn-sm ${
                    isActive ? "btn-secondary" : "btn-ghost"
                  } flex flex-row`}
                >
                  {label}
                  {isActive && directionIcon}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Results List */}
      <div className="w-full max-w-4xl">
        <NovelCardList
          heading={`Search results - ${data?.searchNovels?.length || 0} found`}
          novels={data.searchNovels}
        />
      </div>
    </div>
  );
}
