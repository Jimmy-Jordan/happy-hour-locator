<template>
	<el-form v-on:submit.prevent="editBar($event, name, location)">
		
		<el-form-item label="Name:">
			<el-input v-model="name"></el-input>
		</el-form-item>
		
		<el-form-item label="Location:">
			<el-input v-model="location"></el-input>
		</el-form-item>	
			
			<el-button 
				type="primary" v-on:click="onSubmit($event, name, location)">Submit
			</el-button>
			
	</el-form>
</template>


<script>
export default {
	name: 'edit-bar',
	props:{
		bar: {type: Object, required: true}
	},
	data: function(){
		return {
			name: this.bar.name,
			location: this.bar.location
		};
	},
	methods: {
		onSubmit: function(bar, name, location){
			this.$store.dispatch("editBar", {
				bar: this.bar,
				data: {
					name: name,
					location: location
				}

			});
			this.$emit("editSubmitted");
			
		}
	}
};
</script>