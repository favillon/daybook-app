import { createStore } from 'vuex'

import daybookModule from '../modules/daybook/store/daybook/'

// const store = createStore({
//     modules: {
//         daybookModule
//     }
// })

const store = createStore({
    modules: {
        daybookModule
    }
})


export default store