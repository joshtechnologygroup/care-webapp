import React from 'react';
import { FormControl, FilledInput, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import './styles.scss';

export default function Search() {
    return (
        <div class="search-container">
            <FormControl fullWidth variant="filled">
                <FilledInput
                    id="filled-adornment-amount"
                    onChange={null}
                    disableUnderline={true}
                    placeholder="Search Patient name or ID"
                    startAdornment={<InputAdornment position="start"><SearchIcon fontSize="large" />
                    </InputAdornment>}
                />
            </FormControl>
        </div>
    )
}
