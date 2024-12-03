import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path='/' element={<Home/>} />{/* UserHome page */}
      </Routes>

    </Router>
    </>
  );
}

export default App;
