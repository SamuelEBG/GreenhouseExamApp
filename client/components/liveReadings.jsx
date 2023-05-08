import { useContext, useState, useEffect } from "react";
import { ReadingsContext } from "../lib/readingsContext";
import { MapTemperatureToGraph } from "./graphTemperature";
import { MapHumidityToGraph } from "./graphHumidity";
import { MapSunlightToGraph } from "./graphSunlight";
import { useLoader } from "../lib/useLoader";

export function DisplayLiveReadings(props) {
    const { listTemperatureById, listHumidityById, listSunlightById } = useContext(ReadingsContext);
    const [liveData, setLiveData] = useState({ temperature: [], humidity: [], sunlight: [] });
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const interval = setInterval(() => {
        Promise.all([listTemperatureById(props.greenhouseId), listHumidityById(props.greenhouseId), listSunlightById(props.greenhouseId)]).then(([tempReadings, humidityReadings, sunlightReadings]) => {
          setLiveData({
            temperature: tempReadings,
            humidity: humidityReadings,
            sunlight: sunlightReadings,
          });
          setIsLoading(false);
        });
      }, 15000);
  
      return () => clearInterval(interval);
    }, [listTemperatureById, listHumidityById, listSunlightById]);
  
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {isLoading && <div className="container">Loading live readings for employee will take up to 15 seconds...</div>}
  
        <div className="graph-container">
          {!isLoading && <MapTemperatureToGraph readings={liveData.temperature} />}
        </div>
        <div className="graph-container">
          {!isLoading && <MapHumidityToGraph readings={liveData.humidity} />}
        </div>
        <div className="graph-container full-width">
          {!isLoading && <MapSunlightToGraph readings={liveData.sunlight} />}
        </div>
      </div>
    );
  }