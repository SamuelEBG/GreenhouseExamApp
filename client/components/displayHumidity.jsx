import React, { useContext, useState, useEffect, useCallback } from "react";
import { ReadingsContext } from "../lib/readingsContext";
import { MapHumidityToGraph } from "./graphHumidity";
import { useLoader } from "../lib/useLoader";

export function DisplayHumidity(props){
    const { listHumidityById } = useContext(ReadingsContext);
    const { data, error, loading } = useLoader(
        async () => listHumidityById(props.greenhouseId)
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
            <MapHumidityToGraph readings={data}/>
        </div>
    );
}