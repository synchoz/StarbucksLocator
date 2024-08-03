import { useState, useEffect } from 'react';
const BASE_URL = process.env.NODE_ENV === "production" ? "/api/" : "http://localhost/api/";
import storeAPI from './api/storeAPI';
import axios from 'axios';
import './App.css'
import MapComponent from './components/MapComponent';
import SideWindowComponent from './components/SideWindowComponent';
import StarbucksLogo from './assets/images/starbucks logo.png';
function App() {
  const [countries, setCountries] = useState();
  const [centralPoint, setCentralPoint] = useState();
  const [stores, setStores] = useState();
  const [country, setCountry] = useState('All');
  const [isDropDownLoadingRes, setIsDropDownLoadingRes] = useState(false);


  const compare = (a,b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1
    } else if( nameA < nameB) {
      comparison = -1
    }

    return comparison;
  }

  useEffect(() => {
    const fetchCountries = async () => {
      setIsDropDownLoadingRes(true);
      try {
        const data = await storeAPI.getCountries(country);
        const tempdata = data.countries.map(country => ({
          name: country.name,
          value: country.code,
          centralPoint: country.centralPoint
        })).sort(compare);
        if(!countries){
          setCountries([{ name: 'All', value: 'all' }, ...tempdata]);
          setCentralPoint(data.centralPoint);
          setIsDropDownLoadingRes(false);
        }
        setStores(data.stores);
        setIsDropDownLoadingRes(false);
      } catch (err) {
        console.error('Something went wrong:', err);
      } finally {
        setIsDropDownLoadingRes(false);
      }
    };

    fetchCountries();
  }, [country])

  return (
    <div>
      <div className='navbar pl-4 pb-3 border-b-2 border-slate-300'>
        <div className='h-20'>
          <img className='h-full' src={StarbucksLogo} alt="Starbucks Logo"></img>
        </div>
      </div>
      <div className='text-[#08744c] flex flex-col md:flex-row p-8'>
          <MapComponent countries={countries} stores={stores} centralPoint={centralPoint}/>
          <SideWindowComponent 
            countries={countries} 
            country={country} 
            setCountry={setCountry} 
            setCentralPoint={setCentralPoint} 
            BASE_URL={BASE_URL} 
            isDropDownLoadingRes={isDropDownLoadingRes}/>
      </div>
    </div>
  )
}

export default App
