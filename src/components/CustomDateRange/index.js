import React, {useState} from 'react';
import { DateRange } from 'react-date-range';
import './CustomDateRange.scss';


export default function CustomDateRange(props) {
    const { label, onChange } = props;
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const handleChange = (item) => {
        setState([item.selection]);
        onChange(item.selection);
    }

    return (
        <React.Fragment>
            <div className="label">
                {label}
            </div>
            <DateRange
                editableDateInputs={true}
                onChange={handleChange}
                moveRangeOnFirstSelection={false}
                ranges={state}
            />
        </React.Fragment>
    );
}
