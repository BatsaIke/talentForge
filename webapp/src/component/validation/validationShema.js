import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  username: Yup.string()
      .min(3, 'Too Short!')
      .max(30, 'Too Long!')
      .required('User name is Required'),
  password: Yup.string() 
      .min(6, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Password is Required'),
  email: Yup.string().email('Invalid email').required('email Required'),
});

export const SiginSchema = Yup.object().shape({
  password: Yup.string() 
      .min(6, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Password is Required'),
  email: Yup.string().email('Invalid email').required('email Required'),
});



  