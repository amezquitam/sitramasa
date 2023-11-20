import { Form, Link, redirect } from 'react-router-dom'
import { useForm } from '../../util/hooks/useForm'
import { LoginPayload, useAuth } from '../hooks/useAuth'
import { NoRequireLogin } from './NoRequireLogin'
import './Auth.css'
import { NoUserSelect } from '../../util/components/NoUserSelect'

export const Login = () => {
    const { login, isAuthenticated } = useAuth()
    const { handleSubmit, handleChange } = useForm<LoginPayload>()

    if (isAuthenticated()) {
        redirect('/')
    }

    return (
        <NoUserSelect>
            <NoRequireLogin>
                <div id="auth-container">
                    <Form className='auth-box' onSubmit={handleSubmit(login)}>
                        <h2 className='auth-title auth-text'>Iniciar sesión</h2>

                        <label className='auth-label'>Nombre de usuario</label>
                        <input className='auth-in' type="text" name="username" onChange={handleChange} />
                        <label className='auth-label'>Contraseña</label>
                        <input className='auth-in' type="password" name="password" onChange={handleChange} />

                        <div className="button-group">
                            <button className='auth-button auth-btn-alt' type="submit"> Entrar </button>
                        </div>
                        <label className='auth-label'>¿No tienes una cuenta?
                            <Link className='auth-text' to="/signup"> Registrarse </Link>
                        </label>
                    </Form>
                </div>
            </NoRequireLogin>
        </NoUserSelect>
    )
}