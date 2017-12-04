<template>
	<el-form ref="form" v-on:submit.prevent="createDrink($event, name,price)">
		<el-form-item label="Name:">
			<el-input v-model="name" placeholder="Drink Name"></el-input>
		</el-form-item>

		<el-form-item label="Price:">
			<el-input type="text" v-model="price" placeholder="Drink Price"></el-input>
		</el-form-item>
		
		<el-form-item>
			<el-button type="primary" v-on:click="onSubmit($event, name, price)">Submit Bar</el-button>
		</el-form-item>
	</el-form>
</template>


<script>
export default {
	name: 'create-drink',
	props:{
		bar: {type: Object, required: true}
	},
	data: function(){
		return {
			name:'',
			price: ''
		};
	},
	methods:{
		createDrink: function(bar, name, price){
			this.$store.dispatch("createDrink", {
				bar: this.bar,
				data: {
					name: name,
					price: price
				}
			});
			this.$set(this, "name", "");
			this.$set(this, "price", "");
		}
	}
};
</script>