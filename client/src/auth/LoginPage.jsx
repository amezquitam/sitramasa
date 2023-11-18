
import { useForm } from 'react-hook-form'
import './Common.css'
import AuthProvider from './AuthProvider'
import { useState } from 'react'
import RegisterPage from './RegisterPage'

export default function LoginPage() {
  const [ showRegist, setShowRegist ] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  if (showRegist) {
    return <RegisterPage setShowRegist={setShowRegist} />
  }

  return (
    <div className="container">
      <div className="form-wrapper">
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
      </div>
    </div>
  )
}
