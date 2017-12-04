<template>
	<div>
		<drink-item 
			v-if="!mode.edit"
			v-bind:drink="drink"
		>
		</drink-item>

		<edit-drink 
			v-if="mode.edit"
			v-bind:drink="drink"
		>
		</edit-drink>
		<el-button 
			type="primary"
			size="mini"
			icon="el-icon-edit"
			v-bind:key="drink.id"
			v-on:click="mode.edit = !mode.edit"
		>
			{{ editMode }}
		</el-button>
	</div>
</template>


<script>
export default {
	name: 'drink-detail',
	props:{
		drink: {type: Object, required: true}
	},
	data: function(){
		return {
			mode: {
				edit: false,
			}
		}
	},
	computed: {
		editMode: function(){
			return this.mode.edit ? "Hide":"";
		},
	}
	
};
</script>