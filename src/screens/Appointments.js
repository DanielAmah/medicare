import React from 'react';
import Layout from '../Layout';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { BiChevronLeft, BiChevronRight, BiPlus, BiTime } from 'react-icons/bi';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import AddAppointmentModal from '../components/Modals/AddApointmentModal';
import { servicesData } from '../components/Datas';
import { useGetAppointmentsQuery } from '../redux/services/appointment';


const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate('prev');
  };

  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate('next');
  };

  const goToCurrent = () => {
    toolbar.onNavigate('TODAY');
  };

  const goToMonth = () => {
    toolbar.onView('month');
  };

  const goToWeek = () => {
    toolbar.onView('week');
  };

  const goToDay = () => {
    toolbar.onView('day');
  };

  const viewNamesGroup = [
    { view: 'month', label: 'Month' },
    { view: 'week', label: 'Week' },
    { view: 'day', label: 'Day' },
  ];

  return (
    <div className="flex flex-col gap-8 mb-8">
      <h1 className="text-xl font-semibold">Appointments</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-12 gap-4">
        <div className="md:col-span-1 flex sm:justify-start justify-center items-center">
          <button
            onClick={goToCurrent}
            className="px-6 py-2 border border-subMain rounded-md text-subMain"
          >
            Today
          </button>
        </div>
        {/* label */}
        <div className="md:col-span-9 flex-rows gap-4">
          <button onClick={goToBack} className="text-2xl text-subMain">
            <BiChevronLeft />
          </button>
          <span className="text-xl font-semibold">
            {moment(toolbar.date).format('MMMM YYYY')}
          </span>
          <button onClick={goToNext} className="text-2xl text-subMain">
            <BiChevronRight />
          </button>
        </div>
        {/* filter */}
        <div className="md:col-span-2 grid grid-cols-3 rounded-md  border border-subMain">
          {viewNamesGroup.map((item, index) => (
            <button
              key={index}
              onClick={
                item.view === 'month'
                  ? goToMonth
                  : item.view === 'week'
                    ? goToWeek
                    : goToDay
              }
              className={`border-l text-xl py-2 flex-colo border-subMain ${toolbar.view === item.view
                ? 'bg-subMain text-white'
                : 'text-subMain'
                }`}
            >
              {item.view === 'month' ? (
                <HiOutlineViewGrid />
              ) : item.view === 'week' ? (
                <HiOutlineCalendarDays />
              ) : (
                <BiTime />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

function Appointments() {
  const { data: appointmentData } = useGetAppointmentsQuery({})
  const localizer = momentLocalizer(moment);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});

  const handleClose = () => {
    setOpen(!open);
    setData({});
  };

  const handleEventClick = (event) => {
    setData(appointmentData);
    setOpen(!open);
  };

  const { defaultDate } = React.useMemo(() => ({
    defaultDate: new Date()
  }), [])

  return (
    <Layout>
      {open && (
        <AddAppointmentModal
          datas={data}
          isOpen={open}
          closeModal={() => {
            handleClose();
          }}
        />
      )}
      <button
        onClick={handleClose}
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>
      {
        appointmentData && <Calendar
          localizer={localizer}
          events={appointmentData}
          startAccessor={(event) => moment(event.start).toDate()}
          endAccessor={(event) => moment(event.end).toDate()}
          style={{
            height: 900,
            marginBottom: 50,
          }}
          onSelectEvent={(event) => handleEventClick(event)}
          defaultDate={defaultDate}
          timeslots={1}
          resizable
          step={60}
          selectable={true}
          eventPropGetter={(event) => {
            const style = {
              backgroundColor: '#66B5A3',

              borderRadius: '10px',
              color: 'white',
              border: '1px',
              borderColor: '#F2FAF8',
              fontSize: '12px',
              padding: '5px 5px',
            };
            return {
              style,
            };
          }}
          dayPropGetter={(date) => {
            const backgroundColor = 'white';
            const style = {
              backgroundColor,
            };
            return {
              style,
            };
          }}
          views={['month', 'day', 'week']}
          toolbar={true}
          components={{ toolbar: CustomToolbar }}
        />
      }

    </Layout>
  );
}

export default Appointments;
