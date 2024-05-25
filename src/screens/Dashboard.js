import React, { useCallback } from 'react';
import Layout from '../Layout';
import {
  BsArrowDownLeft,
  BsArrowDownRight,
  BsArrowUpRight,
  BsCheckCircleFill,
  BsClockFill,
  BsXCircleFill,
} from 'react-icons/bs';
import { DashboardBigChart, DashboardSmallChart } from '../components/Charts';
import {
  appointmentsData,
  dashboardCards,
  memberData,
  transactionData,
} from '../components/Datas';
import { Transactiontable } from '../components/Tables';
import { Link } from 'react-router-dom';
import { useGetDashboardStatisticsQuery, useGetRecentTransactionsQuery, useGetTodayAppointmentsQuery } from '../redux/services/dashboard';
import { useGetRecentPatientsQuery } from '../redux/services/patient';

function Dashboard() {
  const { data, isSuccess, isError, isLoading } = useGetDashboardStatisticsQuery({})
  const { data: patientData, isLoading: loadingPatientData } = useGetRecentPatientsQuery({})
  const { data: recentTransactionsData, isLoading: loadingRecentTransactions } = useGetRecentTransactionsQuery({})
  const { data: totalAppointmentData, isLoading: totalAppointmentLoading } = useGetTodayAppointmentsQuery({})

  console.log(totalAppointmentData?.[0], 'data')

  const renderDashboardCards = useCallback(() => {
    if (isLoading) return <></>
    return <div className="w-full grid xl:grid-cols-3 gap-6 lg:grid-cols-12 sm:grid-cols-2 grid-cols-1">
      {data?.map((card, index) => (
        <div
          key={card.id}
          className=" bg-white rounded-xl border-[1px] border-border p-5"
        >
          <div className="flex gap-4 items-center">
            <div
              className={`w-10 h-10 flex-colo bg-opacity-10 rounded-md ${card.color[1]} ${card.color[0]}`}
            >
              <card.icon />
            </div>
            <h2 className="text-sm font-medium">{card.title}</h2>
          </div>
          <div className="grid grid-cols-8 gap-4 mt-4 bg-dry py-5 px-8 items-center rounded-xl">
            <div className="col-span-5">
              {/* statistc */}
              <DashboardSmallChart data={card.datas} colors={card.color[2]} />
            </div>
            <div className="flex flex-col gap-4 col-span-3">
              <h4 className="text-md font-medium">
                {card.value}
                {
                  // if the id === 4 then add the $ sign
                  card.id === 3 ? '$' : '+'
                }
              </h4>
              <p className={`text-sm flex gap-2 ${card.color[1]}`}>
                {card.percent >= 0 && <BsArrowUpRight />}
                {card.percent < 0 && card.percent < 50 && (
                  <BsArrowDownRight />
                )}
                {card.percent}%
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  }, [data, isLoading])



  return (
    <Layout>
      {/* boxes */}
      {renderDashboardCards()}
      <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
        <div className="xl:col-span-6  w-full">
          <div className="bg-white rounded-xl border-[1px] border-border p-5">
            <div className="flex-btn gap-2">
              <h2 className="text-sm font-medium">Earning Reports</h2>
              {/* <p className="flex gap-4 text-sm items-center">
                5.44%{' '}
                <span className="py-1 px-2 bg-subMain text-white text-xs rounded-xl">
                  +2.4%
                </span>
              </p> */}
            </div>
            {/* Earning Reports */}
            <div className="mt-4">
              <DashboardBigChart />
            </div>
          </div>
          {/* transaction */}
          <div className="mt-6 bg-white rounded-xl border-[1px] border-border p-5">
            <div className="flex-btn gap-2">
              <h2 className="text-sm font-medium">Recent Transaction</h2>
              <p className="flex gap-4 text-sm items-center">
                Today{' '}
                <span className="py-1 px-2 bg-subMain text-white text-xs rounded-xl">
                  {recentTransactionsData?.total_today}$
                </span>
              </p>
            </div>
            {/* table */}
            <div className="mt-4 overflow-x-scroll">
              <Transactiontable
                data={recentTransactionsData?.transactions}
                action={false}
              />
            </div>
          </div>
        </div>
        {/* side 2 */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="10"
          data-aos-offset="200"
          className="xl:col-span-2 xl:block grid sm:grid-cols-2 gap-6"
        >
          {/* recent patients */}
          <div className="bg-white rounded-xl border-[1px] border-border p-5">
            <h2 className="text-sm font-medium">Recent Patients</h2>
            {patientData?.map((member, index) => (
              <Link
                to={`/patients/preview/${member.id}`}
                key={index}
                className="flex-btn gap-4 mt-6 border-b pb-4 border-border"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={member.image || '/images/user5.png'}
                    alt="member"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-medium">{member.title}</h3>
                    <p className="text-xs text-gray-400">{member.phone}</p>
                  </div>
                </div>
                <p className="text-xs text-textGray">{member.timeOfJoining}</p>
              </Link>
            ))}
          </div>
          {/* today apointments */}
          <div className="bg-white rounded-xl border-[1px] border-border p-5 xl:mt-6">
            <h2 className="text-sm mb-4 font-medium">Today Appointments</h2>
            {totalAppointmentData?.map((appointment, index) => (
              <div
                key={appointment.id}
                className="grid grid-cols-12 gap-2 items-center"
              >
                <p className="text-textGray text-[12px] col-span-3 font-light">
                  {appointment.time}
                </p>
                <div className="flex-colo relative col-span-2">
                  <hr className="w-[2px] h-20 bg-border" />
                  <div
                    className={`w-7 h-7 flex-colo text-sm bg-opacity-10
                   ${appointment.status === 'Pending' &&
                      'bg-orange-500 text-orange-500'
                      }
                  ${appointment.status === 'Cancelled' && 'bg-red-500 text-red-500'
                      }
                  ${appointment.status === 'Approved' &&
                      'bg-green-500 text-green-500'
                      }
                  ${appointment.status === 'Confirmed' &&
                      'bg-blue-500 text-blue-500'
                      }
                   rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                  >
                    {appointment.status === 'Pending' && <BsClockFill />}
                    {appointment.status === 'Cancelled' && <BsXCircleFill />}
                    {appointment.status === 'Approved' && <BsCheckCircleFill />}
                    {appointment.status === 'Confirmed' && <BsCheckCircleFill />}
                  </div>
                </div>
                <Link
                  to="/appointments"
                  className="flex flex-col gap-1 col-span-6"
                >
                  <h2 className="text-xs font-medium">
                    {appointment.user?.title}
                  </h2>
                  <p className="text-[12px] font-light text-textGray">
                    {appointment.from} - {appointment.to}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
