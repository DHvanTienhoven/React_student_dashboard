
import React, { useState, createContext } from 'react';

export const SortContext = createContext();

export const SortProvider = props => {

    const [sorting, setSorting] = useState({ moeilijk: false, leuk: false })

    return (
        <SortContext.Provider value={[sorting, setSorting]}>
            {props.children}
        </SortContext.Provider>
    )
};