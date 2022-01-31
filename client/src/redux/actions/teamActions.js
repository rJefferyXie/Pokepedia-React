const addToTeam = (pokemon) => {
    return {
        type: "team/add", 
        payload: { pokemon }
    }
}

const removeFromTeam = (pokemon) => {
    return {
        type: "team/remove", 
        payload: { pokemon }
    }
}

const clearTeam = () => {
    return {
        type: "team/clear"
    }
}

export default {
    addToTeam, removeFromTeam, clearTeam
}