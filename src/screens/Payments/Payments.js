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
import { formatCurrency } from '../../utils/core'

function Payments() {
  const { data } = useGetPaymentSummaryQuery({})
  const { data: recentTransactionsData, isLoading: loadingRecentTransactions } = useGetRecentTransactionsQuery({})
  const navigate = useNavigate();

  console.log(recentTransactionsData, 'paymentData')


  const editPayment = (id) => {
    navigate(`/payments/edit/${id}`);
  };
  const previewPayment = (id) => {
    navigate(`/payments/preview/${id}`);
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold">Payments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {data?.map((box) => (
          <div
            key={box.id}
            className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5"
          >
            <div className="w-3/4">
              <h2 className="text-sm font-medium">{box.title}</h2>
              <h2 className="text-xl my-6 font-medium">{formatCurrency(box.value)}</h2>
              <p className="text-xs text-textGray">
                You made <span className={box.color[1]}>{formatCurrency(box.value)}</span>{' '}
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
