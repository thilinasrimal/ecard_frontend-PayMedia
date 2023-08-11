import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Home from "../components/Home";
import CreatorPage from "../components/Creator-Page.vue";
import CreateCard from "../components/Create-Card.vue";
import ViewerPage from "../components/Viewer-Page.vue";
import CreateCard1 from "../components/Create-Card-1.vue";
import CreateCard2 from "../components/Create-Card-2.vue";
import ImageUploadComp from "../components/Image-Upload-Comp.vue";
import AdminView from "../components/Admin-view.vue";
import Dashboard from "../components/Dashboard.vue";
import CompaniesView from "../components/Companies-view.vue";
import CreatorsView from "../components/Creators-view.vue";
import ViewersView from "../components/Viewers-view.vue";
import ActivityLogView from "../components/ActivityLog-view.vue";
import ECardEdit from "../components/ECard-Edit.vue";


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props:true
    },
    {
      path: '/viewer',
      name: 'Viewer',
      component: ViewerPage
    },
    {
      path: '/creator',
      name: 'Creator',
      component: CreatorPage
    },
    {
      path: '/create',
      name: 'create-1',
      component: CreateCard,
      props:true
    },
    {
      path: '/create-next',
      name: 'create-2',
      component: CreateCard1,
      props: true
    },
    {
      path: '/create-final',
      name: 'create-3',
      component: CreateCard2,
      props:true
    },
    {
      path:'/Admin-view',
      name:'Admin-view',
      component:AdminView,
      props:true,
      children:[
        {
          path:'/dashboard',
          name:'Dashboard',
          component: Dashboard
        }
      ]
    },

    {
      path:'/company',
      name:'Companies-view',
      component: CompaniesView
    },
    {
      path:'/creators-view',
      name:'Creators-view',
      component:CreatorsView
    },
    {
      path:'/viewers-view',
      name:'Viewers-view',
      component:ViewersView
    },
    {
      path:'/activity-log',
      name:'ActivityLog-view',
      component:ActivityLogView
    },
    {
      path:'/edit-ECard',
      name:'ECard-Edit',
      component:ECardEdit,
      props: true
    },

  ]
});
