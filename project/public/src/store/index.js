"use strict";
import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/events.js'

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: true,
	state: {
		bars: [],
	},
	mutations: {
		createBar: function(state, payload){
			state.bars.push(payload);
		},
		loadBars: function(state, payload){
			Vue.set(state, 'bars', payload.data);
		},
		loadDrinks: function(state, payload){
			Vue.set(payload.obj, 'drinks', payload.data);
		},
		editBar: function(state, payload){
			Object.assign(payload.obj, payload.data);
		},
		createDrink: function(state, payload){
			payload.obj.drinks.push(payload.data);
		},
		editDrink: function(state, payload){
			Object.assign(payload.obj, payload.data);
		},
		deleteBar: function(state, payload){
			for (let idx = 0; idx < state.bars.length; idx++){
				if (state.bars[idx].id === payload.target.id){
					state.bars.splice(idx, 1);
					return;
				}
			}
		}
	},
	actions: {
		createBar: function(context, payload){
			return new Promise(function(resolve, reject){
				api.createBar(payload.data).then(function({request,data}){
					context.commit("createBar", data);
					resolve();
				}).catch(function(){
					reject();
				});
			});
			
		},
		editBar: function(context, payload){
			return new Promise(function(resolve, reject){
				api.editBar(payload.bar.id, payload.data).then(function({request, data}){
					context.commit("editBar", {
						obj: payload.bar,
						data: data
					});
					resolve();
				}).catch(function(){
					reject();
				});
			});
		},
		deleteBar: function(context, payload){
			
			return new Promise(function(resolve, reject){
				api.deleteBar(payload.bar.id).then(function(){
					context.commit("deleteBar", {
						target: payload.bar
					});
				}).catch(function(){
					reject();
				});
			});
		},
		createDrink: function(context, payload){
			return new Promise(function(resolve, reject){
				api.createDrink(payload.bar.id, payload.data).then(function({request, data}){
					context.commit("createDrink", {
						obj: payload.bar,
						data: data
					});
					resolve(data);
				}).catch(function(){
					reject();
				});
			});	
		},
		editDrink: function(context, payload){
			return new Promise(function(resolve, reject){	
				api.editDrink(payload.drink.id, payload.data).then(function({request, data}){
					context.commit("editDrink", {
						obj: payload.drink,
						data: data
					});
					resolve(data);
				}).catch(function(){
					reject();
				});
			});	
		},
		loadBars: function(context){
			return new Promise(function(resolve, reject){			
				api.getBars().then(function({data,request}){
					context.commit("loadBars", {
						"data": data
					});
					resolve(data);
				}).catch(function(){
					reject();
				});
			});
		},
		loadDrinks: function(context, payload){
			return new Promise(function(resolve, reject){
				var drinks = api.getBarDrinks(payload.bar.id);
				drinks.then(function({data, request}){
					context.commit("loadDrinks", {
						"obj": payload.bar,
						"data": data
					});
					resolve(data);
				}).catch(function(){
					reject();
				});
			});	
		}
	},
	getters: {
		getBars: function(state, getters){
			return state.bars;
		},
		getBar: function(state, getters){
			return function(barId){
				var bars = state.bars;
				return bars.find(function(element){
					if (element.id === barId){
						return element;
					}
				})
			}
		},
		getDrink: function(state, getters){
			return function(barId, drinkId){
				var bar = getters.getBar(barId);
				if (bar){
					return bar.drinks.find(function(element){
						if (element.id === drinkId){
							return element;
						}
					});
				}
			}
		},
		getDrinks: function(state, getters){
			return function(barId){
				var bar = getters.getBar(barId);
				if (bar){
					return bar.drinks
				}
			}
		},
	}
});

export default store;