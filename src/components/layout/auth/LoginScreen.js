import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'

import { useForm } from '../../../hooks/useForm';
import { startLogin, startRegister } from '../../../manager/actions/authActions';
import '../../../styles/layout/login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch()

    const [formLoginValues, handleInputChangeLogin] = useForm({
     lEmail: '',
     lPassword: ''
    });

    const { lEmail, lPassword } = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();
        if(lEmail.length===0 || lPassword.length===0){
            return Swal.fire('Error', 'Write your email and pass', 'error');
        }
        if(!lEmail.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            return Swal.fire('Error', 'Email is not valid', 'error');
        }
        dispatch(startLogin(lEmail, lPassword));
    }

    const [formRegisterValues, handleInputChangeRegister] = useForm({
        rName: '',
        rEmail: '',
        rPassword: '',
        rConfirmPassword: ''
    });

    const { rName, rEmail, rPassword, rConfirmPassword } = formRegisterValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if(rEmail.length===0 || rName.length===0 || rPassword.length===0 || rConfirmPassword.length===0){
            return Swal.fire('Error', 'Complete your data', 'error');
        }
        if(!rEmail.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            return Swal.fire('Error', 'Email is not valid', 'error');
        }
        if(rPassword !== rConfirmPassword){
            return Swal.fire('Error', 'Passwords do not match', 'error');
        }
        dispatch(startRegister(rEmail, rPassword, rName));
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Sign In</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group pb-3">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleInputChangeLogin}
                            />
                        </div>
                        <div className="form-group  pb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleInputChangeLogin}
                            />
                        </div>
                        <div className="form-group  pb-3">
                            <input 
                                type="submit"
                                className="btnSubmit form-control"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Sign Up</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group  pb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="rName"
                                value={rName}
                                onChange={handleInputChangeRegister}
                            />
                        </div>
                        <div className="form-group  pb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleInputChangeRegister}
                            />
                        </div>
                        <div className="form-group  pb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="rPassword"
                                value={rPassword}
                                onChange={handleInputChangeRegister}
                            />
                        </div>

                        <div className="form-group pb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repet Password" 
                                name="rConfirmPassword"
                                value={rConfirmPassword}
                                onChange={handleInputChangeRegister}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit form-control" 
                                value="Sign Up" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
