const close = () => {
    return {
        type: "music/close"
    }
}

const open = () => {
    return {
        type: "music/open"
    }
}

export default {
    close, open
}