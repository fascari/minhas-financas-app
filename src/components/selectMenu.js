import React from 'react'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (props) => {
    const options = props.lista.map((option, index) => {
        return (
            <option key={index} value={option.value}>{option.label}</option>
        )
    })

    return (
        <select {...props}  >
            {options}
        </select>
    )
}