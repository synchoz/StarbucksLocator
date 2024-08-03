import { useState, useEffect } from "react";
import DropDownComponent from "./DropDownComponent";
import storeAPI from "../api/storeAPI";
import SpinnerIcon from "./SpinnerIcon";

function SideWindowComponent({countries, setCountry, country, setCentralPoint, isDropDownLoadingRes}) {
    const [countryDropDownValues, setCountryDropDownValues] = useState([]);
    const [alpha3code, setAlpha3code] = useState("");
    const [longtitude, setLongtitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [resultMsg, setResultMsg] = useState("TEST");
    const [isResponse, setIsResponse] = useState(false);
    const [isloadingSubmitRes, setIsLoadingSubmitRes] = useState(false);


    useEffect(() => {
        if(countries) {
            setCountryDropDownValues(countries);
        }
    }, [countries])

    const handleVerify = async () => {
        setResultMsg("");
        setIsLoadingSubmitRes(true);
        if(alpha3code.length > 0 & latitude.length > 0 & longtitude.length > 0) {
            const data = await storeAPI.verifyStore(alpha3code,latitude,longtitude);
            setResultMsg(data.msg);
            setIsResponse(true);
        }

        setIsLoadingSubmitRes(false);
    }

    const handleDropDownChange = (e)=> {
        setCountry(e.target.value);
        const currcentralPoint = countries.find(country => country.name === e.target.value);
        console.log(currcentralPoint);
        setCentralPoint(currcentralPoint.centralPoint);
    }
    return(
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-4 bg-white"> 
            <div className="mb-6 border-b-2 border-green-700">
                <div className="mb-40 flex-col justify-center flex items-center">
                    <div className="text-2xl font-semibold mb-3">Choose a Country:</div>
                    <DropDownComponent 
                        handleDropDownChange={handleDropDownChange} 
                        countryDropDownValues={countryDropDownValues}
                        country={country}
                        isDropDownLoadingRes={isDropDownLoadingRes}
                    />
                </div>
            </div>
            <div className="space-y-4">
            <div className="text-2xl font-semibold mb-6">Verify a Store:</div>
                <div className="flex">
                    <div className="w-1/2">
                        <label htmlFor="longtitude" className="block text-2xl font-medium mb-3">Longtitude</label>
                        <input id="longtitude" type="number" onChange={(e) => setLongtitude(e.target.value)}
                            className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700" value={longtitude}></input>
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="latitude" className="block text-2xl font-medium mb-3">Latitude</label>
                        <input id="latitude" type="number" onChange={(e) => setLatitude(e.target.value)}
                            className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700" value={latitude}></input>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-3/4">
                        <label htmlFor="countrycode" className=" block text-2xl font-medium mb-3">Country Code</label>
                        <input maxLength="3" id="countrycode" value={alpha3code} onChange={(e) => setAlpha3code(e.target.value)}
                            className="uppercase w-3/12 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 text-center w-16"></input>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <button onClick={handleVerify} className={
                        isloadingSubmitRes 
                        ? "flex border-green-700 bg-green-600 text-white px-4 py-2 rounded shadow rounded-xl mb-2 focus:outline-none"
                        : "flex border-green-700 text-green-700 px-4 py-2 rounded shadow hover:text-white rounded-xl hover:bg-green-600 mb-2 focus:outline-none"}>
                    <span className="mr-2">Submit</span>
                        {isloadingSubmitRes && <SpinnerIcon/> }
                        
                    </button>

                </div>
                {isResponse && <div className="text-xl font-medium">{resultMsg}</div>}
            </div>
        </div>
        
    )
}

export default SideWindowComponent;