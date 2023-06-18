// import {useEffect, useState} from "react";
//
// const GlobalTaxRow = (props) => {
//
//     const {checkedBoxes, defaultValue, onDelete, saveButton, dormValues, setDormValues} = props
//     const inputsDisabled = checkedBoxes.map((box) => !box);
//     const [inputValues, setInputValues] = useState([...Array(16)].map(() => null));
//     const [taxType, setTaxType] = useState("buget");
//     const [rowValues, setRowValues] = useState({})
//
//
//     useEffect(() => {
//         saveInputs();
//     }, [inputValues, taxType]);
//
//     useEffect(() => {
//         updateInputValues();
//     }, [checkedBoxes, defaultValue]);
//
//     useEffect(() => {
//         setDormValues((prevDormValues) => prevDormValues ? [...prevDormValues, rowValues] : prevDormValues)
//         console.log(dormValues)
//         debugger
//     }, [saveButton]);
//
//     const handleTaxType = (e) => {
//         setTaxType(e.target.value);
//     };
//     console.log(dormValues)
//     const updateInputValues = () => {
//         setInputValues(inputValues.map((value, index) => inputsDisabled[index] ? null : defaultValue));
//     };
//
//     const handleInputChange = (index, value) => {
//         setInputValues((prevValues) => {
//             const newValues = [...prevValues];
//             if (inputsDisabled[index]) {
//                 newValues[index] = null;
//             } else {
//                 newValues[index] = value;
//             }
//             return newValues;
//         });
//     };
//
//     const saveInputs = () => {
//         setRowValues({
//             taxType,
//             inputValues: inputValues.map((value, index) => {
//                 if (inputsDisabled[index]) {
//                     return null;
//                 } else {
//                     return value;
//                 }
//             })
//         })
//     };
//
//     return(
//         <tr>
//             <td data-label="tip_taxa">
//                 <select className="ui dropdown" onChange={handleTaxType}>
//                     <option value="buget">Buget</option>
//                     <option value="taxa">Taxa</option>
//                     <option value="erasmus">Erasmus</option>
//                     <option value="exceptii">Exceptii</option>
//                 </select>
//             </td>
//             {[...Array(16)].map((_, i) => (
//                 i !== 12 && (
//                 <td key={i} data-label="valoare_taxa">
//                     <div className="ui input">
//                         <input
//                             type="text"
//                             placeholder={defaultValue}
//                             disabled={inputsDisabled[i]}
//                             value={inputValues[i]}
//                             onChange={(e) => handleInputChange(i, e.target.value)}
//                         />
//                     </div>
//                 </td>
//                 )))}
//             <td>
//                 <button className="circular ui icon button" onClick={onDelete}>
//                     <i className="x icon"></i>
//                 </button>
//             </td>
//         </tr>
//     )
// }
//
// export default GlobalTaxRow