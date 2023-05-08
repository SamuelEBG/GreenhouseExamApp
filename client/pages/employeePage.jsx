import React, { useState } from "react";
import { DisplayReadings } from "../components/displayTemperature";
import { DisplayLiveReadings } from "../components/liveReadings";
import { LogOut } from "../components/logout";

export function EmployeeDashboard(props){
    /*
    const [showGraph, setShowGraph] = useState(false);
    const toggleGraph = () => {
        setShowGraph(!showGraph);
    };
    */
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
              <DisplayLiveReadings greenhouseId={props.user.worksAt}/>
            </div>
        </>
    );
}