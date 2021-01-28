import React, { useContext } from 'react';
import { SortContext } from './SortContext';



const SortButtons = () => {

    const [sort, setSort] = useContext(SortContext);

    const sortAssignments = e => {
        switch (e.target.value) {
            case "sortstandard":
                setSort({ moeilijk: false, leuk: false })
                break;
            case "sortmoeilijk":
                setSort({ moeilijk: true, leuk: false })
                break;
            case "sortleuk":
                setSort({ moeilijk: false, leuk: true })
                break;
            default:
                setSort({ moeilijk: false, leuk: false })
        }
    };

    return (
        <div className="sortbuttons">
            <h3>Sorteer de opdrachten</h3>
            <ul>
                <li>
                    <input type="radio" id="standard"
                        name="sortchoice" value="sortstandard" defaultChecked onChange={(e) => sortAssignments(e)} />
                    <label htmlFor="standard" >Sorteer op opdrachtvolgorde</label>
                </li>
                <li>
                    <input type="radio" id="moeilijk"
                        name="sortchoice" value="sortmoeilijk" onChange={(e) => sortAssignments(e)} />
                    <label htmlFor="moeilijk">Sorteer op 'moeilijk' rating</label>
                </li>
                <li>
                    <input type="radio" id="leuk"
                        name="sortchoice" value="sortleuk" onChange={(e) => sortAssignments(e)} />
                    <label htmlFor="leuk">sorteer op 'leuk'rating</label>
                </li>
            </ul>
        </div>
    )
};

export default SortButtons
