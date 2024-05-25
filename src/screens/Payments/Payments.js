import React, { useState } from 'react';
import Layout from '../../Layout';
import { Button, FromToDate, Select } from '../../components/Form';
import { Transactiontable } from '../../components/Tables';
import { sortsDatas, transactionData } from '../../components/Datas';
import { BiChevronDown, BiTime } from 'react-icons/bi';
import {
  MdFilterList,
  MdOutlineCalendarMonth,
  MdOutlineCloudDownload,
} from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { BsCalendarMonth } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useGetPaymentSummaryQuery } from '../../redux/services/payment';
import { useGetRecentTransactionsQuery } from '../../redux/services/dashboard'

function Payments() {
  const { data } = useGetPaymentSummaryQuery({})
  const { data: recentTransactionsData, isLoading: loadingRecentTransactions } = useGetRecentTransactionsQuery({})
  const navigate = useNavigate();

  console.log(recentTransactionsData, 'paymentData')


  const editPayment = (id) => {
    navigate(`/payments/edit/${id}`);
  };
  // preview
  const previewPayment = (id) => {
    navigate(`/payments/preview/${id}`);
  };

  return (
    <Layout>
      {/* add button */}
      {/* <button
        onClick={() => {
          toast.error('Exporting is not available yet');
        }}
        className="w-16 hover:w-44 group transitions hover:h-14 h-16 border border-border z-50 bg-subMain text-white rounded-full flex-rows gap-4 fixed bottom-8 right-12 button-fb"
      >
        <p className="hidden text-sm group-hover:block">Export</p>
        <MdOutlineCloudDownload className="text-2xl" />
      </button> */}
      <h1 className="text-xl font-semibold">Payments</h1>
      {/* boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {data?.map((box) => (
          <div
            key={box.id}
            className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5"
          >
            <div className="w-3/4">
              <h2 className="text-sm font-medium">{box.title}</h2>
              <h2 className="text-xl my-6 font-medium">{box.value}</h2>
              <p className="text-xs text-textGray">
                You made <span className={box.color[1]}>{box.value}</span>{' '}
                transactions{' '}
                {box.title === 'Today Payments'
                  ? 'today'
                  : box.title === 'Monthly Payments'
                    ? 'this month'
                    : 'this year'}
              </p>
            </div>
            <div
              className={`w-10 h-10 flex-colo rounded-md text-white text-md ${box.color[0]}`}
            >
              {box.icon == 'BiTime' && <BiTime />}
              {box.icon == 'BsCalendarMonth' && <BsCalendarMonth />}
              {box.icon == 'MdOutlineCalendarMonth' && <MdOutlineCalendarMonth />}

            </div>
          </div>
        ))}
      </div>
      {/* datas */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="10"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        {/* <div className="grid lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder='Search "Patients"'
            className="h-14 text-sm text-main rounded-md bg-dry border border-border px-4"
          />
     
          {sorts.map((item) => (
            <Select
              key={item.id}
              selectedPerson={item.selected}
              setSelectedPerson={item.setSelected}
              datas={item.datas}
            >
              <div className="h-14 w-full text-xs text-main rounded-md bg-dry border border-border px-4 flex items-center justify-between">
                <p>{item.selected.name}</p>
                <BiChevronDown className="text-xl" />
              </div>
            </Select>
          ))}

          <FromToDate
            startDate={startDate}
            endDate={endDate}
            bg="bg-dry"
            onChange={(update) => setDateRange(update)}
          />

          <Button
            label="Filter"
            Icon={MdFilterList}
            onClick={() => {
              toast.error('Filter data is not available yet');
            }}
          />
        </div> */}
        <div className="mt-8 w-full overflow-x-scroll">
          <Transactiontable
            data={recentTransactionsData?.transactions}
            action={false}
            functions={{
              edit: editPayment,
              preview: previewPayment,
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Payments;
