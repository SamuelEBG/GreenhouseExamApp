import { useContext } from "react";
import { ReadingsContext } from "../lib/readingsContext";
import { MapReadings } from "./mapReadings";
import { useLoader } from "../lib/useLoader";

export function DisplayReadings(){
    const { listTemperature } = useContext(ReadingsContext);
    const {data, error, loading} = useLoader(
        async () => listTemperature()
        ,[]
    );
    console.log(data);
    if (error) {
        return <div>Error: {error.toString()}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <MapReadings readings={data}/>
        </div>
    );
}