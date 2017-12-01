<template>
	<el-form ref="form" v-on:submit.prevent="createBar($event, name,location)">
		<el-form-item label="Name:">
			<el-input v-model="name" placeholder="Bar Name"></el-input>
		</el-form-item>

		<el-form-item label="Location:">
			<el-input type="text" v-model="location" placeholder="Bar Location"></el-input>
		</el-form-item>
		
		<el-form-item>
			<el-button type="primary" v-on:click="onSubmit($event, name, location)">Submit Bar</el-button>
		</el-form-item>
	</el-form>
</template>


<script>
export default {
	name: 'create-bar',
	data: function(){
		return {
			name:'',
			location: ''
		};
	},
	methods:{
		onSubmit: function(bar, name, location){
			this.$store.dispatch("createBar", {
				data: {
					name: name,
					location: location
				}
			});
			this.$set(this, "name", "");
			this.$set(this, "location", "");
			
		}
	}
}
</script>