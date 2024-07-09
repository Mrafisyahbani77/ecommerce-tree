import Navbar from '../component/Navbar';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutationLogin } from '../useMutation/useMutationLogin';

const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .min(4, 'Password harus memiliki 4 huruf - minimum harus ada 4 chars.')
      .matches(/^.{4,}$/, 'Minimal Memiliki 4 karakter'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate: SubmitLogin, onSubmit, error } = useMutationLogin();

  if (error) {
    return <div>{error.message}</div>;
  }

  const submited = (data) => {
    SubmitLogin(data);
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit(submited)}>
        <label>Email</label>
        <input type="email" name="email" id="email" {...register('email')} />
        <label>Password</label>
        <input type="password" name="password" id="password" {...register('password')} />
        <p className="text-red-600">{errors.email?.message}</p>
        <p className="text-red-600">{errors.password?.message}</p>
        <button type="submit">{onSubmit ? 'Loginned...' : 'Login'}</button>
      </form>
    </>
  );
};

export default Login;
