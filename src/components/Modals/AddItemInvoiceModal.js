import React, { useState } from 'react';
import Modal from './Modal';
import { BiPlus, BiChevronDown } from 'react-icons/bi';
import PatientMedicineServiceModal from './PatientMedicineServiceModal';
import { useGetServicesQuery } from '../../redux/services/service';
import { Button, Input, Select } from '../Form';
import { servicesData } from '../Datas';

function AddItemModal({ closeModal, isOpen, item, setItem, addItem }) {
  const { data: getServicesData, refetch } = useGetServicesQuery({})
  const [quantity, setQuantity] = useState(0)
  const [open, setOpen] = useState(false);


  const handleSaveItem = () => {
    addItem({
      service_id: item.id,
      name: item.name,
      quantity: parseInt(quantity),
      price: parseInt(item.price),
      description: item.description
    });
    closeModal();
  };

  return (
    <>
      {open && (
        <PatientMedicineServiceModal
          closeModal={() => setOpen(!open)}
          isOpen={open}
          patient={false}
          setSelected={setItem}
          selected={item}
        />
      )}
      <Modal
        closeModal={closeModal}
        isOpen={isOpen}
        title="Add Item"
        width={'max-w-xl'}
      >
        <div className="flex-colo gap-6">
          {/* title */}
          <div className="flex flex-col gap-4 w-full">
            <p className="text-black text-sm">Service</p>
            {/* <button
              onClick={() => setOpen(!open)}
              className=" text-subMain flex-rows gap-2 rounded-lg border border-subMain border-dashed py-4 w-full text-sm"
            >
              <BiPlus /> Add Item
            </button> */}
            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Purpose of visit</p>
              <Select
                selectedPerson={item}
                setSelectedPerson={setItem}
                datas={getServicesData}
              >
                <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                  {item?.name} <BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>
          </div>
          {/* quantity */}
          <Input
            label="Quantity"
            color={true} type={'number'}
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
          />
          {/* summery */}
          <div className="flex flex-col gap-4 w-full">
            <p className="text-black text-sm">Summary</p>
            {/* <div className="flex flex-col gap-4">
              {summery.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center"
                >
                  <p className="text-xs text-textGray">{item.title}</p>
                  <p
                    className={
                      item.color
                        ? 'text-xs text-subMain bg-subMain bg-opacity-10 font-semibold py-1 px-4 rounded-full'
                        : 'text-sm font-medium text-textGray'
                    }
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div> */}
          </div>

          {/* button */}
          <Button onClick={handleSaveItem} label="Add" Icon={BiPlus} />
        </div>
      </Modal>
    </>
  );
}

export default AddItemModal;
