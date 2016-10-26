import React from './react'

const ForgotPassword = () => {
  <section className="hero is-fullheight">
    <div className="hero-body">
      <div className="container">
        <div className="content column is-half is-offset-one-quarter">
          <h2>Login to system</h2>
          <ErrorList errors={this.props.errors} />
          <p className="control has-icon">
            <input className="input" value={this.state.email} type="email" name="email" placeholder="Email" onChange={this.emailChange} />
            <i className="fa fa-envelope"></i>
          </p>
          <p className="control has-icon">
            <input className="input" value={this.state.password} type="password" name="password" placeholder="Password" onChange={this.passwordChange} />
            <i className="fa fa-lock"></i>
          </p>
          <p className="control">
            <button onClick={e => { 
                this.props.onClick(e, this.state.email, this.state.password)
              }} 
              className="button is-success">
                Login
            </button>
            <Link to={'/forgot'}><span className="is-pulled-right">Forgot your password ?</span></Link>
          </p>
        </div>
      </div>
    </div>
  </section>
}

export default ForgotPassword