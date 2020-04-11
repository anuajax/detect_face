import React from 'react';
import './Input.css'
const Input = ({ onInputChange,onButtonSubmit }) => {
    return (
       <div>
      <p className="f3">
          {'This Smart Brain will detect faces in your image.Please put the url below.'}
      </p>
      <div className="center">
      <div className="form pa4 br3 shadow-5 center">
        <input type="text" className="f5 pa2 w-70 center" onChange={onInputChange}/>
        <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-blue" onClick={onButtonSubmit}>Detect</button>
        </div>
        </div>
       </div>
    )
}
export default Input;