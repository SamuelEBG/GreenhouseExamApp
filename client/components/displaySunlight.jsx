import React, { useContext, useState, useEffect, useCallback } from "react";
import { ReadingsContext } from "../lib/readingsContext";
import { MapSunlightToGraph } from "./graphSunlight";
import { useLoader } from "../lib/useLoader";

export function DisplaySunlight(){
    const { listSunlight } = useContext(ReadingsContext);
    const { data, error, loading } = useLoader(
        async () => listSunlight()
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
            <MapSunlightToGraph readings={data}/>
        </div>
    );
}