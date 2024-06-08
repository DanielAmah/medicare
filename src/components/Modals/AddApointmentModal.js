import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import {
  Button,
  Checkbox,
  DatePickerComp,
  Input,
  Select,
  Textarea,
  TimePickerComp,
} from '../Form';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import { servicesData, sortsDatas } from '../Datas';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import PatientMedicineServiceModal from './PatientMedicineServiceModal';
import { useGetDoctorsQuery } from '../../redux/services/user';
import { useGetServicesQuery } from '../../redux/services/service';
import { useCreateAppointmentMutation, useGetAppointmentsQuery } from '../../redux/services/appointment';


function AddAppointmentModal({ closeModal, isOpen, datas }) {
  const { data: appointmentData, refetch: refetchAppointment } = useGetAppointmentsQuery({})
  const { data: getDoctorsData, isLoading, refetch: refetchData } = useGetDoctorsQuery({})
  const [createAppointment, { isSuccess }] = useCreateAppointmentMutation({})
  const { data: getServicesData, refetch } = useGetServicesQuery({})
  console.log(getDoctorsData, 'getDoctorsData')
  const doctorsData = getDoctorsData?.map((item) => {
    return {
      id: item.id,
      name: item?.user?.title,
    };
  });
  const [selected, setSelected] = useState({});
  const [services, setServices] = useState(servicesData[0]);
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [status, setStatus] = useState(sortsDatas.status[0]);
  const [doctors, setDoctors] = useState(doctorsData?.[0]);
  const [shares, setShares] = useState({
    email: false,
    sms: false,
    whatsapp: false,
  });
  const [open, setOpen] = useState(false);


  if (isSuccess) {
    refetchAppointment()
    toast.success('Appointment created successfully!')
    closeModal()
  }

  const onChangeShare = (e) => {
    setShares({ ...shares, [e.target.name]: e.target.checked });
  };

  console.log(datas?.start, datas?.end, 'datas?.start')

  useEffect(() => {
    if (datas?.title) {
      setServices(datas?.service);
      setStartTime(new Date(datas?.start));
      setEndTime(new Date(datas?.end));
      setShares(datas?.shareData);
    }
  }, [datas]);


  const handleDescriptionChange = (value) => {
    console.log(value);
    setDescription(value);
  };

  const handleSubmit = async () => {
    const appointmentData = {
      patient_id: selected.id,
      service_id: services.id,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      status: status.name,
      description: description,
      purpose: description,
      communication_preferences: {
        email: shares.email,
        sms: shares.sms,
        whatsapp: shares.whatsapp
      }
    };

    createAppointment(appointmentData)
  };


  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.title ? 'Edit Appointment' : 'New Appointment'}
      width={'max-w-3xl'}
    >
      {open && (
        <PatientMedicineServiceModal
          closeModal={() => setOpen(!isOpen)}
          isOpen={open}
          patient={true}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      <div className="flex-colo gap-6">
        <div className="grid sm:grid-cols-12 gap-4 w-full items-center">
          <div className="sm:col-span-10">
            <Input
              label="Patient Name"
              value={selected?.title || ''}
              color={true}
              placeholder={
                selected?.title
                  ? selected?.title
                  : 'Select Patient and patient name will appear here'
              }
            />
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="text-subMain flex-rows border border-dashed border-subMain text-sm py-3.5 sm:mt-6 sm:col-span-2 rounded"
          >
            <BiPlus /> Add
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Purpose of visit</p>
            <Select
              selectedPerson={services}
              setSelectedPerson={setServices}
              datas={getServicesData}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {services.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          {/* date */}
          <DatePickerComp
            label="Date of visit"
            startDate={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <TimePickerComp
            label="Start time"
            startDate={startTime}
            onChange={(date) => setStartTime(date)}
          />
          <TimePickerComp
            label="End time"
            startDate={endTime}
            onChange={(date) => setEndTime(date)}
          />
        </div>

        {/* status && doctor */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Status</p>
            <Select
              selectedPerson={status}
              setSelectedPerson={setStatus}
              datas={sortsDatas.status}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {status.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
        </div>

        {/* des */}
        <Textarea
          label="Description"
          placeholder={
            datas?.message
              ? datas.message
              : 'She will be coming for a checkup.....'
          }
          color={true}
          rows={5}
          onChange={handleDescriptionChange}
          value={description}
        />

        {/* share */}
        <div className="flex-col flex gap-8 w-full">
          <p className="text-black text-sm">Share with patient via</p>
          <div className="flex flex-wrap sm:flex-nowrap gap-4">
            <Checkbox
              name="email"
              checked={shares.email}
              onChange={onChangeShare}
              label="Email"
            />
            <Checkbox
              name="sms"
              checked={shares.sms}
              onChange={onChangeShare}
              label="SMS"
            />
            <Checkbox
              checked={shares.whatsapp}
              name="whatsapp"
              onChange={onChangeShare}
              label="WhatsApp"
            />
          </div>
        </div>
        {/* buttones */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            {datas?.title ? 'Discard' : 'Cancel'}
          </button>
          <Button
            label="Save"
            Icon={HiOutlineCheckCircle}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddAppointmentModal;
