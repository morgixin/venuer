// import logo from './logo.svg';
import './PlaceList';
import { useEffect } from 'react';
import '../style/style.css';
import PlacesProvider, { usePlaces } from '../context/PlacesContext';

function PlaceList() {
  const { placesData, setPlacesData } = usePlaces();
//   const [ place, setPlace ] = useState('');

    useEffect(() => {
        async function setPlacesDataList() {
            await setPlacesData(["teste", "teste", "teste"]);
        }
        setPlacesDataList();
    }, [])

  return (
    <div className="flex">
        <ul className='place-list flex'>
            {placesData.map((place, index) => (
                <li key={index} onClick={(e) => {console.log(e.target.value)}}>
                    {place}
                </li>
            ))}
        </ul>
    </div>
  );
}

export default PlaceList;