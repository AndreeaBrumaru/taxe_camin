
const Header = (props) => {
    const {setSelectedYear} = props

    const handleSelectedYear = (e) => {
        setSelectedYear(e.target.value);
    };

    return(
    <div className='ui segment'>
        <div className='ui grid' style={{margin: '3px 0px', justifyContent: 'center'}}>
            <div>
                <h1 className='ui center aligned header'>Alocare taxe cazare</h1>
            </div>
            <div>
                <select className="ui dropdown" onChange={handleSelectedYear}>
                    <option key="2022_2023" value="2022_2023">An universitar 2022-2023</option>
                    <option key="2023_2024" value="2023_2024">An universitar 2023-2024</option>
                </select>
            </div>
        </div>
    </div>
    )
}

export default Header