import { Hero, Nav, Calculator,Info, Footer } from './components';
function App() {
  return (
    <div className='min-h-screen px-24 bg-black-bodyBgColor font-body1'>
      <Nav />
      <Hero />
      <Calculator />
      <Info />
      {/* <section> */}
        <Footer />
      {/* </section> */}
    </div>
  );
}

export default App;
