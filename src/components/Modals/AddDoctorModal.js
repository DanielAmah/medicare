import React, { useState } from 'react';
import Modal from './Modal';
import { Button, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { sortsDatas } from '../Datas';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import Access from '../Access';
import Uploader from '../Uploader';
import { useCreateDoctorMutation } from '../../redux/services/user'

function AddDoctorModal({ closeModal, isOpen, doctor, refetch, datas }) {
  const [createDoctor, { data, isSuccess }] = useCreateDoctorMutation({})
  const [instraction, setInstraction] = useState(sortsDatas.title[0]);
  const [formData, setFormData] = useState({
    name: '',
    title: 'Dr.',
    email: '',
    phone: '',
    password: '',
    profileImage: null,
    access: {
      patient: {
        read: false,
        edit: false,
        create: false,
        delete: false
      },
      appointment: {
        read: false,
        edit: false,
        create: false,
        delete: false
      },
      invoices: {
        read: false,
        edit: false,
        create: false,
        delete: false
      },
      payments: {
        read: false,
        edit: false,
        create: false,
        delete: false
      }
    }
  });

  if (isSuccess) {
    toast.success('Doctor created successfully');
    closeModal()
    refetch()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log(formData.name, 'formData')
    data.append('user[name]', formData.name);
    data.append('user[title]', formData.title);
    data.append('user[email]', formData.email);
    data.append('user[phone]', formData.phone);
    data.append('user[password]', formData.password);
    data.append('user[password_confirmation]', formData.password);
    if (formData.profileImage) {
      data.append('user[profile_image]', formData.profileImage);
    }

    Object.keys(formData.access).forEach(section => {
      Object.keys(formData.access[section]).forEach(permission => {
        if (formData.access[section][permission]) {
          data.append(`user[access][${section}][${permission}]`, "1");
        }
      });
    });

    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    console.log(data, 'dataxxxx')
    createDoctor({
      body: data
    })
  }

  const handleCheckboxChange = (section, type) => (e) => {
    setFormData({
      ...formData,
      access: {
        ...formData.access,
        [section]: {
          ...formData.access[section],
          [type]: e.target.checked
        }
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.name, 'e.target')
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (imageUrl) => {
    // console.log(imageUrl, 'files')
    setFormData({
      ...formData,
      profileImage: imageUrl
    });
  };

  const onSubmit = () => {
    toast.error('This feature is not available yet');
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={doctor ? 'Add Doctor' : datas?.id ? 'Edit Stuff' : 'Add Stuff'}
      width={'max-w-3xl'}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 flex-col col-span-6 mb-6">
          <p className="text-sm">Profile Image</p>
          <Uploader handleFileChange={handleFileChange}
            image={formData.profileImage} />
        </div>

        <div className="flex-colo gap-6">
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <Input label="Full Name" color={true} placeholder="John Doe" name="name" value={formData.name} onChange={handleInputChange} />

            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Title</p>
              <Select
                selectedPerson={instraction}
                setSelectedPerson={setInstraction}
                datas={sortsDatas.title}
              >
                <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                  {instraction.name} <BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <Input label="Email" color={true} name="email" value={formData.email} onChange={handleInputChange} />
            <Input label="Phone Number" color={true} name="phone" value={formData.phone} onChange={handleInputChange} />
          </div>

          {/* password */}
          <Input label="Password" color={true} name="password" value={formData.password} onChange={handleInputChange} />

          {/* table access */}
          <div className="w-full">
            <Access
              accessData={formData.access}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>

          {/* buttones */}
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <button
              onClick={closeModal}
              className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
            >
              Cancel
            </button>
            <Button label="Save" Icon={HiOutlineCheckCircle} />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default AddDoctorModal;
