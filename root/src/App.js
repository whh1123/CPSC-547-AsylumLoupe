import './App.css';
import InsightChart from './components/InsightChart';
// import HealthRegionList from './components/HealthRegionList';
import MapChart from './components/MapChart';
import Table from './components/Table';
import { useState } from "react";
function App() {
  const [selectedView, setSelectedView] = useState("")
  const [appDestination, setAppDestination] = useState("")
  const [appOrigin, setAppOrigin] = useState("")

  var getDestination = (currDestination) => {
    setAppDestination(currDestination);
    console.log("get destination in app.js: " + currDestination);
  };

  var getOrigin = (currOrigin) => {
    setAppOrigin(currOrigin);
    console.log("get origin in app.js: " + currOrigin);
  };
  
  
  return (
    <div className="App">
      <h1>AsylumLoupe: EU Asylum Demographics and Movement</h1>
      <h2>CPSC 547 Information Visualization Project Han Wang & Xin Wang</h2>
      <div>
        <div className='mapContainer'>
          <MapChart selectedView={selectedView} getDestination={getDestination} getOrigin={getOrigin}/>
        </div>
      </div>
      <div>
        <div className='insightsContainer'>
            <InsightChart selectedView={selectedView} destination={appDestination} origin={appOrigin}/>
        </div>
        <div className='chartsContainer'>
          <Table selectedView={selectedView} destination={appDestination} origin={appOrigin}/>
        </div>
        <div className='buttonsContainer'>
          <button id="people" className='buttonStyle' onClick={() => {setSelectedView("people")}}>People</button>
          <button id="gender" className='buttonStyle' onClick={() => {setSelectedView("gender")}}>gender</button>
          <button id="age" className='buttonStyle' onClick={() => {setSelectedView("age")}}>Age</button>
        </div>
      </div>
    </div>
  );
}

export default App;