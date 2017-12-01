<template>
	<div>
		<transition-group name="component-fade" mode="in-out">
			<div v-bind:key="bar.id">
				<p>Name: {{bar.name}}</p> 
				<p>Location: {{bar.location}}</p>
			</div>
			
			<edit-bar 
				v-if="mode.edit" 
				v-bind:bar="bar" 
				v-bind:key="bar.id"
				v-on:editSubmitted="mode.edit = false"
			>
			</edit-bar>
		</transition-group>
		
		<el-button-group>
			<el-button 
				active
				type="primary"
				size="small"
				icon="el-icon-edit"
				v-bind:key="bar.id"
				v-on:click="mode.edit = !mode.edit" 
			>
				{{ editMode }}
			</el-button>
			
			<el-button 
				type="primary"
				size="small"
				icon="el-icon-delete" 
				v-bind:key="bar.id"
				v-on:click="deleteBar"
			>
				Delete
			</el-button>
		</el-button-group>
	</div>
</template>

<script>
export default {
	name: 'bar-detail',
	props:{
		bar: Object
	},
	data: function(){
		return {
			mode: {
				edit: false,
				drinks: false,
			}
		}
	},
	methods: {
		deleteBar: function(bar){
			this.$store.dispatch("deleteBar", {
				bar: this.bar
			});
		}
	},	
	computed: {
		editMode: function(){
			return this.mode.edit ? "Hide":"Edit";
		}
	},
	created: function(){
		if (!this.bar){
			this.$set(this, "bar", this.$route.params.bar);
		}
	}			
};
</script>