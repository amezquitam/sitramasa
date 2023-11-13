
import * as RR from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
import MainPage from "./views/MainPage";
import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AuthProvider.init()
      .then(() => setLoading(false))
  }, [])


  if (loading) {
    return <div></div>
  }

  return (
    <RR.RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

