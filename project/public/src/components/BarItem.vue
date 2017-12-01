<template>
	<div>
		<p>Name: {{bar.name}}</p> 
		<p>Location: {{bar.location}}</p>
		<router-link 
		v-bind:to="{name: 'bar-detail', params: {id: bar.id}}">
		Detail
		</router-link>
	</div>
</template>


<script>
export default {
	name: "bar-item",
	props:{
		bar: Object
	},
	beforeRouteEnter (to, from, next) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
    	bar = DataStore.getters.getBar(parseInt(to.params.id));
		if (bar){
			to.params.bar = bar;
		} else {
			console.log("error");
			// next({name: '404'});
		}
	}
};
</script>