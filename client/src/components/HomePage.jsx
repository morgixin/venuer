// import logo from './logo.svg';
import PlaceList from './PlaceList';
import { useState } from 'react';
import '../style/style.css';
import { usePlaces } from '../context/PlacesContext';

function HomePage(props) {
  const { placeInputData, placesData, setPlaceInputData, setPlacesData } = usePlaces();

  function setPlaceToInput(placeText) {
    setPlaceInputData(placeText);
    console.log(placeText)
  }
  
  // vai ter essa funcao na pagina mesmo?
  // function addPlaceToList() {
    // const newListPlaces = placesData;
    // newListPlaces.push(placeText);
    // setPlacesData(placeText);
  // }

  return (
    <div className="home flex">
        <header className="flex">
            <figure>
                <img alt="aau"/>
            </figure>

            <div className='flex' style={{width: "400px", height: "32px"}}>
                <label htmlFor="search-places">Encontre um lugar para alugar!</label>
                <input type="text" name="search-places" id="search-places" onChange={e => setPlaceToInput(e.target.value)}/>
            </div>
        </header>
        <div className="content">
            <h1>Welcome!</h1>
            <PlaceList />
        </div>
    </div>
  );
}

export default HomePage;