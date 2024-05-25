import React, { useState } from 'react';
import { Button, Input } from '../components/Form';
import { BiLogInCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/services/user'


function Login() {
  const navigate = useNavigate();
  const [login, { data, isSuccess }] = useLoginMutation({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  if (isSuccess) {
    navigate('/')
  }

  const handleLogin = (e) => {
    e.preventDefault()

    const data = {
      email,
      password,
    }

    login(data)
  }

  return (
    <div className="w-full h-screen flex-colo bg-dry">
      <form className="w-2/5 p-8 rounded-2xl mx-auto bg-white flex-colo">
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-48 h-16 object-contain"
        />
        <div className="flex flex-col gap-4 w-full mb-6">
          <Input
            label="Email"
            type="email"
            color={true}
            placeholder={'doctor@gmail.com'}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            label="Password"
            type="password"
            color={true}
            placeholder={'*********'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          label="Login"
          Icon={BiLogInCircle}
          onClick={handleLogin}
        />
      </form>
    </div>
  );
}

export default Login;
