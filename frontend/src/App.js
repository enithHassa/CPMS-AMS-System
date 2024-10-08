import './components_home/common.css';
import './components_home/home.css';
import './components_login/login.css';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from './components_home/Home';
import Login from './components_login/login';
import ApmDashboard from './components_apm/Apm_Dashboard';

import AddClient from './components_cli/Clients/addClient';
import ClientPortalHome from './components_cli/Clients/ClientPortalHome';
import SuccessPage from './components_cli/ClientDetails/viewClientDetails';
import UserClients from './components_cli/ClientDetails/UserClients';
import ClientLogin from './components_cli/ClientDetails/ClientLogin';
import ClientProfile from './components_cli/ClientDetails/ClientProfile';
import UpdateClient from './components_cli/Clients/UpdateClient';
import DeleteClient from './components_cli/Clients/DeleteClient';
import ClientCase from './components_cli/Clients_Info/ClientCases';
import ClientDeeds from './components_cli/Clients_Info/ClientDeeds';
import SearchResults from './components_cli/Clients_Info/SearchResults';

function App() {
  return (
    
    <Router>
      <div>
        <Routes>

        <Route path="/" exact element={<Home/>}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/apm_dashboard" exact element={<ApmDashboard/>}/>

        <Route path="/addClient" element={<AddClient />} />
        <Route path="/clientHome/:id" element={<ClientPortalHome />} />
        <Route path="/successCli_Page" element={<SuccessPage />} />
        <Route path="/viewClient" element={<UserClients />} />
        <Route path="/loginClient/" element={<ClientLogin />} />
        <Route path="/clientProfile/:id" element={<ClientProfile />} /> 
        <Route path="/updateClient/:id" element={<UpdateClient />} />
        <Route path="/deleteClient/:id" element={<DeleteClient />} />
        <Route path="/viewCase/:nic" element={<ClientCase />} />
        <Route path="/viewDeed/:nic" element={<ClientDeeds />} />
        <Route path="/searchResults" element={<SearchResults />} />

        </Routes>
      </div>
    </Router> 
  );
}

export default App;