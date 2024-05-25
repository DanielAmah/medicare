import React from 'react';
import { BiPlus } from 'react-icons/bi';
import { useGetDoctorQuery } from '../redux/services/user';
import { getData } from '../utils/core';
import { AUTH_TOKEN_KEY } from '../utils/storage';

function SenderReceverComp({ item, functions, button }) {
  const auth = getData(AUTH_TOKEN_KEY)
  const { userId } = auth
  const { data: userInfo, isLoading } = useGetDoctorQuery({ id: userId })
  return (
    <div className="grid sm:grid-cols-2 gap-6 items-center mt-4">
      <div className="border border-border rounded-xl p-5">
        <div className="flex-btn gap-4">
          <h1 className="text-md font-semibold">From:</h1>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <h6 className="text-xs font-medium">{userInfo?.title} {userInfo?.name}</h6>
          <p className="text-xs text-textGray">{userInfo?.name}</p>
          <p className="text-xs text-textGray">{userInfo?.phone}</p>
        </div>
      </div>
      <div className="border border-border rounded-xl p-5">
        <div className="flex-btn gap-4">
          <h1 className="text-md font-semibold">To:</h1>
          {button && (
            <button
              onClick={() => functions.openModal()}
              className="bg-dry text-subMain flex-rows gap-2 rounded-lg border border-border py-2 px-4 text-sm"
            >
              <BiPlus /> Add
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <h6 className="text-xs font-medium">{item?.title}</h6>
          <p className="text-xs text-textGray">{item?.email}</p>
          <p className="text-xs text-textGray">{item?.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default SenderReceverComp;
