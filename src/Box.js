import React from 'react';

const Box = (props) => {
    const { letter, color } = props;

    return (
        <div className="box" style={{background: color}}>{letter ? letter : ' '}</div>
    )
}

export default Box;