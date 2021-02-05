import React, { useState, createContext } from 'react';
import studentdata from './Data/studentdata';

export const AssignmentContext = createContext();

export const AssignmentProvider = props => {
    
    const assignmentData = studentdata[0].assignments

    const [assignments, setAssignments] = useState(assignmentData)

    return (
        <AssignmentContext.Provider value={[assignments, setAssignments]}>
            {props.children}
        </AssignmentContext.Provider>
    )
};