import Vue from 'vue';
import Router from 'vue-router';

import AdminView from 'admin/AdminView';
import ProfileSubView from 'admin/subviews/ProfileSubView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/catalog',
      component: AdminView,
      children: [
        {
          path: '/profile',
          component: ProfileSubView,
        },
      ],
    }
  ]
})
