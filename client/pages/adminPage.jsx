import React, { useState, useContext, useEffect } from "react";
import { DisplayTemperature } from "../components/displayTemperature";
import { DisplayHumidity } from "../components/displayHumidity";
import { DisplaySunlight } from "../components/displaySunlight";
import { LogOut } from "../components/logout";
import { ReadingsContext } from "../lib/readingsContext";
import { useLoader } from "../lib/useLoader";

export function AdminDashboard(props){
    const { listGreenhouses } = useContext(ReadingsContext);
    const [showTemperature, setShowTemperature] = useState(false);
    const [showHumidity, setShowHumidity] = useState(false);
    const [showSunlight, setShowSunlight] = useState(false);
    const [selectedGreenhouseId, setSelectedGreenhouseId] = useState(false); 
    //const [greenhouseIds, setGreenhouseIds] = useState([]); // state to store the available greenhouseIds

    const { data, error, loading } = useLoader(
        async () => listGreenhouses()
        ,[listGreenhouses]
    );
  
    if (error) {
        return <div>Error: {error.toString()}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
 
    const toggleTemperature = () => {
        setShowTemperature(!showTemperature);
    };
    
    const toggleHumidity = () => {
        setShowHumidity(!showHumidity);
    };
    
    const toggleSunlight = () => {
        setShowSunlight(!showSunlight);
    };

    const handleGreenhouseIdChange = (event) => {
        setSelectedGreenhouseId(event.target.value);
        setShowTemperature(false);
        setShowHumidity(false);
        setShowSunlight(false);
    };

    return (
        <>
          <div>
            <h1>Here are the readings the greenhouse monitor</h1>
            <h1>Welcome, {props.user.username}</h1>
            <LogOut reload={props.reload} />
          </div>
          <div>
            <select value={selectedGreenhouseId} onChange={handleGreenhouseIdChange}>
              <option value="">Select a greenhouse</option>
              {data.map((greenhouse) => (
                <option key={greenhouse.greenhouseId} value={greenhouse.greenhouseId}>
                  Greenhouse {greenhouse.greenhouseId}
                </option>
              ))}
            </select>
            {selectedGreenhouseId && (
              <>
                <button onClick={toggleTemperature}>
                  {showTemperature ? "Hide Temperature" : "Show Temperature"}
                </button>
                <button onClick={toggleHumidity}>
                  {showHumidity ? "Hide Humidity" : "Show Humidity"}
                </button>
                <button onClick={toggleSunlight}>
                  {showSunlight ? "Hide Sunlight" : "Show Sunlight"}
                </button>
              </>
            )}
            {showTemperature && <DisplayTemperature greenhouseId={selectedGreenhouseId} />}
            {showHumidity && <DisplayHumidity greenhouseId={selectedGreenhouseId} />}
            {showSunlight && <DisplaySunlight greenhouseId={selectedGreenhouseId} />}
          </div>
        </>
      );
}