import React, { useContext, useState, useEffect, useCallback } from "react";
import { ReadingsContext } from "../lib/readingsContext";
import { MapTemperatureToGraph } from "./graphTemperature";
import { useLoader } from "../lib/useLoader";

export function DisplayTemperature(props){
    const { listTemperatureById } = useContext(ReadingsContext);
    const { data, error, loading } = useLoader(
        async () => listTemperatureById(props.greenhouseId)
        ,[]
    );
  
    if (error) {
        return <div>Error: {error.toString()}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <MapTemperatureToGraph readings={data}/>
        </div>
    );
}