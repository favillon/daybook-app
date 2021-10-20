export default {
    name: 'DayBook',
    component: () => import(/* webpackChunkName: "daybook" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
    children : [
        {
            path : '',
            name : 'no-entry',
            component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/daybook/views/NoEntrySelected.vue')
        },
        {
            path : ':id',
            name : 'entry',
            component: () => import(/* webpackChunkName: "daybook-entry" */ '@/modules/daybook/views/Entry.vue'),
            props: (route) => {
                return {
                    id : route.params.id
                }
            }
        }
    ]
}