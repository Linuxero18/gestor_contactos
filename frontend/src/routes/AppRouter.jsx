import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contactos from '../pages/Contactos';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/contactos" element={<Contactos />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;