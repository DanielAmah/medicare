import { PaymentTable } from '../Tables';
import { useNavigate } from 'react-router-dom';

function PaymentsUsed({ doctor, payments }) {
  const navigate = useNavigate();
  const handleEventClick = (id) => {
    navigate(`/payments/preview/${id}`);
  };
  return (
    <div className="w-full">
      <h1 className="text-sm font-medium mb-6">Payments</h1>
      <div className="w-full overflow-x-scroll">
        <PaymentTable
          data={payments}
          doctor={doctor}
          functions={{
            preview: handleEventClick,
          }}
        />
      </div>
    </div>
  );
}

export default PaymentsUsed;
