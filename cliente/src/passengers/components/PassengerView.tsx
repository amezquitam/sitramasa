import { Form } from 'react-router-dom'
import './PassengerView.css'
import { useDock } from '../../docks/hooks/useDock'
import { NoUserSelect } from '../../util/components/NoUserSelect'
import { useForm } from 'react-hook-form'


export const PassengerView = () => {
    const docks = useDock()
    const { register, getValues, watch } = useForm({
        defaultValues: {
            startDock: 1,
            endDock: 2,
            numOfPeople: 1
        }
    })

    const images = new Map<number, string>([
        [1, '/res/img/01-rodadero.jpg'],
        [2, '/res/img/01-marina.jpg'],
        [3, '/res/img/01-taganga.jpg'],
        [4, '/res/img/01-playa-blanca.jpg'],
        [5, '/res/img/01-playa-grande.jpg'],
    ])

    const values = getValues() 

    const originOptions = docks.filter(dock => dock.dockId != values.endDock).map(
        opt => <option key={"ori-" + opt.dockId} value={opt.dockId} className="dock-option">{opt.name}</option>
    )

    const destinyOptions = docks.filter(dock => dock.dockId != values.startDock).map(
        opt => <option key={"dest-" + opt.dockId} selected={opt.dockId === 2} value={opt.dockId} className="dock-option">{opt.name}</option>
    )

    // Select route page
    return (
        <NoUserSelect>
            <div id="pg-container">
                <div
                    style={{ backgroundImage: `url(${images.get(watch().startDock) || 'none'})` }}
                    className="bg-image bg-left"
                ></div>
                <div
                    style={{ backgroundImage: `url(${images.get(watch().endDock) || 'none'})` }}
                    className="bg-image bg-right"
                ></div>

                <Form className='pg-form'>
                    <h1 className='pg-label'>Selecciona tu ruta</h1>
                    <div className="route-select">
                        <select {...register("startDock", { valueAsNumber: true })} className="dock-origin route-option">
                            {originOptions}
                        </select>
                        <select {...register("endDock", { valueAsNumber: true })} className="dock-destiny route-option">
                            {destinyOptions}
                        </select>
                    </div>
                    <h1 className='pg-label'>Número de personas</h1>
                    <input {...register("numOfPeople")} className='pg-num-inp' min={1} max={30} defaultValue={2} type="number" />
                    <div className="pg-button">Consultar</div>
                </Form>
            </div>
        </NoUserSelect>
    )
}

