import React from 'react'
import '../auth.form.scss'
import {useNavigate,Link} from 'react-router'
const Login = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // const formData = new FormData(e.target)
        // const data = Object.fromEntries(formData)
        // console.log(data)
    }

  return (
  <main>
    <div className="form-container">
        <h1>Login</h1>
        <form className="form" action="" onSubmit={handleSubmit}>
            <div className="input">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="enter email" />
            </div>
            <div className="input">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="enter password" />
            </div>
            <button type="submit" className="btn primary-btn">Login</button>
        </form>
         <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
    </div>
  </main>
  )
}

export default Login