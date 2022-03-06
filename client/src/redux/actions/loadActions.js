const setLoaded = (loaded) => {
    return {
        type: "loaded",
        payload: { loaded }
    }
}

export default {
    setLoaded
}
