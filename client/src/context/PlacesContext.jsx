import { useContext, createContext, useState } from "react";

const PlacesContext = createContext();

const PlacesProvider = ({ children }) => {
    const [ placesData, setPlacesData ] = useState([]);
    const [ placeInputData, setPlaceInputData ] = useState("");

    // setPlacesData(["teste", "teste"])

    return (
        <PlacesContext.Provider value={{ placesData, placeInputData, setPlacesData, setPlaceInputData }}>
            { children }
        </PlacesContext.Provider>
    );
}

export default PlacesProvider;
export const usePlaces = () => {
    return useContext(PlacesContext);
}