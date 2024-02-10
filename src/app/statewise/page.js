// pages/statewise.js
"use client"

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import stateWiseData from "@/utils/data.json"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Navbar from '@/components/navbar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const StateWisePage = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [state, setState] = useState(null)
  const [chartData, setChartData] = useState(null);
  // Function to handle state selection
  const handleStateClick = (stateId, stateName) => {
    setSelectedState(stateId);
    setState(stateName)
  };

  useEffect(()=>{
    const data = getChartData();
    setChartData(data)
    console.log(data)
  },[selectedState])

  // Function to generate chart data for a selected state
  const getChartData = () => {
    if (selectedState !== null) {
      const selectedStateData = stateWiseData.find((state) => state.id === selectedState);
      const cityLabels = selectedStateData.cities.map((city) => city.name);
      const temperatureData = selectedStateData.cities.map((city) => city.temp);

      return {
        labels: cityLabels,
        datasets: [
          {
            label: 'Temperature',
            backgroundColor: 'rgba(239, 68, 68, 0.6)', // Red color
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(239, 68, 68, 0.8)',
            hoverBorderColor: 'rgba(239, 68, 68, 1)',
            data: temperatureData,
          },
        ],
      };
    }

    return null;
  };

  const getColorVariant = (index) => {
    const variants = ['red', 'blue', 'green']; // Add more colors if needed
    return variants[index % 3];
  };

  return (
    <div className="container mx-auto p-4">
      {/* Navigation bar and header */}
      <Navbar />
      <header className="text-3xl font-bold mb-4">State Wise Data</header>

      {/* Render state-wise graph */}

      {/* Render state-wise data */}
      <div className="mb-8">
        {/* <h2 className="text-2xl font-bold mb-4">State-wise Data</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stateWiseData.map((state, index) => (
            <div
              key={state.id}
              onClick={() => handleStateClick(state.id, state.name)}
              className={`bg-${index & 1 ? 'red' : 'blue'}-200 border border-${index & 1 ? 'red' : 'blue'}-500 p-4 rounded cursor-pointer hover:bg-${index & 1 ? 'red' : 'blue'}-300`}
            >
              <p className={`text-${index & 1 ? 'red' : 'blue'}-800 font-semibold`}>{state.name}</p>
              <p className={`text-${index & 1 ? 'red' : 'blue'}-700`}>Temperature: {state.temperature}°C</p>
              <p className={`text-${index & 1 ? 'red' : 'blue'}-700`}>Weather: {state.weatherCondition}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedState && <div className="mb-8">
      
        <h2 className="text-2xl font-bold mb-4">State-wise Temperature Graph ({state})</h2>
        <div className="border border-gray-300 rounded p-4">
         <Bar data={getChartData()} />
        </div>
      </div>}

      {/* Render selected state data */}
      {/* {selectedState !== null && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Selected State Data</h2>
          <p className="mb-2">State: {stateWiseData[selectedState - 1].name}</p>
          <ul>
            {stateWiseData[selectedState - 1].cities.map((city) => (
              <li key={city.id} className="mb-2">
                {city.name} - Temperature: {city.temp}°C, Population: {city.population}
              </li>
            ))}
          </ul>
        </div>
      )} */}
      <footer className="text-center">
        <p className="text-sm">&copy; 2024 Weather App</p>
      </footer>
    </div>
  );
};

export default StateWisePage;
