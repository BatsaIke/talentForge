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
import styles from './Register.module.css';
import Image from 'next/image';


const RegisterPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(SignupSchema),
    });
  
    const onSubmit = (data) => {
      console.log(data);
    };
  
    return (
      <div className={styles.authPage}>
        <div className={styles.leftHalf}>
          
          <Image src="/login-panel-left.png" alt="Login Image"width={200} height={200} className={styles.loginImage}/>
        </div>
        <div className={styles.rightHalf}>
          <div className={styles.logoDiv}>
            <Logo />
          </div>
          <div className={styles.formDiv}>
            <div className={styles.welcomeDiv}>
              <h3 className={styles.welcomeText}>Welcome</h3>
              <p className={styles.loginText}>Register as a student to continue</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input placeholder="Username" {...field} />
                )}
              />
              {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}
  
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
  
              <Button icon={faUser} className={styles.redButton} type="submit">
                Register
              </Button>
            </form>
            <hr className={styles.divider} />
            <div className={styles.linkText}>
              Don&apos;t have an account? <Link href={"login"} className={styles.linkTex}>Login here?</Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default RegisterPage;