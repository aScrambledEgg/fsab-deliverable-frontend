'use client'
import { useEffect, useState } from "react"
import classes from "./student-table-styles.module.css"

function StudentTable() {
    // Array of students state
    const [wins, setWins] = useState([])
    // A function to get all of the students from the frontend. MAKE SURE your backend is running on port 8080!
    async function getAllWins() {
        
        // TODO: Implement the getAllStudents function, which should get all of the students from the backend
        const res = await fetch("http://localhost:8080/students", {
            method: "GET",
        })

        const resJSON = await res.json()
        setWins(resJSON);
    }

    // You can use a side effect to the page loading by entering an empty [] dependency array
    useEffect(() => {
        // TODO: call the getAllStudents function
        getAllWins();
    }, [])

    return (
        <div>
            <h2>Wins Table</h2>
            <button onClick={getAllStudents}>
                Reload
            </button>
            <br />
            <br />
            <table className={classes.table}>
                <tbody >
                    <tr className={classes.row}>
                        <th>Winner</th>
                    </tr>
                    {
                        wins.map((wins) =>
                            <tr key={wins.id} className={classes.row}>
                                <td>{wins.winner}</td>
                                
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
export default StudentTable;