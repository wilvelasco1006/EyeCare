import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home/Home.jsx'
import Diseases from './pages/diseases/CarouselDiseases.jsx'
import Quiz from './pages/quiz/Quiz.jsx'
import NotFound from './pages/not-found/NotFound.jsx'
import AboutUs from "./pages/about-us/AboutUs.jsx"
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './layout/Layout.jsx'
import Sign from './pages/sign-in/Sign.jsx'
import Cataracts from './pages/diseases/Cataracts/Cataracts.jsx'
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="diseases" element={<Diseases />} />
        <Route path="diseases/cataracts" element={<Cataracts />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="*" element={<NotFound />} />
        <Route path="about us" element={<AboutUs />} />
        <Route path="sign in" element={<Sign />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
