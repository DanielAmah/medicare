import React, { useEffect, useState } from 'react';
import { Checkbox } from './Form';

function Access({ accessData, handleCheckboxChange }) {
  const thclass = 'text-start text-xs font-medium py-3 px-2 whitespace-nowrap';
  const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';

  const datas = [
    { id: 1, name: 'Patient', section: 'patient' },
    { id: 2, name: 'Appointment', section: 'appointment' },
    { id: 3, name: 'Invoices', section: 'invoices' },
    { id: 4, name: 'Payments', section: 'payments' }
  ];


  return (
    <div className="w-full">
      <h1 className="text-black text-sm mb-3">Access</h1>
      <div className="w-full overflow-x-scroll">
        <table className="table-auto w-full">
          <thead className="bg-dry rounded-md overflow-hidden">
            <tr>
              <th className={thclass}></th>
              <th className={thclass}>Read</th>
              <th className={thclass}>Edit</th>
              <th className={thclass}>Create</th>
              <th className={thclass}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border hover:bg-greyed transitions"
              >
                <td className={`font-light text-xs ${tdclass}`}>{item.name}</td>
                <td className={tdclass}>
                  <Checkbox
                    name="read"
                    checked={accessData[item.section].read}
                    onChange={handleCheckboxChange(item.section, 'read')}
                  />
                </td>
                <td className={tdclass}>
                  <Checkbox
                    name="edit"
                    checked={accessData[item.section].edit}
                    onChange={handleCheckboxChange(item.section, 'edit')}
                  />
                </td>
                <td className={tdclass}>
                  <Checkbox
                    name="create"
                    checked={accessData[item.section].create}
                    onChange={handleCheckboxChange(item.section, 'create')}
                  />
                </td>
                <td className={tdclass}>
                  <Checkbox
                    name="delete"
                    checked={accessData[item.section].delete}
                    onChange={handleCheckboxChange(item.section, 'delete')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Access;
