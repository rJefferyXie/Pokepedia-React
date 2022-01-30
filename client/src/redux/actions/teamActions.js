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

export default {
    addToTeam, removeFromTeam
}