import './App.css';
import AddUser from './Component/User/AddUser';
import { ToastContainer} from 'react-toastify';



function App() {
  return (
    <div className="App"> 
      <AddUser />
      <ToastContainer />
    </div>
  );
}

export default App;
