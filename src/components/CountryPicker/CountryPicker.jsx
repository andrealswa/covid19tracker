import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import SelectSearch from 'react-select-search';

import styles from './CountryPicker.module.css';
import './selectSearch.css';

import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      setFetchedCountries(await fetchCountries());
    };

    getCountries();
  }, [setFetchedCountries]);

  let options = fetchedCountries.map((country) => ({
    name: country,
    value: country,
  }));

  options = [
    ...options,
    {
      name: 'Global',
      value: '',
    },
  ];

  return (
    <div>
      <SelectSearch
        options={options}
        defaultValue=""
        name="country"
        placeholder="Choose your country"
        autoComplete="on"
        search={true}
        onChange={(value) => handleCountryChange(value)}
      />
      <FormControl className={styles.formControl}>
        <NativeSelect
          defaultValue=""
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          <option value="">Global</option>
          {fetchedCountries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default CountryPicker;
