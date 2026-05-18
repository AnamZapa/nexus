import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <Navbar />

        <AppRoutes />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
