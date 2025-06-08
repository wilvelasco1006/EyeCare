import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/home/Home.jsx';
import Quiz from './pages/quiz/Quiz.jsx';
import NotFound from './pages/not-found/NotFound.jsx';
import AboutUs from "./pages/about-us/AboutUs.jsx";
import Layout from './layout/Layout.jsx';
import Sign from './pages/sign-in/Sign.jsx';
import Diseases from './pages/diseases/CarouselDiseases.jsx';
import Cataracts from './pages/diseases/Cataracts/Cataracts.jsx';
import Conjuntivis from './pages/diseases/Conjuntivitis/Conjuntivitis.jsx';
import Glaucoma from './pages/diseases/Glaucoma/Glaucoma.jsx';
import MacularDegeneration from './pages/diseases/macular-degeneration/MacularDegeneration.jsx';
import ProtectedRoute from './pages/diseases/utils/ProtectedRoute.jsx';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="diseases">
          {/* Esta ruta no está protegida */}
          <Route path="content-diseases" element={<Diseases />} />
          
          {/* Rutas protegidas de enfermedades */}
          <Route path="cataracts" element={<Cataracts />} />
          <Route path="Conjuntivitis" element={<Conjuntivis />} />
          <Route path="Glaucoma" element={
              <Glaucoma />} />
          <Route path="macular-degeneration" element={<MacularDegeneration />} />
        </Route>
        <Route path="quiz" element={
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
          } />
        <Route path="*" element={<NotFound />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="sign-in" element={<Sign />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);