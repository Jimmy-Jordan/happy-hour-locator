<template>
	<div>
		<p>Name: {{drink.name}}</p>
		<p>Price: {{drink.price}}</p>
	</div>
</template>

<script>
export default {
	name: 'drink-item',
	props:{
		drink: {type: Object, required: true}
	}
};
</script>