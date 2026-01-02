import { useState } from 'react';
import { Hero, Nav, Calculator, Info, Footer } from './components';
import FileUpload from './components/FileUpload';
function App() {
  const [score, setScore] = useState(0);
  
  const getCGPA = (calculatedCGPA) => {
    setScore(calculatedCGPA)
  }
  return (
    <div className="min-h-screen px-24 bg-black-bodyBgColor tab:bg-black-calcBgColor md:px-8 font-body1 mobile:px-0">
      <Nav />
      <Hero />
      <Calculator handleScore={getCGPA} />
      <Info cgpa={score} />
      <FileUpload />
      <Footer />
    </div>
  );
}

export default App;
