const ATMDeposit = ({ onChange, isDeposit,isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <div className="row row-cols-1 row-cols-md-1 g-4">
      <div>
       <label className="label huge">
          <h4><svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16"><path  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg> {choice[Number(!isDeposit)]}</h4>
        </label>
        <div className="col">
          <input id="number-input" type="number" width="200" onChange={onChange} className="form-control"></input>
        </div>
        <div className="col">
          <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input" className="btnContact"></input>
        </div>    
      </div>
    </div>
  );
};
// =========== Account component ================
const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode , setAtmMode]=React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false); 

  let status = `Your Current Account Balance is  $ ${totalState.toLocaleString()} `;
  //console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    //console.log(`handleChange ${event.target.value}`);
    if (Number(event.target.value) <= 0) {
      return setValidTransaction(false);
    }
    if (atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) =>{
    let option = event.target.value;
    console.log("option: " + option);
    setAtmMode(option);
    setValidTransaction(false);
    if (option ==='Deposit'){
      setIsDeposit(true);
    }else {
      setIsDeposit(false);
    }
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <h4 id="total">{status}</h4>
      </div>  
      
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <label className="control-label col-sm-3">Please select an action from the dropdown to continue</label>
          <div className="col">
            <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select" className="form-select">
              <option id="no-selection" value="">Select an option</option>
              <option id="deposit-selection" value="Deposit">Deposit</option>
              <option id="cashback-selection" value="Cash Back">Cash Back</option>
            </select>
            
          </div>
        </div>
        <hr className="solid"></hr>
        
     
      {atmMode && (
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
      )}
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
