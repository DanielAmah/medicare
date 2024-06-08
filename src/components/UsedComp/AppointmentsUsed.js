import { useState } from 'react';
import { appointmentsData } from '../Datas';
import AddAppointmentModal from '../Modals/AddApointmentModal';
import { AppointmentTable } from '../Tables';

function AppointmentsUsed({ doctor, appointments }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const handleEventClick = (event) => {
    console.log(event, 'events')
    setData(event);
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
    setData({});
  };
  return (
    <div className="w-full">
      {open && (
        <AddAppointmentModal
          datas={data}
          isOpen={open}
          closeModal={() => {
            handleClose();
          }}
        />
      )}
      <h1 className="text-sm font-medium mb-6">Appointments</h1>
      <div className="w-full overflow-x-scroll">
        <AppointmentTable
          data={appointments}
          doctor={doctor}
          functions={{
            preview: handleEventClick,
          }}
        />
      </div>
    </div>
  );
}

export default AppointmentsUsed;
