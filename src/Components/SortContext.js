
import React, { useState, createContext } from 'react';

export const SortContext = createContext();

export const SortProvider = props => {

    const [sort, setSort] = useState({ moeilijk: false, leuk: false })

    return (
        <SortContext.Provider value={[sort, setSort]}>
            {props.children}
        </SortContext.Provider>
    )
};