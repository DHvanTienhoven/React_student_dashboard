import React, { useContext } from 'react';
import { AssignmentContext } from './AssignmentContext';


const Dropdown = () => {

    const [assignments, setAssignments] = useContext(AssignmentContext)

    const assignmentNames = assignments.map(item => item.assignmentName)

    const selectAssignment = e => {
        const index = e.target.value
        if (index !== "") {
            const newAssignments = [...assignments];
            newAssignments.map(item => item.checked = false);
            newAssignments[index].checked = true;
            setAssignments(newAssignments)
        }
    }

    return (
        <div className="dropdown">
            <label htmlFor="selectone">Kies één opdracht:  </label>
            <select name="select-assignment" id="selectone" onChange={e => selectAssignment(e)}>
                <option value="">--Selecteer één opdracht--</option>
                {assignmentNames.map((item, index) => {
                    return <option value={index} key={index} >{item}</option>
                })}
            </select>
        </div>
    )
}

export default Dropdown
