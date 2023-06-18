import {useEffect, useState} from "react";

const GeneralRow = (props) => {

    const {checkedBoxes, defaultValue, changedValues, setChangedValues, name} = props
    const inputsDisabled = checkedBoxes.map((box) => !box);
    const [isDisabled, setIsDisabled] = useState(true)

    const handleChecked =  (e) => {
        setIsDisabled(!isDisabled)
    }

    useEffect(() => {
        updateInputValues();
    }, [checkedBoxes, isDisabled, defaultValue]);

    const updateInputValues = () => {
        setChangedValues(changedValues.map((value, index) => inputsDisabled[index] || isDisabled ? null : defaultValue));
    };

    const handleInputChange = (index, value) => {
        setChangedValues((prevValues) => {
            const newValues = [...prevValues];
            if (inputsDisabled[index]) {
                newValues[index] = null;
            } else {
                newValues[index] = value;
            }
            return newValues;
        });
    };

    return(
        <tr>
            <td data-label="tip_taxa">
                <div className="ui checkbox">
                    <input type="checkbox" name="checkedBudget" checked={!isDisabled} onChange={handleChecked}/>
                        <label>{name}</label>
                </div>
            </td>
            {[...Array(16)].map((_, i) => (
                i !== 12 && (
                    <td key={i} data-label="valoare_taxa">
                        <div className="ui input">
                            <input
                                type="number"
                                placeholder={defaultValue}
                                disabled={inputsDisabled[i] || isDisabled}
                                value={changedValues[i]}
                                onChange={(e) => handleInputChange(i, e.target.value)}
                            />
                        </div>
                    </td>
                )))}
        </tr>
    )
}

export default GeneralRow