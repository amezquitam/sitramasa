import { Form, Link } from "react-router-dom"
import { useAuth, type SignUpPayload } from "../hooks/useAuth"
import { useForm } from "../../util/hooks/useForm"
import { useRoles } from "../../roles/hooks/useRoles"
import { NoRequireLogin } from "./NoRequireLogin"
import { NoUserSelect } from "../../util/components/NoUserSelect"

export const SignUp = () => {
    const roles = useRoles()
    const { signUp } = useAuth()
    const { handleChange, handleSubmit } = useForm<SignUpPayload>()

    const options = roles.map(
        role => <option key={role.name} value={role.roleId}> {role.name} </option>
    )

    return (
        <NoUserSelect>
            <NoRequireLogin>
                <div id="auth-container">
                    <Form className='auth-box' onSubmit={handleSubmit(signUp)}>
                        <h2 className='auth-title auth-text'>Registrarse</h2>
                        <label className="auth-label">Primer nombre</label>
                        <input className='auth-in' onChange={handleChange} type="text" name="firstname" />
                        <label className="auth-label">Primer apellido</label>
                        <input className='auth-in' onChange={handleChange} type="text" name="lastname" />
                        <label className="auth-label">Nombre de usuario (Recordar)</label>
                        <input className='auth-in' onChange={handleChange} type="text" name="username" />
                        <label className="auth-label">Contraseña</label>
                        <input className='auth-in' onChange={handleChange} type="password" name="password" />
                        <label className="auth-label">Confirmar contraseña</label>
                        <input className='auth-in' onChange={handleChange} type="password" name="passwordConfirm" />
                        <label className="auth-label">Tipo de usuario</label>
                        <select className='auth-in' defaultValue={4} onChange={handleChange} name="roleId" id="role-select">
                            {options}
                        </select>
                        <div className="button-group">
                            <button className='auth-button auth-btn-alt' type="submit"> Regitrarse </button>
                        </div>
                        <label className="auth-label">¿Ya tienes una cuenta?
                            <Link className="auth-text" to='/login'> Iniciar sesión </Link>
                        </label>
                    </Form>
                </div>
            </NoRequireLogin>
        </NoUserSelect>
    )
}