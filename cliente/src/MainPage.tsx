import { AdminView } from "./admin/components/AdminView";
import { useAuth } from "./auth/hooks/useAuth"
import { BoatmanView } from "./boatmans/components/BoatmanView";
import { DockProvider } from "./docks/context/DockProvider";
import { PassengerView } from "./passengers/components/PassengerView";
import { SellerView } from "./sellers/components/SellerView";


export const MainPage = () => {
    const { authInfo } = useAuth()
    const { role } = authInfo

    const roleViews = new Map<string, JSX.Element>([
        ['Administrador', <AdminView />],
        ['Vendedor', <SellerView />],
        ['Lanchero', <BoatmanView />],
        ['Pasajero', <PassengerView />]
    ])

    return (
        <DockProvider>
            {roleViews.get(role) ?? <></>}
        </DockProvider>
    )
}