import React, { forwardRef, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReactDatePicker = ({isRangeSearch}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
        <>
            <DatePicker
                dateFormat='yyyy/MM/dd'
                shouldCloseOnSelect
                selected={startDate}
                selectsStart
                minDate={new Date()}
                onChange={(date) => setStartDate(date)}
            />
            {
                isRangeSearch && (
                    <React.Fragment>
                        <DatePicker
                            dateFormat='yyyy/MM/dd'
                            shouldCloseOnSelect
                            selected={endDate}
                            selectsStart
                            minDate={new Date()}
                            onChange={(date) => setEndDate(date)}
                        />
                    </React.Fragment>
                )
            }
        </>
    );
};

export default ReactDatePicker;