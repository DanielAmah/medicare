
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Aos from 'aos';
import Dashboard from './screens/Dashboard';
import Toast from './components/Notifications/Toast';
import Payments from './screens/Payments/Payments';
import Appointments from './screens/Appointments';
import Patients from './screens/Patients/Patients';
import Campaings from './screens/Campaings';
import Services from './screens/Services';
import Invoices from './screens/Invoices/Invoices';
import Settings from './screens/Settings';
import CreateInvoice from './screens/Invoices/CreateInvoice';
import EditInvoice from './screens/Invoices/EditInvoice';
import PreviewInvoice from './screens/Invoices/PreviewInvoice';
import EditPayment from './screens/Payments/EditPayment';
import PreviewPayment from './screens/Payments/PreviewPayment';
import Medicine from './screens/Medicine';
import PatientProfile from './screens/Patients/PatientProfile';
import CreatePatient from './screens/Patients/CreatePatient';
import Doctors from './screens/Doctors/Doctors';
import DoctorProfile from './screens/Doctors/DoctorProfile';
import Receptions from './screens/Receptions';
import NewMedicalRecode from './screens/Patients/NewMedicalRecode';
import NotFound from './screens/NotFound';
import Login from './screens/Login';
import Register from './screens/Register'
import { store } from '../src/redux';
import RequireAuth from './RequireAuth';

function App() {
  Aos.init();

  return (
    <Provider store={store}>
      {/* Toaster */}
      <Toast />
      {/* Routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
          {/* invoce */}
          <Route path="/invoices" element={<RequireAuth><Invoices /></RequireAuth>} />
          <Route path="/invoices/create" element={<RequireAuth><CreateInvoice /></RequireAuth>} />
          <Route path="/invoices/edit/:id" element={<RequireAuth><EditInvoice /></RequireAuth>} />
          <Route path="/invoices/preview/:id" element={<RequireAuth><PreviewInvoice /></RequireAuth>} />
          {/* payments */}
          <Route path="/payments" element={<RequireAuth><Payments /></RequireAuth>} />
          <Route path="/payments/edit/:id" element={<RequireAuth><EditPayment /></RequireAuth>} />
          <Route path="/payments/preview/:id" element={<RequireAuth><PreviewPayment /></RequireAuth>} />
          {/* patient */}
          <Route path="/patients" element={<RequireAuth><Patients /></RequireAuth>} />
          <Route path="/patients/preview/:id" element={<RequireAuth><PatientProfile /></RequireAuth>} />
          <Route path="/patients/create" element={<RequireAuth><CreatePatient /></RequireAuth>} />
          <Route path="/patients/visiting/:id" element={<RequireAuth><NewMedicalRecode /></RequireAuth>} />
          {/* doctors */}
          <Route path="/doctors" element={<RequireAuth><Doctors /></RequireAuth>} />
          <Route path="/doctors/preview/:id" element={<RequireAuth><DoctorProfile /></RequireAuth>} />
          {/* reception */}
          <Route path="/receptions" element={<RequireAuth><Receptions /></RequireAuth>} />
          {/* others */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/appointments" element={<RequireAuth><Appointments /></RequireAuth>} />
          <Route path="/campaigns" element={<RequireAuth><Campaings /></RequireAuth>} />
          <Route path="/medicine" element={<RequireAuth><Medicine /></RequireAuth>} />
          <Route path="/services" element={<RequireAuth><Services /></RequireAuth>} />
          <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
