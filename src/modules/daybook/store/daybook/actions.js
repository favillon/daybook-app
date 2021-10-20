import dayBookApi from '@/api/daybookApi';

// export const myAction = async ({ commit }) => {

// }

export const loadEntry = async ({ commit }) => {
    const {data} = await dayBookApi.get('entries.json')
    const entries = []

    if (!data) {
        commit('setEntries', entries)
        return
    }

    for (let id of Object.keys(data)) {
        entries.push({
            id, 
            ...data[id]
        })
    }

    commit('setEntries', entries)

}
export const updateEntry = async ({ commit }, entry) => {
    
    const { date, picture, text} = entry
    const dataSave = { date, picture, text}
    
    await dayBookApi.put(`entries/${entry.id}.json`, dataSave)

    commit('updateEntry', {...entry})

}

export const createEntry = async ({ commit }, entry) => {

    const { date, picture, text} = entry
    const dataSave = { date, picture, text}

    const {data} = await dayBookApi.post(`entries.json`, dataSave)
    
    dataSave.id = data.name    
    commit('addEntry', dataSave)

    return dataSave.id
}

export const deleteEntry = async ({ commit }, id) => {

    await dayBookApi.delete(`entries/${id}.json`)
    
    commit('deleteEntry', id)
    return id
}