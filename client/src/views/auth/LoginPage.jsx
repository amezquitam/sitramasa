
import { useForm } from 'react-hook-form'
import AuthProvider from '../../auth/AuthProvider'
import { useState } from 'react'
import RegisterPage from './RegisterPage'
import GlassWrapper from '../common/GlassWrapper'
import '../../styles/auth/LoginPage.css'

export default function LoginPage() {
  const [showRegist, setShowRegist] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  if (showRegist) {
    return <RegisterPage setShowRegist={setShowRegist} />
  }

  return (
    <GlassWrapper pdx={32} pdy={32}>
      
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit(AuthProvider.signIn)}>

        {errors.username && <p className='error'> {errors.username.message} </p>}
        <div className="form-group">
          <input {...register("username", { required: "Username is required", minLength: 2 })} autoComplete='off' placeholder="Nombre de usuario" />
        </div>

        {errors.password && <p className='error'> {errors.password.message} </p>}
        <div className="form-group">
          <input {...register("password", { required: "Password must have at least 8 characters", minLength: 8 })} type='password' placeholder="Contraseña" />
        </div>

        <span className='msg'>¿Has olvidado tu contraseña?</span>
        <br />

        <button type="submit" className="submit-button">Iniciar sessión</button>
        <br />
        <button onClick={() => setShowRegist(true)} className="submit-button">Registrarse</button>
      </form>
    </GlassWrapper >
  )
}
