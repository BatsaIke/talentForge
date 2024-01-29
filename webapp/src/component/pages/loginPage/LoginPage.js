'use client';
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
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './LoginPage.module.css'; // Import the module styles
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '@/api-actions/authActions';
import { set_Alert } from '@/api-actions/alertAction';

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useSelector((state) => state.auth);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SiginSchema)
  });

  const search = useSearchParams();
  const paramName = search.get('userType');

  const onSubmit = async (data) => {
    try {
      await dispatch(signin(data));
      await dispatch(set_Alert('Login Successful', 'success', 2000));
      if (paramName === 'student') {
        router.push('student');
      } else {
        router.push('company');
      }
    } catch (error) {}
  };
let urlPath;
{paramName === 'student'? urlPath="/login-panel-left.png": urlPath="/company-login.png"}
  return (
    <div className={styles.authPage}>
      <div className={styles.leftHalf}>
        {/* Add your image component here */}
        <Image
          src={urlPath}
          alt="Login Image"
          width={200}
          height={200}
          priority
          className={styles.loginImage}
        />
      </div>
      <div className={styles.rightHalf}>
        <div className={styles.logoDiv}>
          <Logo />
        </div>

        <div className={styles.formDiv}>
          <div className={styles.welcomeDiv}>
            <h3 className={styles.welcomeText}>Welcome</h3>
            <p className={styles.loginText}>
              {paramName === 'student'
                ? 'Login as a student to continue'
                : 'Login as a company to continue'}
            </p>{' '}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formContainer}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Email"
                  autoComplete="current-email"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              )}
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}

            <Button icon={faUser} type="submit">
              {loading ? 'Loading' : 'Log In'}
            </Button>
          </form>

          {/* Horizontal line */}
          <hr className={styles.divider} />

          {/* Remember Me and Forgot Password */}
          <div className={styles.rememberForgot}>
            <Checkbox label="Remember me" />
            <Link href={'forgot-password'} className={styles.linkText}>
              Forgot Password?
            </Link>
          </div>
          <div className={styles.linkTex}>
            Don&apos;t have an account?{' '}
            <Link href={{ pathname: 'signup', query: { userType: paramName } }} className={styles.linkTex}>
              register here?{' '}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
