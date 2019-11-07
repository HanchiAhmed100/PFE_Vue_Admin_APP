import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login.vue'
import AddAdmin from './components/Admin/AddAdmin.vue'
import Admin from './components/Admin/Admin.vue'

import Dashboard from './components/Dashboard/Dashboard.vue'
import Tabs from './components/Reservation/Tabs.vue'
import Direct from './components/Reservation/Direct.vue'
import Feedback from './components/Reservation/Feedback.vue'

import Service from './components/Service/Service.vue'
import AddService from './components/Service/AddService.vue'
import UpdateService from './components/Service/UpdateService.vue'

import Agence from './components/Agence/Agence.vue'
import AddAgence from './components/Agence/AddAgence.vue'
import UpdateAgence from './components/Agence/UpdateAgence.vue'

import Guichet from './components/Guichet/Guichet.vue'
import AddGuichet from './components/Guichet/AddGuichet.vue'
import updateGuichet from './components/Guichet/updateGuichet.vue'


Vue.use(VueRouter)


export default new VueRouter ({
  routes: [
    { path: '/', component: Login },
    { path: '/AddAdmin', component: AddAdmin },
    { path: '/Admin', component: Admin },

    { path: '/Dashboard', component: Dashboard },
    { path: '/Reservation', component: Tabs },
    { path: '/Feedback', component: Feedback },
    { path: '/Direct', component: Direct },

    
    { path: '/Service', name:' Service ' , component: Service },
    { path: '/AddService', name:' Service ➤ Ajoute ',  component: AddService },
    { path: '/UpdateService/:id', name:' Service ➤ Mise a jour ', component: UpdateService },
    
    { path: '/Agence', name:' Agence ', component: Agence },
    { path: '/AddAgence', name:' Agence ➤ Ajoute',component: AddAgence },
    { path: '/UpdateAgence/:id', name:' Agence ➤ Mise a jour ', component: UpdateAgence },

    { path: '/Guichet', name:' Guichet ', component: Guichet },
    { path: '/AddGuichet', name:' Guichet ➤ Ajoute',component: AddGuichet },
    { path: '/UpdateGuichet/:id', name:' Guichet ➤ Mise a jour ', component: updateGuichet },

  ]
})
