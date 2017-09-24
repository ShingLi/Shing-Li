import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import search from "@/components/search"

Vue.use(Router)
export default new Router({
	mode:'history',
	routes: [
	    {
	      path: '/',
	      name: 'search',
	      component: search
	    }
	]
})
