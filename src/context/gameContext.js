import React from "react"

const GameContext = React.createContext({})

export const GameProvider = GameContext.Provider
export const GameConsumer = GameContext.Consumer
export default GameContext

