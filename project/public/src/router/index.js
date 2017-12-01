import Vue from 'vue';
import VueRouter from 'vue-router';

import DataStore from '../store/index.js';

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			name: "bars",
			path: "/",
			components: {
				"header": {"template": '<h2 class="align-center">Jimmy Rocks</h2>'},
				"aside": {"template": "<default-navbar></default-navbar>"},
				"main": {"template": "<bar-collection></bar-collection>"}
			},
			beforeEnter: function(to, from, next){
				if (DataStore.getters.getBars.length){
					next();
				} else {	
					DataStore.dispatch('loadBars').then(function(){
						next();
					});
				}
			}
		},
		{
			name: "create-bar",
			path: "/create-bar",
			components: {
				"header": {"template": '<h2 class="align-center">Jimmy Rocks</h2>'},
				"aside": {"template": "<default-navbar></default-navbar>"},
				"main": {"template": "<create-bar></create-bar>"}
			}
		},
		{
			name: "profile",
			path: "/profile",
			components: {
				"header": { "template": '<h2 class="align-center">Jimmy Rocks</h2>'},
				"aside": { "template": "<default-navbar></default-navbar>"},
				"main": { "template": "<p>Placeholder</p>" }
			}
		},
		{
			name: "bar-detail",
			path: '/bars/:id',
			component: { "template": "<bar-item></bar-item>" },
			// components: 
			// {
			// 	"header": { "template": '<h2 class="align-center">Jimmy Rocks</h2>'},
			// 	"aside": { "template": "<default-navbar></default-navbar>"},
			// 	"main": { "template": "<bar-item></bar-item>" }
			// },
			props: function(route){
				var bar = DataStore.getters.getBar(parseInt(route.params.id));
				console.log(bar);
				if (bar){
					return { "bar": bar };
				} else {
					console.log("error");
					// next({name: '404'});
					return {};
				}
			}
		},
		{
			path: '/error',
			name: '404',
			components: {
				"main": { "template": '<p>Not Found</p>' }
			}
		}
	]
});

router.beforeEach(function(to, from, next){
	if (DataStore.getters.getBars.length){
		next();
	} else {	
		DataStore.dispatch('loadBars').then(function(){
			next();
		});
	}
});


export default router;