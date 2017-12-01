<template>
	<form v-on:submit.prevent="editBar($event, name, location)">
		<label> Name:
			<input type="text" name="name" v-model="name">
		</label>
		<label> Location:
			<input type="text" name="location" v-model="location">
		</label>	
			<button type="submit">Edit Bar</button>
			
	</form>
</template>


<script>
export default {
	name: 'edit-bar',
	props:{
		bar: Object
	},
	data: function(){
		return {
			name: this.bar.name,
			location: this.bar.location
		};
	},
	methods: {
		editBar: function(bar, name, location){
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