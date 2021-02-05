import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StudentContext } from './StudentContext';
import Student from './Student'
import { SortContext } from './SortContext';
import { AssignmentContext } from './AssignmentContext';


const Nav = ({ pagename }) => {

    const [students, setStudents] = useContext(StudentContext);

    const selectAllStudents = () => {
        const newStudents = [...students]
        newStudents.map(item => item.checked = true)
        setStudents(newStudents)
    };

    const [, setSort] = useContext(SortContext);

    const [assignments, setAssignments] = useContext(AssignmentContext)

    const setDefault = () => {
        const newStudents = [...students]
        newStudents.map(item => item.checked = true)
        setStudents(newStudents)
        const newAssignments = [...assignments]
        newAssignments.map(item => item.checked = true)
        setAssignments(newAssignments)
        setSort(prevState=>{
            return {...prevState, moeilijk: false, leuk: false }})
    };

    return (
        <div className="nav">
            <ul>
                {pagename && <li key="home"><Link to="/" onClick={() => setDefault()}>Home</Link></li>}
                {students.map((student, index) => <Student key={index} student={student} pagename={pagename} index={index} />)}
            </ul>
            {!pagename && <button onClick={() => selectAllStudents()}>Selecteer alle studenten</button>}
        </div>
    )
};

export default Nav
