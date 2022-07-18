import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import cardBack from './PNG/card-back.png';
import init from './components/init'

const nr=10
const cards=init(nr)

//const score = 0;

function App() {

  const [flipped,setFlipped] =useState([])
  const [solved,setSolved] =useState([])
  const [disabled,setDisabled] =useState(false)

  let currentPoints = 0;
  const currentTries = document.querySelector('.currentTries')
  let best = document.querySelector('.best')
  const restartButton = document.querySelector('.restartButton')


  const currentTriesFunction = () => {
    if (currentPoints==10) {
      console.log('Winner!')
    }else return
  }

  //FLIPP
  const handleClick=(id)=>{
    setDisabled(true)
    if(flipped.length===0){
      setFlipped([parseInt(id)]);
      setDisabled(false);
    }else{
      if(flipped.includes(id))
          return
      setFlipped([...flipped,id])
      if(isMatch(id)){
        setSolved([...solved,flipped[0],id]);
        resetCards();
        currentPoints++;
      }else
        setTimeout(resetCards,500)
    }
  }

  //MATCHING
  const isMatch=(id)=>{
    const clickedCard=cards.find(obj=>obj.id===id);
    const flippedCard=cards.find(obj=>obj.id===flipped[0]);
    return clickedCard.src===flippedCard.src
  }

  //RESET CARDS
  const resetCards=()=>{
    setFlipped([]);
    setDisabled(false);
    currentPoints = 0;
  }

  //RESTART  --in progress
  /*const restart=()=>{
    score=0;
    setFlipped =[];
    setSolved =[];
    setDisabled=false;
  }*/

  return (
    <div className="bg">

      <div className="navbar row">
        <div className="btn home btn-warning p-1 px-3 m-2 mx-5">HOME</div>
        <div className="deckSize btn p-1 px-3 m-2 mx-3">DECK SIZE</div>
        <div className="btn btn-warning p-1 px-3 m-2 mx-3">START NEW GAME</div> 
      </div>

      <div className="container">
        <div className="currentResults p-2 m-2">
          <div className="currentTries text-warning p-2 m-2">CURRENT TRIES: <span className="results currentTries"></span> </div>
          <div className="best text-warning p-2 m-2">BEST:<span className="results bestResult"></span> </div>
          <div className="restartButton btn btn-warning p-1 px-3 m-2" onClick="">RESTART</div>
        </div>

        <div className="main row p-2 m-2">

          {cards.map(obj=> 
                <div className="col-2" key={obj.id} >
                  <img className="img-fluid" 
                    src={flipped.includes(obj.id) || solved.includes(obj.id) ? obj.src : cardBack} 
                    disabled={disabled || solved.includes(obj.id)}
                    onClick={()=>disabled ? null : handleClick(obj.id)}
                    alt="memorygamePics"/>
                </div>
              )}

          </div>
        </div>
    </div>
  );
}

export default App;
