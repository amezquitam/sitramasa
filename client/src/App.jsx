
import * as RR from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
import MainPage from "./views/MainPage";

const router = RR.createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: MainPage,
    loader: () => {
      return { user: AuthProvider.username, role: AuthProvider.userRole }
    },
  },
]);


export default function App() {
  return (
    <RR.RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

