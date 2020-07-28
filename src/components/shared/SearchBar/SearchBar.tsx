import React, { useState, memo } from 'react';

interface SearchBarProps {
  onChange: (value: string) => void;
  placeholder: string;
}

const SearchBar = memo(({ onChange, placeholder}: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onChange(e.target.value);
  };

  return(
    <input
      value={query}
      onChange={onQueryChange}
      placeholder={placeholder}
    />
  );
});

export default SearchBar;