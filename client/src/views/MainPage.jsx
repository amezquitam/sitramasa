
import AdminView from './AdminView'
import BoatmanView from './BoatmanView'
import PassengerView from './PassengerView'
import SellerView from './SellerView'
import AuthProvider from '../auth/AuthProvider'
import LoginPage from './auth/LoginPage'
import LoadingPage from './common/LoadingPage'
import { useEffect, useState } from 'react'

export default function MainPage() {
    const [signedIn, setSignedIn] = useState(false)

    AuthProvider.setSignedIn = setSignedIn

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        AuthProvider.init();
        setTimeout(() => setLoading(false), 1000)
    }, [])

    if (loading)
        return <LoadingPage />

    if (!signedIn)
        return <LoginPage />

    const roleViewMap = {
        'Pasajero': <PassengerView />,
        'Lanchero': <BoatmanView />,
        'Vendedor': <SellerView />,
        'Administrador': <AdminView />
    }

    return roleViewMap[AuthProvider.userRole] ?? <div>What are you doing here?</div>
}
