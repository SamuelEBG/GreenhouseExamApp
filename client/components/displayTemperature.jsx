import React, { useContext, useState, useEffect, useCallback } from "react";
import { ReadingsContext } from "../lib/readingsContext";
import { MapTemperatureToGraph } from "./graphTemperature";
import { useLoader } from "../lib/useLoader";

export function DisplayTemperature(){
    const { listTemperature } = useContext(ReadingsContext);
    const { data, error, loading } = useLoader(
        async () => listTemperature()
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