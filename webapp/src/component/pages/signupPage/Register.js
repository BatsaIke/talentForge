'use client'
import React from 'react';
import '@/app/globals.css';
import Input from '../../formgroup/input/Input';
import Button from '../../formgroup/button/Button';
import Logo from '../../logo/Logo';
import Link from 'next/link';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignupSchema } from '@/component/validation/validationShema';

const RegisterPage = () => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(SignupSchema),
    });

    const onSubmit = (data) => {
        // Handle form submission
        console.log(data);
    };

    return (
        <div className="auth-page">
            <div className="left-half">
                {/* Add your image component here */}
                {/* <img src="login-image.png" alt="Login Image" className='login-image'/> */}
            </div>
            <div className="right-half">
                <div className="logo-div">
                    <Logo />
                </div>

                <div className="form-div">
                    <div className="welcome-div">
                        <h3 className="welcome-text">Welcome</h3>
                        <p className="login-text">Register as a student to continue</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <Input placeholder="Username" {...field} />
                            )}
                        />

                        {errors.username && <p className='error-message'>{errors.username.message}</p>}

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input placeholder="Email" {...field} />
                            )}
                        />
                        {errors.email && <p className='error-message'>{errors.email.message}</p>}

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input placeholder="Password" type="password" {...field} />
                            )}
                        />
                        {errors.password && <p className='error-message'>{errors.password.message}</p>}

                        <Button icon={faUser} className="red-button" type="submit">
                            Register
                        </Button>
                    </form>
                    {/* Horizontal line */}
                    <hr className="divider" />

                    <div className="link-tex">
                        Don&apos;t have an account? <Link href={"login"} className="link-tex">Login here?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
