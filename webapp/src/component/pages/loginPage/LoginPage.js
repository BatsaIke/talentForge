"use client"
import React from 'react';
import '@/app/globals.css';
import Input from '../../formgroup/input/Input';
import Button from '../../formgroup/button/Button';
import Logo from '../../logo/Logo';
import Checkbox from '../../formgroup/chekbox/Checkbox';
import Link from 'next/link';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { SiginSchema } from '@/component/validation/validationShema';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginPage = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(SiginSchema),
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
            <p className="login-text">Login as a student to continue</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='form-container'>

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

           
            <Button icon={faUser}  type="submit">Log In </Button>
          </form>       

          {/* Horizontal line */}
          <hr className="divider" />

          {/* Remember Me and Forgot Password */}
          <div className="remember-forgot">
            <Checkbox label="Remember me" />
            <Link href={"forgot-password"} className="link-text">
              Forgot Password?
            </Link>
          </div>
          <div className="link-tex">
              Don&apos;t have an account? <Link href={"signup"} className="link-tex">register here? </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
