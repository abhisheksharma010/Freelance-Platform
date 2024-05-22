import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/Register';
import HomePage from './pages/HomePage';
// import ClientRoutes from './routes/ClientRoutes';
import ClientDashboard from './pages/client/ClientDashBoard';
import ClientContract from './pages/client/CreateContract';
import PreviousContract from './pages/client/PreviousContract';
import ContractDetail from './pages/ContractDetail';
import ContractDetailPage from './pages/ContractCardDetail';
import FreelancerDashboard from './pages/freelancer/FreelancerDashBoard';
import FreelancerProfile from './pages/freelancer/FreelancerProfile';
import FreelancerProposal from './pages/freelancer/FreelancerProposal';
import Freelancerorders from './pages/freelancer/Freelancerorders';
import Category from './pages/Category';
import ContractClient from './pages/client/ContractClient';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<HomePage />} />
        {/* <Route path='/dashboard' element={<ClientRoutes />}> */}

        <Route path='/client' element={<ClientDashboard />} />
        <Route path='/client/create-contract' element={<ClientContract />} />
        <Route path='/client/previous-contract' element={<PreviousContract />} />
        <Route path='/client/:slug' element={<ContractDetail />} />
        <Route path='/contracts/:id' element={<ContractDetailPage />} />
        <Route path='/client/contracts/:id' element={<ContractClient />} />
        <Route path='/freelancer' element={<FreelancerDashboard />} />
        <Route path='/freelancer/profile' element={<FreelancerProfile />} />
        <Route path='/freelancer/proposal' element={<FreelancerProposal />} />
        <Route path='/freelancer/orders' element={<Freelancerorders />} />
        <Route path='/category/:slug' element={<Category />} />
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
