import * as RR from 'react-router-dom'
import AdminView from './AdminView'
import BoatmanView from './BoatmanView'
import PassengerView from './PassengerView'
import SellerView from './SellerView'
import AuthProvider from '../auth/AuthProvider'
import LoginPage from '../auth/LoginPage'

export default function MainPage() {
    let { role } = RR.useRouteLoaderData("root")

    if (!AuthProvider.isAuthenticated)
        return <LoginPage />
        
    const roleViewMap = {
        'passenger': <PassengerView />,
        'boatman': <BoatmanView />,
        'seller': <SellerView />,
        'admin': <AdminView />
    }

    return roleViewMap[role] ?? <div>What are you doing here?</div>
}
