import React from 'react';
import { FormControl, FilledInput, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import './styles.scss';

export default function Search({ searchPlaceholder }) {
    return (
        <div className="search-container">
            <FormControl fullWidth variant="filled">
                <FilledInput
                    id="filled-adornment-amount"
                    onChange={null}
                    disableUnderline={true}
                    placeholder={searchPlaceholder}
                    startAdornment={<InputAdornment position="start"><SearchIcon fontSize="large" />
                    </InputAdornment>}
                />
            </FormControl>
        </div>
    )
}
