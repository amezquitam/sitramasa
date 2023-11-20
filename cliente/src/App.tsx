import * as RR from 'react-router-dom'
import { AuthProvider } from './auth/context/AuthProvider'
import { Login } from './auth/components/Login'
import { RoleProvider } from './roles/context/RoleProvider'
import { SignUp } from './auth/components/SignUp'
import { LoadingLogin } from './auth/components/LoadingLogin'
import { RequireLogin } from './auth/components/RequireLogin'
import { MainPage } from './MainPage'

const router = RR.createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Init
  },
  {
    id: 'login',
    path: '/login',
    Component: Login
  },
  {
    id: 'signup',
    path: '/signup',
    Component: SignUp
  }
])

function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <LoadingLogin>
          <RR.RouterProvider router={router} />
        </LoadingLogin>
      </RoleProvider>
    </AuthProvider>
  )
}


function Init() {
  return (
    <RequireLogin>
      <MainPage />
    </RequireLogin>
  )
}

export default App
