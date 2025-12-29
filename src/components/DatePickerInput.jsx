import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerInput({ label, selectedDate, onChange, id }) {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <DatePicker
                id={id}
                selected={selectedDate}
                onChange={onChange}
                dateFormat="dd/MM/yyyy"
                className="input"
            />
        </div>
    );
}

export default DatePickerInput;
