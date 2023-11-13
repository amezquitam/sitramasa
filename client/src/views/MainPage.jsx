
import AdminView from './AdminView'
import BoatmanView from './BoatmanView'
import PassengerView from './PassengerView'
import SellerView from './SellerView'
import AuthProvider from '../auth/AuthProvider'
import LoginPage from '../auth/LoginPage'
import { useState } from 'react'

export default function MainPage() {
    const [, setSignedIn] = useState(false)

    AuthProvider.setSignedIn = setSignedIn

    if (!AuthProvider.isAuthenticated)
        return <LoginPage />
        
    const roleViewMap = {
        'Pasajero': <PassengerView />,
        'Lanchero': <BoatmanView />,
        'Vendedor': <SellerView />,
        'Administrador': <AdminView />
    }
    
    return roleViewMap[AuthProvider.userRole] ?? <div>What are you doing here?</div>
}
