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
			components: 
			{
				"header": { "template": '<h2 class="align-center">Jimmy Rocks</h2>'},
				"aside": { "template": "<default-navbar></default-navbar>"},
				"main": { 
					"template": '<bar-detail :bar="bar"></bar-detail>',
					"props": {
						"bar": {
							"required": true,
							"type": Object
						}
					} 
				}
			},
			props: {
				main: function(route){
					var bar = DataStore.getters.getBar(parseInt(route.params.id));
					if (bar){
						return {"bar":bar};
					} else{
						return {"bar": {"id": 7}};
						// Why 7??
					}
				}

			},
			// beforeEnter: function(to, from, next){
			// 	var bar = DataStore.getters.getBar(parseInt(to.params.id));
			// 	if (bar){
			// 		to.params.bar = bar;
			// 		if (!Object.hasOwnProperty.call(bar, "drinks")){
			// 			DataStore.dispatch("loadDrinks", {
			// 				bar: bar
			// 			}).then(function(){
			// 				next();
			// 			});
			// 		} else {
			// 			next();
			// 		}
			// 	} else {
			// 		console.log("error");
			// 		// next({name: '404'});
			// 	}
			// }
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