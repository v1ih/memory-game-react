import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './game.css'

const cardIcon = [
    { emoji: "🍎", matched: false },
    { emoji: "🍌", matched: false },
    { emoji: "🍒", matched: false },
    { emoji: "🍇", matched: false },
    { emoji: "🍉", matched: false },
    { emoji: "🥝", matched: false },
    { emoji: "🍍", matched: false },
    { emoji: "🍓", matched: false },
]

const Game = () => {

    const [card, setCard] = useState([])
    const [turn, setTurn] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [gameWon, setGameWon] = useState(false)

    const shuffleCards = () => {
        const shuffledCards = [...cardIcon, ...cardIcon]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))

        setCard(shuffledCards)
        setTurn(0)
        setChoiceOne(null)
        setChoiceTwo(null)
        setDisabled(false)
        setGameWon(false)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.emoji === choiceTwo.emoji) {
                setCard((prevCard) =>
                    prevCard.map((card) =>
                        card.emoji === choiceOne.emoji ? { ...card, matched: true } : card
                    )
                )
                setTimeout(() => {
                    resetTurn()
                }, 1000)
            } else {
                setTimeout(() => {
                    resetTurn()
                }, 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    useEffect(() => {
        shuffleCards()
    }, [])

    useEffect(() => {
        if (card.length > 0 && card.every((c) => c.matched)) {
            setGameWon(true)
        }
    }, [card])

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurn((prevTurn) => prevTurn + 1)
        setDisabled(false)
    }

    useState(() => {
        if (card.length && card.every(card => card.matched)) {
            setGameWon(true)
        }
    }, [card])

    return (
        <>
            <div className="header">
                <h1>Memory Game</h1>
                <button onClick={shuffleCards}>New Game</button>
                <p>
                    Turns: {turn}
                </p>
            </div>
            <div className="game">
                {
                    gameWon && (
                        <motion.div className='win_message' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} >
                            You Won! 🎉
                        </motion.div>
                    )
                }
                <div className="card_grid">
                    {
                        card.map((card) => (
                            <motion.div key={card.id} className={`card ${card.matched ? 'matched' : ''}`}
                                onClick={() => !disabled && handleChoice(card)}
                                initial={{ rotateY: 0 }}
                                animate={{ rotateY: card === choiceOne || card === choiceTwo || card.matched ? 180 : 0, }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="front">
                                    {card === choiceOne || card === choiceTwo || card.matched ? card.emoji : "❓"}
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Game