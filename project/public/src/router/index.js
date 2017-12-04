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
				"header": {"template": "<default-navbar></default-navbar>"},
				// "aside": {"template": '<h2 class="align-center">Jimmy Rocks</h2>'},
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
				"header": {"template": "<default-navbar></default-navbar>"},
				// "aside": {"template": '<h2 class="align-center">Jimmy Rocks</h2>'},
				"main": {"template": "<create-bar></create-bar>"}
			}
		},
		{
			name: "profile",
			path: "/profile",
			components: {
				"header": { "template": "<default-navbar></default-navbar>"},
				// "aside": { "template": '<h2 class="align-center">Jimmy Rocks</h2>'},
				"main": { "template": "<p>Placeholder</p>" }
			}
		},
		{
			name: "bar-detail",
			path: '/bars/:id',
			components: 
			{
				"header": { "template": "<default-navbar></default-navbar>"},
				// "aside": { "template": '<h2 class="align-center">Jimmy Rocks</h2>'},
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
			beforeEnter: function(to, from, next){
				var __next = function(){
					var bar = DataStore.getters.getBar(parseInt(to.params.id));
					if (DataStore.getters.getDrinks(bar.id)){
						next();
					} else {	
						DataStore.dispatch('loadDrinks', {bar: bar}).then(function(){
							next();
						});
					}
				};
				if (DataStore.getters.getBars.length){
					__next();
				} else {	
					DataStore.dispatch('loadBars').then(function(){
						__next();
					});
				}
				
			},
			props: {
				main: function(route){
					var bar = DataStore.getters.getBar(parseInt(route.params.id));
					if (bar){
						return {"bar":bar};
					} else{
						return {};
						
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

// router.beforeEach(function(to, from, next){
// 	if (DataStore.getters.getBars.length){
// 		next();
// 	} else {	
// 		DataStore.dispatch('loadBars').then(function(){
// 			next();
// 		});
// 	}
// });

// Don't need the above anymore?


export default router;