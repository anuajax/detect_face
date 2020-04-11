import React from 'react';
//import './Rank.css'
const Rank = ({name,entries}) => {
    return (
       <div  className=" white f3">
{name +" , your have detected "+ entries+" images yet."}
       </div>
    )
}
export default Rank;