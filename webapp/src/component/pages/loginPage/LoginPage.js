"use client"
import React from 'react';
import Input from '../../formgroup/input/Input';
import Button from '../../formgroup/button/Button';
import Logo from '../../logo/Logo';
import Checkbox from '../../formgroup/chekbox/Checkbox';
import Link from 'next/link';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { SiginSchema } from '@/component/validation/validationShema';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './LoginPage.module.css'; // Import the module styles
import Image from 'next/image';

const LoginPage = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(SiginSchema),
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
  }; 

  return (
    <div className={styles.authPage}>
      <div className={styles.leftHalf}>
        {/* Add your image component here */}
        <Image src="/login-panel-left.png" alt="Login Image" width={200} height={200} className={styles.loginImage}/>
      </div>
      <div className={styles.rightHalf}>
        <div className={styles.logoDiv}>
          <Logo />
        </div>

        <div className={styles.formDiv}>
          <div className={styles.welcomeDiv}>
            <h3 className={styles.welcomeText}>Welcome</h3>
            <p className={styles.loginText}>Login as a student to continue</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input placeholder="Email" {...field} />
              )}
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input placeholder="Password" type="password" {...field} />
              )}
            />
            {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}

           
            <Button icon={faUser}  type="submit">Log In </Button>
          </form>       

          {/* Horizontal line */}
          <hr className={styles.divider} />

          {/* Remember Me and Forgot Password */}
          <div className={styles.rememberForgot}>
            <Checkbox label="Remember me" />
            <Link href={"forgot-password"} className={styles.linkText}>
              Forgot Password?
            </Link>
          </div>
          <div className={styles.linkTex}>
              Don&apos;t have an account? <Link href={"signup"} className={styles.linkTex}>register here? </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;