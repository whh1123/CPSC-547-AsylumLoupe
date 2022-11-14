import './App.css';
import HealthRegionList from './components/HealthRegionList';

function App() {
  return (
    <div className="App">
      <h1>AsylumLoupe: EU Asylum Demographics and Movement</h1>
      <h2>CPSC 547 Information Visualisation Project Han Wang & Xin Wang</h2>
      <div>
        <HealthRegionList />
        <div className='insightsContainer'/>
      </div>
      <div>
        <div className='chartsContainer'/>
        <div className='buttonsContainer'>
          <button className='buttonStyle'>People</button>
          <button className='buttonStyle'>gender</button>
          <button className='buttonStyle'>Age</button>
        </div>
      </div>
    </div>
  );
}

export default App;
