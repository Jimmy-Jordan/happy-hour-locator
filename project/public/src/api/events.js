import axios from "axios";

axios.defaults.baseURL = '/api/v0/';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


export default {
	getBars: function(){
		return axios({
			method: 'get',
			url: '/bars'
		});
	},
	getBar: function(barId){
		return axios({
			method: 'get',
			url: '/bars/' + barId
		});
	},
	getBarDrinks: function(barId){
		return axios({
			method: 'get',
			url: '/bars/' + barId + '/drinks'
		});
	},
	createBar: function(data){
		return axios({
			method: 'post',
			url: '/bars',
			data: data
		});
	},
	editBar: function(barId, data){
		return axios({
			method: 'put',
			url: '/bars/' + barId,
			data: data
		});
	},
	deleteBar: function(barId){
		return axios({
			method: 'delete',
			url: '/bars/' + barId
		});
	},
	createDrink: function(barId, data){
		data.status = STATUSES[data.status];
		return axios({
			method: 'post',
			url: '/bars/' + barId + "/drinks",
			data: data
		});
	},
	editDrink: function(drinkId, data){
		data.status = STATUSES[data.status];
		return axios({
			method: 'put',
			url: '/drinks/' + drinkId,
			data: data
		});
	}
}