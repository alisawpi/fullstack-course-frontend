
const filterReducer = (state = '', action) => {
    switch (action.type) {
        case ('SETFILTER'): 
            const filter = action.data.filter
            return filter
        case ('RESET'): 
            return ''
        default: return state
    }
}

export const setFilter = (filter) => {
    return {
        type: 'SETFILTER', 
        data: {filter}
    }
}

export const deleteFilter = () => {
    return {
        type: 'RESET'
    }
}

export default filterReducer