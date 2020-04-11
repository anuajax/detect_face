import React from 'react';
import './FaceRecogImg.css'
const FaceRecogImg = ({ imageUrl , box }) => {
    return (
       <div className="center ma">
       <div className="absolute mt2">
      <img id="inputimage" src={imageUrl} width='500px' height='auto' alt="facerecogimg"/>
      <div className="bounding-box" style={{left: box.leftCol,top: box.topRow,right: box.rightCol, bottom: box.bottomRow}}></div>
      </div>
       </div>
    )
}
export default FaceRecogImg;