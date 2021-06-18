import React from 'react'

function FormGroup(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}
            <br/>
        </div>
    )
}

export default FormGroup;