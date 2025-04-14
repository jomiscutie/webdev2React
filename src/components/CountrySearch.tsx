import { useState } from 'react'

interface CountrySearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function CountrySearch({ query, setQuery}: CountrySearchProps) {

  const [input, setInput] = useState(query);
  const press = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      setQuery(input);
    }
  }

  return (
    <>
    <h1>Search For Any Country</h1>
      <div className="p-6">
        <input
          className="border-2 border-gray-700 focus:border-pink-600 rounded-full p-4"
          type="text"
          value={input}
          onKeyDown={press}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search Country"
        />
      </div>
    </>
  );
}
