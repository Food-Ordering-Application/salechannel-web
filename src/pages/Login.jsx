import React from "react";
// import '../notassets/css/notmain.css';


export default function Login() {
  return (
    <form className="registration-form py-5" method="POST" id="loginForm"
          style={{margin: "0 auto 20px auto"}}>
      <div className="card mb-0">
        <div className="card-body">
          <div className="text-center mb-3">
            <img
              src="{{ substr(url('/'), 0, strrpos(url('/'), '/')) }}/assets/img/logos/{{ config('appSettings.storeLogo') }}"
              alt="logo" className="img-fluid mb-3 mt-2" style={{width: "135px"}}/>
            <h5 className="mb-0">Login to Dashboard</h5>
            <span className="d-block text-muted">Enter your credentials below</span>
          </div>
          <div className="form-group form-group-feedback form-group-feedback-left">
            <input type="email" className="form-control" placeholder="Email" name="email" value="{{ old('email') }}"/>
            <div className="form-control-feedback">
              <i className="icon-user text-muted"></i>
            </div>
          </div>
          <div className="form-group form-group-feedback form-group-feedback-left">
            <input type="password" className="form-control" placeholder="Password" name="password"/>
            <div className="form-control-feedback">
              <i className="icon-lock2 text-muted"></i>
            </div>
          </div>
          <div className="form-group form-group-feedback form-group-feedback-left">
            <label className="d-flex align-items-center">
              <input type="checkbox" checked="checked" name="remember" className="mr-1"
                     style={{height: "1rem", width: "1rem"}}/>
              <span>Remember me?</span>
            </label>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block"
                      style={{height: "2.8rem", "font-size": "1rem"}}>
                Log in
                <i className="icon-circle-right2 ml-2"></i>
              </button>
            </div>


            {/*@if(config('appSettings.enPassResetEmail') == 'true')*/}
            {/*<div className="mb-2">*/}
            {/*  <a href="/">Forgot Password?</a>*/}
            {/*</div>*/}
            {/*@endif*/}

            <div className="content-divider text-muted form-group"><span> OR </span></div>
            <div className="content d-flex justify-content-center align-items-center mt-3">
              <a className="btn btn-lg btn-registerBtn mr-2" href="/">Register for Store</a>
              <a className="btn btn-lg btn-registerBtn" href="/">Register for Delivery</a>
            </div>
          </div>
        </div>
        </div>
    </form>
);
}