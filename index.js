let deckId
const newDeck = document.getElementById('new-deck')
const drawCards = document.getElementById('draw-cards')
const imagesEl = document.getElementById('card-images')
const remainingCards = document.getElementById('remaining-cards')
let computer = 0
let me = 0

newDeck.addEventListener('click',async()=>{
    const res = await fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    const data = await res.json()
    deckId = data.deck_id
})

drawCards.addEventListener('click',async()=>{
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    document.getElementById("cards").children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            document.getElementById("cards").children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
            remainingCards.textContent = `Remaining cards:${data.remaining}`
            compareCards(data.cards[0].value, data.cards[1].value)
    if(data.remaining === 0){
         drawCards.disabled = true
         if(computer>me){
            document.getElementById('display-winner').textContent = "Computer Won !!!"
         }else if(me>computer){
            document.getElementById('display-winner').textContent = "You Won !!!"
         }else{
            document.getElementById('display-winner').textContent = "Game Tied"
         }
         
    }
})

function compareCards(card1, card2){
    
    if(card1 === "JACK"){
        card1 = 10
    }else if(card1 === "QUEEN"){
        card1 = 11
    }else if(card1 === "KING"){
        card1 = 12
    }else if(card1 === "ACE"){
        card1 = 13
    }else{
        card1 = Number(card1)
    }
    if(card2 === "JACK"){
        card2 = 10
    }else if(card2 === "QUEEN"){
        card2 = 11
    }else if(card2 === "KING"){
        card2 = 12
    }else if(card2 === "ACE"){
        card2 = 13
    }else{
        card2 = Number(card2)
    }
    if(card1>card2){
        computer++
        document.getElementById('computer').textContent =`Computer:${computer}`
    }else if(card2>card1){
        me++
        document.getElementById('me').textContent =`Me:${me}`
    }else{
        console.log("its a tie")
    }
}







/* Docs for original Deck of Cards API: https://deckofcardsapi.com/#draw-card
 * BaseUrl you'll use: https://apis.scrimba.com/deckofcards/api/deck/
 * (that will replace the base url of https://deckofcardsapi.com/api/deck/)
 * that you'll see in the deck of cards API docs.
 */