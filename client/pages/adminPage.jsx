import React, { useState } from "react";
import { DisplayReadings } from "../components/displayReadings";
import { LogOut } from "../components/logout";

export function AdminDashboard(props){
    const [showGraph, setShowGraph] = useState(false);

    const toggleGraph = () => {
        setShowGraph(!showGraph);
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
                <button onClick={toggleGraph}>
                    {showGraph ? "Hide Graph" : "Show Graph"}
                </button>
                {showGraph && <DisplayReadings />}
            </div>
        </>
    );
}