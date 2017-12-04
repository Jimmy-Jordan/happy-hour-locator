<template>
<el-form v-on:submit.prevent="editBar($event, name, price)">
		
		<el-form-item label="Name:">
			<el-input v-model="name"></el-input>
		</el-form-item>
		
		<el-form-item label="Price:">
			<el-input v-model="price"></el-input>
		</el-form-item>	
			
			<el-button 
				type="primary" v-on:click="onSubmit($event, name, price)">Submit
			</el-button>
			
	</el-form>
</template>


<script>
export default {
	name: 'edit-drink',
	props:{
		drink: {type: Object, required: true}
	},
	data: function(){
		return {
			name: this.drink.name,
			price: this.drink.price

		};
	},
	methods: {
		onSubmit: function(drink, name, price){
			this.$store.dispatch("editDrink", {
				drink: this.drink,
				data: {
					name: name,
					price: price
				}
			});
			
		}
	}
};
</script>