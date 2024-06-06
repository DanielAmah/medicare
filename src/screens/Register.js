import React, { useState } from 'react';
import { Button, Input } from '../components/Form';
import { BiLogInCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useCreateDoctorMutation } from '../redux/services/user'

function Register() {
  const navigate = useNavigate();
  const [createDoctor, { data, isSuccess }] = useCreateDoctorMutation({})
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')


  if (isSuccess) {
    navigate('/login')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      name,
      email,
      password,
      password_confirmation: password,
      title: 'Dr.',
    }

    createDoctor({
      body: data
    })
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
            label="Name"
            type="text"
            color={true}
            placeholder={'James Smith'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            color={true}
            value={email}
            placeholder={'doctor@gmail.com'}
            onChange={(e) => setEmail(e.target.value)}
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
          label="Register"
          Icon={BiLogInCircle}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default Register;
