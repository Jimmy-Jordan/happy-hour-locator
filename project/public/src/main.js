import Vue from 'vue';

import DataStore from './store/index.js';
import Router from './router/index.js';

import components from './components/index.js';

var app = new Vue({
	el: '#app',
	store: DataStore,
	router: Router
});