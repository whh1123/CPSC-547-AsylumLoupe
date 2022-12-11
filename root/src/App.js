import './App.css';
// import HealthRegionList from './components/HealthRegionList';
import MapChart from './components/MapChart';

function App() {
  return (
    <div className="App">
      <h1>AsylumLoupe: EU Asylum Demographics and Movement</h1>
      <h2>CPSC 547 Information Visualisation Project Han Wang & Xin Wang</h2>
      <div style={{width: '70%', display: 'inline-block'}} className='mapContainer'>
        {/* <HealthRegionList /> */}
        <MapChart/>
      </div>
      <div>
        <div className='insightsContainer'/>
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