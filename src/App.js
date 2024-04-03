import { Hero, Nav, Calculator,Info, Footer } from './components';
function App() {
  return (
    <div className='min-h-screen px-24 bg-black-bodyBgColor tab:bg-black-calcBgColor md:px-8 font-body1 mobile:px-0'>
      <Nav />
      <Hero />
      <Calculator />
      <Info />
        <Footer />
    </div>
  );
}

export default App;
