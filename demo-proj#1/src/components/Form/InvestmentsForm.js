import styles from './InvestmentsForm.module.css';
import {useState} from "react";
const initialUserInput = {
    'current-savings': 1000,
    'yearly-contribution': 1200,
    'expected-return': 7,
    duration: 10,
}
const InvestmentsForm = (props) => {
    const [userInput, setUserInput] = useState(initialUserInput)

    const inputChangeHandler = (id, value) => {
        setUserInput((prevState) => {
            return {
                ...prevState,
                [id]:value
            }
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (Object.values(userInput).every(val => !!val)) {
            props.onCalculateData(userInput);
        } else {
            alert('Enter Data for Calculation');
        }

    }

    const resetHandler = (event) => {
        event.preventDefault();
        props.onResetData();
        setUserInput(initialUserInput);
    }


return  <form
    className={styles.form}
    onSubmit={submitHandler}
    onReset={resetHandler}>
    <div className={styles.inputGroup}>
        <p>
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input
                onChange={(event)=>inputChangeHandler('current-savings',event.target.value)}
                type="number"
                value={userInput['current-savings']}
                id="current-savings" />
        </p>
        <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input
                onChange={(event)=>inputChangeHandler('yearly-contribution',event.target.value)}
                value={userInput['yearly-contribution']}
                type="number"
                id="yearly-contribution" />
        </p>
    </div>
    <div className={styles.inputGroup}>
        <p>
            <label htmlFor="expected-return">
                Expected Interest (%, per year)
            </label>
            <input
                onChange={(event)=>inputChangeHandler('expected-return',event.target.value)}
                value={userInput['expected-return']}
                type="number"
                id="expected-return" />
        </p>
        <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input
                onChange={(event)=>inputChangeHandler('duration',event.target.value)}
                value={userInput.duration}
                type="number"
                id="duration" />
        </p>
    </div>
    <p className={styles.actions}>
        <button type="reset" className={styles.buttonAlt}>
            Reset
        </button>
        <button type="submit" className={styles.button}>
            Calculate
        </button>
    </p>
</form>
}

export default InvestmentsForm;