import { useState, useEffect } from 'react'
import './App.css'
import CountryDetails from './components/CountryDetails'
import CountrySearch from './components/CountrySearch'
import axios from 'axios'

export interface Country {
  name: string;
  capital: string;
  region: string;
  population: string;
  currency: string;
  flag: string;
  timezones: string;
}

export default function App() {

  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [defaultCountry, setDefaultCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const api = "https://countries-api-abhishek.vercel.app/countries";
    axios.get(api).then(response => {
      const all = response.data.data;
      const allowedRegions = ['Asia', 'Africa', 'North America', 'South America', 'Antarctica', 'Europe', 'Oceania'];
      const filtered = all.filter((country: Country) => allowedRegions.includes(country.region));
      setDefaultCountry(filtered[0]);
      setCountries(filtered);
      setLoading(false);
    });
  }, []);

  const filteredCountries = query
    ? countries.filter(country =>
        country.name.toLowerCase().startsWith(query.toLowerCase())
      )
    : defaultCountry
    ? [defaultCountry]
    : [];

  return (
    <>
      <CountrySearch query={query} setQuery={setQuery} />
      <CountryDetails countries={filteredCountries} loading={loading} />
    </>
  );
}
