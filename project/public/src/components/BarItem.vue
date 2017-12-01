<template>
	<div>
		<p>Name: {{bar.name}}</p> 
		<p>Location: {{bar.location}}</p>
		<router-link 
		v-bind:to="{name: 'bar', params: {id: bar.id}}">
		Detail
		</router-link>
	</div>
</template>


<script>
export default {
	name: "bar-item",
	props:{
		bar: Object
	}
};
</script>