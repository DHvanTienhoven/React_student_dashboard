import React, { useContext } from 'react';
import { StudentContext } from './StudentContext';

const Dropdown = () => {

    const [students, setStudents] = useContext(StudentContext);
    const assignments = students[0].assignments.map(item => item.assignmentName)

    const selectAssignment = e => {
        const index = e.target.value
        if (index !== "") {
            const newStudents = [...students];
            newStudents[0].assignments.map(item => item.checked = false);
            newStudents[0].assignments[index].checked = true;
            setStudents(newStudents)
        }
    }

    return (
        <div className = "dropdown">
            <label htmlFor="selectone">Kies één opdracht:  </label>
            <select name="select-assignment" id="selectone" onChange={e => selectAssignment(e)}>
                <option value="">--Selecteer één opdracht--</option>
                {assignments.map((item, index) => {
                    return <option value={index} key ={index} >{item}</option>
                })}
            </select>
        </div>
    )
}

export default Dropdown
