import React from 'react'
import '../auth.form.scss'
import {useNavigate,Link} from 'react-router'

const Register = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
   <main>
    <div className="form-container">
        <h1>Register</h1>
        
        <form className="form" action="" onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="enter username" />
          </div>
            <div className="input">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="enter email" />
            </div>
            <div className="input">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="enter password" />
            </div>
        
            <button type="submit" className="btn primary-btn">Register</button>
        </form>
        <p>Already have an account? <Link to={"/login"}>Login</Link></p>
    </div>
  </main>
  )
}

export default Register