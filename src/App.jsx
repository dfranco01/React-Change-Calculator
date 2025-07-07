import './App.css'
import { useState } from 'react'

function App() {
  //setting our hooks with default values and setter functions
  const [amountDue, setAmountDue] = useState('');
  const [amountReceived, setAmountReceived] = useState('');
  const [changeBreakdown, setChangeBreakdown] = useState({});
  const [changeMessage, setChangeMessage] = useState("");
  const calc = (e) => {
      //stops page from reloading
      e.preventDefault();
      //convertig string input into decimals
      const due = parseFloat(amountDue);
      const received = parseFloat(amountReceived);
      const changeAmount = received - due;
      //set message in accordance with money entered by user
      if(due > received){
        setChangeMessage(`Additional money owed is $${Math.abs(changeAmount.toFixed(2))}`);
      }
      else{
        setChangeMessage(`The total change due is $${changeAmount.toFixed(2)}`);
      }
      //calling calculateChange helper function than setter function
      const breakdown = calculateChange(changeAmount);
      setChangeBreakdown(breakdown);
    };

  return (
    <>
      {/**dividing page into 2 columns, one side for entering input, the other side for
       seeing the amount of each unit of change
       */}
      <div className='container mt-5'>
        <header>
          <h1 className='text-center'>Change Calculator</h1>
          <p className="text-muted fst-italic text-center">Easily calculate change owed with precision.</p>
        </header>
        <div className='row'>
          <div className='col-md-6 mb-4'>
            <section className='card shadow-sm'>
              <div className='card-body'>
                <form>
                  <div className='form-group mb-3'>
                    <label htmlFor="amountDue">How much is due?</label>
                    <input
                      id='amountDue'
                      data-testid='amountDue'
                      className='form-control'
                      placeholder='Enter amount'
                      type='number'
                      value={amountDue}
                      onChange={e => setAmountDue(e.target.value)}
                    />
                  </div>
                  <div className='form-group mb-3'>
                    <label htmlFor="amountReceived">How much is given?</label>
                    <input
                      id='amountReceived'
                      data-testid='amountReceived'
                      className='form-control'
                      placeholder='Enter amount'
                      type='number'
                      value={amountReceived}
                      onChange={e => setAmountReceived(e.target.value)}
                    />
                  </div>
                  <button 
                    className="btn btn-primary" 
                    data-testid='calculate'
                    onClick={calc}>
                    Calculate
                  </button>
                </form>
                <p>{changeMessage}</p>
              </div>
            </section>
          </div>
          <div className='col-md-6 mb-4'>
            <section className='card shadow-sm h-100'>
              <div className='card-body'>
                <h3 className='card-title'>Change</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Twenties</span><span data-testid="twenties">{changeBreakdown.twenties || 0}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Tens</span><span data-testid="tens">{changeBreakdown.tens || 0}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Fives</span><span data-testid="fives">{changeBreakdown.fives || 0}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Ones</span><span data-testid="ones">{changeBreakdown.ones || 0}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Quarters</span><span data-testid="quarters">{changeBreakdown.quarters || 0}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Dimes</span><span data-testid="dimes">{changeBreakdown.dimes || 0}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Nickels</span><span data-testid="nickels">{changeBreakdown.nickels || 0}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Pennies</span><span data-testid="pennies">{changeBreakdown.pennies || 0}</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

function calculateChange(amount) {
  const denominations = [
    { name: 'twenties', value: 2000 },
    { name: 'tens', value: 1000 },
    { name: 'fives', value: 500 },
    { name: 'ones', value: 100 },
    { name: 'quarters', value: 25 },
    { name: 'dimes', value: 10 },
    { name: 'nickels', value: 5 },
    { name: 'pennies', value: 1 }
  ];

  // Convert dollars to cents to avoid floating point issues
  let remaining = Math.round(amount * 100);
  const result = {};

  for (const denom of denominations) {
    result[denom.name] = Math.floor(remaining / denom.value);
    remaining %= denom.value;
  }
  console.log(result);
  return result;
}


export default App
