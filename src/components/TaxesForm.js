import {useState} from "react";
import Header from "./Header";
import TaxSettings from "./TaxSettings";
import Table from "./Table";
import Api from "../api/Api";
import {Message} from "semantic-ui-react";

const TaxesForm = () => {
    //Header elements
    const [selectedYear, setSelectedYear] = useState('2022_2023');
    //TaxSettings elements
    const [currency, setCurrency] = useState('ron')
    const [calculatingType, setCalculationType] = useState("zi")
    const [percentPenalty, setPercentPenalty] = useState(0.1)
    const [selectedMonths, setSelectedMonths] = useState([])
    const [lastDay, setLastDay] = useState(1)
    const [defaultValue, setDefaultValue] = useState(40)
    //Row elements
    const [budgetValues, setBudgetValues] = useState([...Array(16)].map(() => null))
    const [taxValues, setTaxValues] = useState([...Array(16)].map(() => null))
    const [erasmusValues, setErasmusValues] = useState([...Array(16)].map(() => null))
    const [exceptionsValues, setExceptionsValues] = useState([...Array(16)].map(() => null))
    //Form elements
    const [id, setId] = useState(-99)
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [allCheckboxes, setAllCheckboxes] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const existingItem = await Api.get(`/data/`, {
            params: {
                "anUniversitar": selectedYear,
                "currency": currency,
                "calculationType": calculatingType,
                "selectedMonths": selectedMonths.join(',')
            }
        }).then(response => response.data[0])

        if (existingItem) {
            handleError("An item with the same 'An curent', 'moneda', 'tip de calcul', and 'luni selectate' already exists.")
            return
        }

            await Api.post(`/data`, {
                "anUniversitar": selectedYear,
                "currency": currency,
                "calculationType": calculatingType,
                "percentPenalty": percentPenalty,
                "selectedMonths": selectedMonths,
                "lastDay": lastDay,
                "budgetValues": budgetValues,
                "taxValues": taxValues,
                "erasmusValues": erasmusValues,
                "exceptionsValues": exceptionsValues
            })
        handleSuccess("Data saved.")
    }

    const handleUpdate = async (e) => {
            if(id !== -99) {
                await Api.put(`/data/${id}`, {
                    "anUniversitar": selectedYear,
                    "currency": currency,
                    "calculationType": calculatingType,
                    "percentPenalty": percentPenalty,
                    "selectedMonths": selectedMonths,
                    "lastDay": lastDay,
                    "budgetValues": budgetValues,
                    "taxValues": taxValues,
                    "erasmusValues": erasmusValues,
                    "exceptionsValues": exceptionsValues
                })
            }
            else
            {
                handleError("Please search for an item before trying to update it. The necessary fields are: Anul curent, Moneda, Mod Calcul, Lunile")
                return
            }
            handleSuccess("Updated data")
    }

    const handleSearch = async (e) =>{
        e.preventDefault()
        await Api.get(`/data/`, {
            params: {
                "anUniversitar": selectedYear,
                "currency": currency,
                "calculationType": calculatingType,
                "selectedMonths": selectedMonths.join(',')
            }
        })
            .then(response => response.data[0])
            .then(data => {
                setBudgetValues(data.budgetValues)
                setErasmusValues(data.erasmusValues)
                setTaxValues(data.taxValues)
                setExceptionsValues(data.exceptionsValues)
                setLastDay(data.lastDay)
                setPercentPenalty(data.percentPenalty)
                setId(data.id)
            }).catch(error => handleError("The item you are searching for does not exist"))
    }

    const handleDelete = async (e) =>{
        e.preventDefault()
        await Api.delete(`/data/${id}`).then(()=> handleSuccess("Data deleted.")).catch(error => handleError("Please search for an item before trying to update it. " +
            "The necessary fields are: Anul curent, Moneda, Mod Calcul, Lunile"))
    }

    const handleError = (message) => {
        setError(message);
        setTimeout(() => {
            setError(null);
        }, 10000);
    }
    const handleSuccess = (message) => {
        setSuccess(message);
        setTimeout(() => {
            setSuccess(null);
        }, 5000);
    }

    return (
        <div className='ui segment'>
            {error && (
                <Message negative>
                    <Message.Header>Error</Message.Header>
                    <p>{error}</p>
                </Message>
            )}
            {success && (
                <Message positive>
                    <Message.Header>Success</Message.Header>
                    <p>{success}</p>
                </Message>
            )
            }
            <form className='ui form'>
                <Header setSelectedYear={setSelectedYear}/>
                <TaxSettings selectedYear={selectedYear}
                             currency={currency} setCurrency={setCurrency}
                             value={defaultValue} setValue={setDefaultValue}
                             calculatingType={calculatingType} setCalculationType={setCalculationType}
                             percentPenalty={percentPenalty} setPercentPenalty={setPercentPenalty}
                             selectedMonths={selectedMonths} setSelectedMonths={setSelectedMonths}
                             lastDay={lastDay} setLastDay={setLastDay}
                />
                <div className="ui segment">
                    <div className="ui checkbox">
                        <input
                            type="checkbox"
                            name="checkboxAll"
                            id="checkboxAll"
                            checked={allCheckboxes}
                            onChange={() => {
                                setAllCheckboxes(!allCheckboxes)
                            }}/>
                        <label htmlFor={`AllDorms`}>Selecteaza toate căminele</label>
                </div>
                </div>
                <Table defaultValue={defaultValue} allChecked={allCheckboxes}
                       budgetValues={budgetValues} setBudgetValues={setBudgetValues}
                       taxValues={taxValues} setTaxValues={setTaxValues}
                       erasmusValues={erasmusValues} setErasmusValues={setErasmusValues}
                       exceptionsValues={exceptionsValues} setExceptionsValues={setExceptionsValues}
                />
                <button className="ui primary button" onClick={handleSubmit}>
                    Save
                </button>
                <button className="ui primary button" onClick={handleSearch}>
                    Search
                </button>
                <button className="ui primary button" onClick={handleUpdate}>
                    Update
                </button>
                <button className="ui button" onClick={handleDelete}>
                    Discard
                </button>
            </form>
        </div>
    )
}

export default TaxesForm