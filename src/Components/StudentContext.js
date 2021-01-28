
import React, { useState, createContext } from 'react';
import studentdata from './Data/studentdata';

export const StudentContext = createContext();

export const StudentProvider = props => {

    const [students, setStudents] = useState(studentdata)

    return (
        <StudentContext.Provider value={[students, setStudents]}>
            {props.children}
        </StudentContext.Provider>
    )
};


