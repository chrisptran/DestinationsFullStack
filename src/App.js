import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Create from './views/Create'
import Test from './views/Test'
import DetailsPage from './views/DetailsPage';
import Edit from './views/Edit';

function App() {
  return (
    <div className='App'>
      <h1>Destination Advisor</h1>
      <p>
        <Link to="/destinations">Dashboard</Link> | 
        <Link to="/destinations/add"> Create New Destination</Link>
      </p>
      <Routes>
        <Route path='/apitest' element={<Test />} />
        <Route path='/destinations' element={<Dashboard />} />
        <Route path='destinations/add' element={<Create />} />
        <Route path='/destinations/:id' element={<DetailsPage />} />
        <Route path='/destinations/:id/edit' element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
