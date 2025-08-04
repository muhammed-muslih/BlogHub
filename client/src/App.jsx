import { RouterProvider } from "react-router";
import appRouter from "./routes/Router";

const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};
export default App;
