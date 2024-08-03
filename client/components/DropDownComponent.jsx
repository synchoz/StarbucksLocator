import SpinnerIcon from "./SpinnerIcon";

function DropDownComponent ({handleDropDownChange, countryDropDownValues, country, isDropDownLoadingRes}) {
    return(
        <div className="relative inline-block w-64 justify-center flex items-center">
            {isDropDownLoadingRes 
                ? <SpinnerIcon isDarkBG={true}/> 
                :   <div>
                        <select value={country}  onChange={handleDropDownChange} 
                            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 
                                    rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-700">
                            {countryDropDownValues.map(data => {
                                return <option key={data.value} value={data.name} centralpoint={data.centralPoint}>{data.name}</option>
                            })}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M10 3a1 1 0 0 0-.707.293l-7 7a1 1 0 0 0 1.414 1.414L10 5.414l6.293 6.293a1 1 0 0 0 1.414-1.414l-7-7A1 1 0 0 0 10 3z"/>
                            </svg>
                        </div>
                    </div>
            }

        </div>
    )
}

export default DropDownComponent;