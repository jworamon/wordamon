import React from 'react';
import Box from './Box';

const Row = (props) => {
    const { word, colors } = props;
    return (
        <div className="row">
            <Box letter={word ? word[0] : ''} color={colors ? colors[0] : ''} />
            <Box letter={word ? word[1] : ''} color={colors ? colors[1] : ''} />
            <Box letter={word ? word[2] : ''} color={colors ? colors[2] : ''} />
            <Box letter={word ? word[3] : ''} color={colors ? colors[3] : ''} />
            <Box letter={word ? word[4] : ''} color={colors ? colors[4] : ''} />
        </div>
    )
}

export default Row;