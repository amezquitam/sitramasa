import { useForm } from "react-hook-form"
import AuthProvider from "./AuthProvider"
import PropTypes from 'prop-types'

export default function RegisterPage({ setShowRegist }) {

    const { register, handleSubmit } = useForm()

    return (
        <div className="container">
            <div className="form-wrapper">
                <h2>Regístrate</h2>
                <form className="form" onSubmit={handleSubmit(AuthProvider.signUp)} id="reg-form">
                    <div className="form-group">
                        <input {...register("firstname", { required: true, minLength: 2 })} autoComplete="off" name="firstname" placeholder="Primer nombre" />
                    </div>

                    <div className="form-group">
                        <input {...register("lastname", { required: true, minLength: 3 })} autoComplete="off" name="lastname" placeholder="Primer apellido" />
                    </div>
                    
                    <div className="form-group">
                        <input {...register("username", { required: true, minLength: 3 })} autoComplete="off" name="username" placeholder="Nombre de usuario" />
                    </div>

                    <div className="form-group">
                        <input {...register("password", { required: true, minLength: 8 })} autoComplete="off" name="password" placeholder="Contraseña" type="password" />
                    </div>

                    <br />

                    <button type="submit" className="submit-button">Registrarse</button>
                    <br />
                    <span>¿Ya tienes una cuenta?</span>
                    <button onClick={() => setShowRegist(false)} className="submit-button">Iniciar sessión</button>
                </form>
            </div>
        </div>
    )
}


RegisterPage.propTypes = {
    setShowRegist: PropTypes.func.isRequired
}
