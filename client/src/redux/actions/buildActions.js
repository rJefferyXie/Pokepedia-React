const toggleLegendary = () => {
    return {
        type: "build/legendary"
    }
}

const toggleMythic = () => {
    return {
        type: "build/mythic"
    }
}

const toggleTypes = () => {
    return {
        type: "build/types"
    }
}

const toggleDuplicates = () => {
    return {
        type: "build/duplicates"
    }
}

export default {
    toggleLegendary, toggleMythic, toggleTypes, toggleDuplicates
}
