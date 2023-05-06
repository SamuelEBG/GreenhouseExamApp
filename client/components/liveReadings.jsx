import { useContext, useState, useEffect } from "react";
import { ReadingsContext } from "../lib/readingsContext";
import { MapTemperatureToGraph } from "./graphTemperature";
import { useLoader } from "../lib/useLoader";

export function DisplayLiveReadings(){
    const { listTemperature } = useContext(ReadingsContext);
    const [liveData, setLiveData] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            listTemperature().then((readings) => {
                setLiveData(readings);
            });
        }, 15000);

        return () => clearInterval(interval);
    }, [listTemperature]);

    return (
        <div>
            {liveData && <MapTemperatureToGraph readings={liveData} />}
        </div>
    );
}