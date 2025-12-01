import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { MainView } from "./components/MainView/MainView";
import { PostView } from "./components/PostView/PostView";

const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <App />,
        children: [
          { path: "/", element: <MainView /> },
          { path: "/post/:id", element: <PostView /> },
        ],
      },
    ],
    {
      basename: "",
    }
);

export default router