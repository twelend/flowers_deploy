import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';
import Helper from './components/Helper/Helper';

function App() {
  const [showHelper, setShowHelper] = useState(false);

  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(() => {
      setShowHelper(true);
    }, 8000);
    return () => clearInterval(timeoutId);
  }, []);


  return (
    <div className="App">
      <Header setShowHelper={setShowHelper}/>
      <Main />
      <Footer />
      {showHelper &&
        <Helper setShowHelper={setShowHelper} />
      }
    </div>
  );
}

export default App;
