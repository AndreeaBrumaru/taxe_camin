import {useEffect, useState} from "react";
import GeneralRow from "./GeneralRow";

const Table = (props) =>
{
    const {defaultValue, budgetValues, setBudgetValues, taxValues, setTaxValues, erasmusValues, setErasmusValues,
        exceptionsValues, setExceptionsValues, allChecked}= props
    const [checkedBoxes, setCheckedBoxes] = useState(Array(16).fill(false));

    useEffect(() => {
        setCheckedBoxes(Array(16).fill(allChecked))
    }, [allChecked])

    const handleCheckboxChange = (index) => {
        const newCheckedBoxes = [...checkedBoxes];
        newCheckedBoxes[index] = !newCheckedBoxes[index];
        setCheckedBoxes(newCheckedBoxes);
    };

    // const [rows, setRows] = useState([]);
    // const handleAddRow = () => {
    //     if(rows.length < 4)
    //         setRows([...rows, { id: Date.now() }]);
    // };
    //
    // const handleDeleteRow = (id) => {
    //     setRows(rows.filter((row) => row.id !== id));
    // };

    return (
        <div className='ui segment' style={{ overflowX: 'scroll'}}>
            <table className="ui celled table">
                <thead>
                <tr>
                    <th className='single line'>Taxa pe camin</th>
                    {[...Array(16)].map((_, i) => (
                        // Verifica daca caminul e cu numarul 13, daca e atunci sare peste el
                        i !== 12 && (
                            <th key={i} className='single line'>
                                <div className="ui checkbox">
                                    <input
                                        type="checkbox"
                                        name={`checkbox-${i+1}`}
                                        id={`checkbox-${i+1}`}
                                        checked={checkedBoxes[i]}
                                        onChange={() => handleCheckboxChange(i)}/>
                                    <label htmlFor={`camin-${i+1}`}>Caminul {i+1}</label>
                                </div>
                            </th>
                        )
                    ))}
                    {/*<th/>*/}
                </tr>
                </thead>
                <tbody>
                <GeneralRow
                    checkedBoxes={checkedBoxes}
                    defaultValue={defaultValue}
                    changedValues={budgetValues}
                    setChangedValues={setBudgetValues}
                    name="Buget"
                />
                <GeneralRow
                    checkedBoxes={checkedBoxes}
                    defaultValue={defaultValue}
                    changedValues={taxValues}
                    setChangedValues={setTaxValues}
                    name="Taxa"
                />
                <GeneralRow
                    checkedBoxes={checkedBoxes}
                    defaultValue={defaultValue}
                    changedValues={erasmusValues}
                    setChangedValues={setErasmusValues}
                    name="Erasmus"
                />
                <GeneralRow
                    checkedBoxes={checkedBoxes}
                    defaultValue={defaultValue}
                    changedValues={exceptionsValues}
                    setChangedValues={setExceptionsValues}
                    name="Exceptii"
                />
                {/*{rows.map((row) => (*/}
                {/*    <GlobalTaxRow*/}
                {/*        key={row.id}*/}
                {/*        checkedBoxes={checkedBoxes}*/}
                {/*        defaultValue={defaultValue}*/}
                {/*        dormValues={dormValues}*/}
                {/*        setDormValues={setDormValues}*/}
                {/*        saveButton={saveButton}*/}
                {/*        onDelete={() => handleDeleteRow(row.id)}*/}
                {/*    />*/}
                {/*))}*/}
                </tbody>
            </table>
            {/*<button className='ui button' style={{  margin: '10px'}} onClick={handleAddRow} disabled={rows.length >= 4}>*/}
            {/*    Add new row +*/}
            {/*</button>*/}
        </div>
    )
}

export default Table