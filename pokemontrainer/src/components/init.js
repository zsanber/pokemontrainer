export default function init(nr){

    const cards=[]
    let id=0

    for(let i=1;i<nr+1;i++){
        let src=`PNG/card-poke${i}.png`
        cards.push(src)
    }
    console.log(cards)

    //dubble the card
    const cardsDouble=cards.reduce((acc,src)=>{
            acc.push({id:id++,src})
            acc.push({id:id++,src})
            return acc
    },[])

    //random sorting
    cardsDouble.sort(()=>Math.random()-0.5)

    return cardsDouble
}