import React, { useState } from 'react';
import Uploader from '../Uploader';
import { sortsDatas } from '../Datas';
import { Button, DatePickerComp, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useCreatePatientMutation } from '../../redux/services/patient';
import { useNavigate } from 'react-router-dom';
import { useUpdateDoctorMutation, useGetDoctorQuery } from '../../redux/services/user';
import { getData } from '../../utils/core';
import { AUTH_TOKEN_KEY } from '../../utils/storage';


function PersonalInfo({ titles, settings }) {
  const navigate = useNavigate();
  const auth = getData(AUTH_TOKEN_KEY)
  const { userId } = auth
  const { data: userInfo, isLoading } = useGetDoctorQuery({ id: userId })

  console.log(userInfo, 'userInfo')
  const [createPatient, { data, isSuccess }] = useCreatePatientMutation({})
  const [updateDoctor, { data: updateDoctorData, isSuccess: updateDoctorSuccess }] = useUpdateDoctorMutation({})
  const [title, setTitle] = React.useState(sortsDatas.title[0]);
  const [date, setDate] = React.useState(new Date());
  const [gender, setGender] = React.useState(sortsDatas.genderFilter[0]);
  const [formData, setFormData] = useState({
    name: userInfo?.name ?? '',
    email: userInfo?.email ?? '',
    phone: userInfo?.phone ?? '',
    gender: { id: 1, name: 'Male' },
    blood_type: '',
    age: '',
    profileImage: userInfo?.profile_image_url
  })

  if (updateDoctorSuccess) {
    toast.success('Doctor settings updated!')
  }

  if (isSuccess) {
    toast.success('Patient created successfully!')
    navigate('/patients')
  }



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.name, 'e.target')
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleGenderChange = (gender) => {
    setFormData({
      ...formData,
      gender: gender
    });
  };

  const handleFileChange = (imageUrl) => {
    setFormData({
      ...formData,
      profileImage: imageUrl
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (settings) {
      data.append('user[name]', formData.name);
      data.append('user[email]', formData.email);
      data.append('user[phone]', formData.phone);
      if (formData.profileImage) {
        data.append('user[profile_image]', formData.profileImage);
      }
    }
    else {
      data.append('patient[name]', formData.name);
      data.append('patient[email]', formData.email);
      data.append('patient[phone]', formData.phone);
      data.append('patient[gender]', formData.gender.name);
      data.append('patient[blood_type]', formData.blood_type);
      data.append('patient[age]', formData.age);
      if (formData.profileImage) {
        data.append('patient[profile_image]', formData.profileImage);
      }
    }



    if (settings) {
      updateDoctor({
        id: userId,
        body: data
      })
    }
    else {
      createPatient({
        body: data
      })
    }

  }

  return (
    <div className="flex-colo gap-4">
      <form onSubmit={handleSubmit}>
        {/* uploader */}
        <div className="flex gap-3 flex-col w-full col-span-6">
          <p className="text-sm">Profile Image</p>
          <Uploader handleFileChange={handleFileChange}
            image={formData.profileImage} />
        </div>
        {/* select  */}
        {titles && !settings && (
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Title</p>
            <Select
              selectedPerson={title}
              setSelectedPerson={setTitle}
              datas={sortsDatas.title}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {title?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
        )}

        {/* fullName */}
        <div className="mt-5">
          <Input label="Full Name" color={true} type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </div>

        {/* phone */}
        <div className="mt-5">
          <Input label="Phone Number" color={true} type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
        </div>

        {/* email */}
        <div className="mt-5"> <Input label="Email" color={true} type="email" name="email" value={formData.email} onChange={handleInputChange} /></div>

        {!titles && (
          <>
            {/* gender */}
            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Gender</p>
              <Select
                selectedPerson={formData.gender}
                setSelectedPerson={handleGenderChange}
                datas={sortsDatas.genderFilter}
              >
                <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                  {formData?.gender?.name} <BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>
            {/* emergancy contact */}
            <Input label="Blood Type" color={true} type="text" name="blood_type" value={formData.blood_type} onChange={handleInputChange} />
            {/* date */}
            {/* <DatePickerComp
            label="Date of Birth"
            startDate={date}
            onChange={(date) => setDate(date)}
          /> */}
            {/* address */}
            <Input label="Age" color={true} type="text" name="age" value={formData.age} onChange={handleInputChange} />
          </>
        )}
        {/* submit */}
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 w-full mt-10">
          <Button
            label={'Save Changes'}
            Icon={HiOutlineCheckCircle}
          />
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;
