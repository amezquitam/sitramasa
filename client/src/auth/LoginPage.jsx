
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async ({ username, password }) => {
    await fetch(`http://localhost:8100/auth`, {
      body: { username, password },
      method: 'POST'
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Login</h2>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>

          <div className="form-group">
            <input {...register("username", { required: true, minLength: 2 })} placeholder="Nombre de usuario" />
          </div>

          <div className="form-group">
            <input {...register("password", { required: true, minLength: 8 })} placeholder="Contraseña" />
          </div>

          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  )
}
