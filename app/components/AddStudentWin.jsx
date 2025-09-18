'use client'
import { useState } from "react"
import classes from "./new-student-form-styles.module.css";




function AddStudentWin(player){
    async function onSubmit() {
        // TODO: Implement the onSubmit function, which should post the new student to the backend
        const newStudentBody = {
            winner
        }
        const res = await fetch("http://localhost:8080/students", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newStudentBody)
        })
    }
    // NOTE: this is not the best way to collect data, but is good for demo purposes!
    const [winner, setWinner] = useState("")
   

    return (
        <div>
            <h3>Record Name and Reset</h3>
            <button onClick={onSubmit}>Submit</button>
            <h4>Main Info</h4>
            <div className={classes.mainForm}>
                <div>
                    <label htmlFor="winner">Winner: </label>
                    <input
                        name="winner"
                        value={winner}
                        onChange={(event) => setWinner(event.target.value)}
                    />
                </div>
                
            </div>
            
        </div>
    )
}
