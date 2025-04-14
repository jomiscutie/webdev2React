import { useState } from "react";
import { Country } from "../App";

export interface CountryDetailsProps {
  countries: Country[];
  loading: boolean;
}

export default function CountryDetails({
  countries,
  loading,
}: CountryDetailsProps) {
  if (loading) {
    return <h2>Fetching...</h2>;
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {countries.length > 0 ? (
        countries.map((country, index) => (
          <div className="columns-2 border rounded-md p-3 m-2 " key={index}>
            <div>
              <img
                className="flag-size max-w-sm w-auto rounded-lg"
                src={country.flag}
              />
            </div>
            <div className="p-8 font-sans text-xl">
              <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-white-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setIsOpen(!isOpen)}
              >
                {country.name}
              </button>

              {isOpen && (
                <div
                  className="m-2 p-2 min-w-64 border border-gray-300 rounded-md shadow-lg z-10 text-white text-sm justify-center content-center"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div>
                    <ul>
                      <li>{country.capital}</li>
                      <li>{country.region}</li>
                      <li>{country.population}</li>
                      <li>{country.currency}</li>
                      <li>{country.timezones}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <h5 className="not-found">Country Not Found!</h5>
      )}
    </>
  );
}

//<img className="flag-size" src={country.flag}/>
/*
<ul className="no-bullets">
                    {countries.length > 0 ? (
                        countries.map((country, index) => (
                            <li key={index}>{country.name} <img className="flag-size" src={country.flag}/></li>
                            
                        ))
                    ) : (<h5>Country Not Found!</h5>)}
                </ul>
*/
