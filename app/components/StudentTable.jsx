'use client'
import { useEffect, useState } from "react"
import classes from "./student-table-styles.module.css"

function StudentTable() {
    // Array of students state
    const [students, setStudents] = useState([])
    // A function to get all of the students from the frontend. MAKE SURE your backend is running on port 8080!
    async function getAllStudents() {
        // TODO: Implement the getAllStudents function, which should get all of the students from the backend
    }

    // You can use a side effect to the page loading by entering an empty [] dependency array
    useEffect(() => {
        // TODO: call the getAllStudents function
    }, [])

    return (
        <div>
            <h2>Students Table</h2>
            <button onClick={getAllStudents}>
                Reload
            </button>
            <br />
            <br />
            <table className={classes.table}>
                <tbody >
                    <tr className={classes.row}>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Class Year</th>
                        <th>Concentrations</th>
                    </tr>
                    {
                        students.map((student) =>
                            <tr key={student.id} className={classes.row}>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.classYear}</td>
                                <td>{student.concentrations.join(", ")}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
export default StudentTable;