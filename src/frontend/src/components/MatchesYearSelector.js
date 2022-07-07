import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import "./MatchesYearSelector.scss"


const MatchesYearSelector = ({ teamName, setDateCallback, dateYear }) => {
    const [value, setValue] = useState(new Date(dateYear));
    const startYear = process.env.REACT_APP_DATA_START_YEAR;
    const endYear = process.env.REACT_APP_DATA_END_YEAR;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                views={['year']}
                // label="Select Year"
                minDate={new Date(startYear)}
                maxDate={new Date(endYear)}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    setDateCallback(newValue.toString().split(" ")[3]);
                }}
                renderInput={(params) => <TextField {...params} helperText={null} />}
            />

        </LocalizationProvider>

    );
}

export default MatchesYearSelector;
