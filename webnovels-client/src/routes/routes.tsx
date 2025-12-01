import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import App from "@/App";

import { WebnovelsHeader } from "@/components/main/WebnovelsHeader";
import { WebnovelsFooter } from "@/components/main/WebnovelsFooter";
import { Register } from "@/components/auth/Register";
import { Login } from "@/components/auth/Login";
import { Logout } from "@/components/auth/Logout";
import { UserInformation } from "@/components/user/UserInformation";
import { ReadingList } from "@/components/user/ReadingList";
import { Quotes } from "@/components/user/Quotes";
import { NovelPage } from "@/components/novel/NovelPage";
import { ChapterPage } from "@/components/novel/ChapterPage";
import { SearchPage } from "@/components/novel/SearchPage";
import AdminDashboard from "@/components/admin/AdminDashboard";
import UsersPage from "@/components/admin/UsersPage";
import ReportsPage from "@/components/admin/ReportsPage";
import PublishPage from "@/components/writer/PublishPage";
import { PublishNewPage } from "@/components/writer/PublishNewPage";
import { PublishEditPage } from "@/components/writer/PublishEditPage";
import { ChapterEdit } from "@/components/writer/ChapterEdit";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <WebnovelsHeader />
      <div className="min-h-screen min-w-screen flex flex-row bg-white dark:bg-black gap-4 items-center justify-center">
        <Outlet />
      </div>
      <WebnovelsFooter />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "register",
  component: Register,
  beforeLoad: () => {},
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: Login,
});

const logoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "logout",
  component: Logout,
});

const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/$id",
  component: UserInformation,
});

const readingListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/readinglist/$id",
  component: ReadingList,
});

const quotesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quotes/$id",
  component: Quotes,
});

const novelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/novels/$id",
  component: NovelPage,
});

const chapterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/novels/$id/chapter/$chapterId",
  component: ChapterPage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  validateSearch: (search: Record<string, unknown>) => {
    return { text: (search.text as string | undefined) ?? "" };
  },
  component: SearchPage,
});

const publishRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "publish/$userId",
  component: PublishPage,
});

const publishNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "publish/$userId/novel/new",
  component: PublishNewPage,
});

export const publishEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "publish/$userId/novel/$novelId",
  component: PublishEditPage,
});

export const publishChapterEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "publish/$userId/novel/$novelId/chapter/$chapterId",
  component: ChapterEdit,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminDashboard,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "users",
  component: UsersPage,
});

const adminReportsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "reports",
  component: ReportsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  registerRoute,
  loginRoute,
  logoutRoute,
  userRoute,
  readingListRoute,
  quotesRoute,
  novelRoute,
  chapterRoute,
  searchRoute,
  publishRoute,
  publishNewRoute,
  publishEditRoute,
  publishChapterEditRoute,
  adminRoute.addChildren([adminUsersRoute, adminReportsRoute]),
]);

export const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});
