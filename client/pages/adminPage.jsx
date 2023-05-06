import React, { useState } from "react";
import { DisplayTemperature } from "../components/displayTemperature";
import { DisplayHumidity } from "../components/displayHumidity";
import { DisplaySunlight } from "../components/displaySunlight";
import { LogOut } from "../components/logout";

export function AdminDashboard(props){
    const [showTemperature, setShowTemperature] = useState(false);
    const [showHumidity, setShowHumidity] = useState(false);
    const [showSunlight, setShowSunlight] = useState(false);

    const toggleTemperature = () => {
        setShowTemperature(!showTemperature);
    };
    
    const toggleHumidity = () => {
        setShowHumidity(!showHumidity);
    };
    
    const toggleSunlight = () => {
        setShowSunlight(!showSunlight);
    };

    return (
        <>
            <div>
                <h1>Here are the readings the greenhouse monitor</h1>
                <h1>
                    Welcome, {props.user.username}
                </h1>
                <LogOut reload={props.reload} />
            </div>
            <div>
                <button onClick={toggleTemperature}>
                    {showTemperature ? "Hide Temperature" : "Show Temperature"}
                </button>
                <button onClick={toggleHumidity}>
                    {showHumidity ? "Hide Humidity" : "Show Humidity"}
                </button>
                <button onClick={toggleSunlight}>
                    {showSunlight ? "Hide Sunlight" : "Show Sunlight"}
                </button>
                {showTemperature && <DisplayTemperature />}
                {showHumidity && <DisplayHumidity />}
                {showSunlight && <DisplaySunlight />}
            </div>
        </>
    );
}