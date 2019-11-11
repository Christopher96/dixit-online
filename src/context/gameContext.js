import React from "react"
import modelInstance from "data/DixitModel"

export const GameContext = React.createContext({
    model: modelInstance,
    game: null
})

