import {Checkbox, Dropdown} from "semantic-ui-react";

const TaxSettings = (props) => {
    const {selectedYear,
        setCalculationType,
        setCurrency,
        value, setValue,
        percentPenalty, setPercentPenalty,
        selectedMonths, setSelectedMonths,
        lastDay, setLastDay} = props
    const [startYear, endYear] = selectedYear.split('_');
    const months = [
        {id: 1, title: `Octombrie ${startYear}`},
        {id: 2, title: `Noiembrie ${startYear}`},
        {id: 3, title: `Decembrie ${startYear}`},
        {id: 4, title: `Ianuarie ${endYear}`},
        {id: 5, title: `Februarie ${endYear}`},
        {id: 6, title: `Martie ${endYear}`},
        {id: 7, title: `Aprilie ${endYear}`},
        {id: 8, title: `Mai ${endYear}`},
        {id: 9, title: `Iunie ${endYear}`},
        {id: 10, title: `Iulie ${endYear}`},
        {id: 11, title: `August ${endYear}`},
        {id: 12, title: `Septembrie ${endYear}`},
    ]

    const toggleSelectedMonths = (e, {label, checked}) => {
        if (checked) {
            setSelectedMonths([...selectedMonths, label]);
        } else {
            setSelectedMonths(selectedMonths.filter(el => el !== label));
        }
    };

    const handleCurrency = (e) => {
        setCurrency(e.target.value);
    };

    const handleCalculationType = (e) => {
        setCalculationType(e.target.value);
    };

    const handleValueChange = (e) => {
        setValue(e.target.value)
    }

    const handlePercentPenaltyChange = (e) => {
        setPercentPenalty(e.target.value / 100)
    }

    const handleLastDayChange = (e) => {
        setLastDay(e.target.value)
    }

    return(
        <div className='ui segment'>
            <div className='ui grid' style={{margin: '3px 0px', justifyContent: 'center'}}>
                <div>
                    <p>Moneda</p>
                    <select className="ui dropdown" onChange={handleCurrency}>
                        <option value="ron">RON</option>
                        <option value="euro">EURO</option>
                    </select>
                </div>
                <div>
                    <p>Valoare</p>
                    <div className="ui input">
                        <input type="number" min="0" placeholder="40" value={value} onChange={handleValueChange} style={{width: '5rem'}}/>
                    </div>
                </div>
                <div>
                    <p>Mod Calcul</p>
                    <select className="ui dropdown" onChange={handleCalculationType} style={{width: '17rem'}}>
                        <option value="zi">Valoarea se calculeaza pe zi</option>
                        <option value="lunar">Valoarea se calculeaza pe luna</option>
                    </select>
                </div>
                <div>
                    <p>Procent penalizare</p>
                    <div className="ui right labeled input">
                        <input type="number" min="0" placeholder="40" value={percentPenalty * 100} onChange={handlePercentPenaltyChange} style={{width: '6.2rem'}}/>
                            <div className="ui basic label">%</div>
                    </div>
                </div>
                <div>
                    <p>Lunile</p>
                        <Dropdown multiple selection fluid text={selectedMonths.map((month) => {return month + "  ";})} style={{minWidth: "20rem", maxWidth: '20em'}}>
                            <Dropdown.Menu>
                                {months.map(({id, title}) => {
                                    const isChecked = selectedMonths.includes(title)
                                    return (
                                        <Dropdown.Item key={id}>
                                            <Checkbox label={title} onChange={toggleSelectedMonths} checked={isChecked}/>
                                        </Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                </div>
                <div>
                    <p>Zi scadenta prima luna</p>
                    <div className="ui input">
                        <input type="number" max="28" min="1" placeholder="1" value={lastDay} style={{width: '10.5rem'}} onChange={handleLastDayChange}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaxSettings