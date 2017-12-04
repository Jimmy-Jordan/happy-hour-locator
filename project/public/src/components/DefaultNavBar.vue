<template>
	<el-menu
		v-model="defaultActive"
		:router="!!$router"
		mode="horizontal"
	>
		<el-menu-item index="/?page=1">Bars</el-menu-item>
		<el-menu-item index="/profile">Map</el-menu-item>
		<el-menu-item index="/create-bar">Submit Bar</el-menu-item>
	</el-menu>
</template>



<script>
export default {
	name: "default-navbar",
	data: function(){ 
		return {
			defaultActive: null
		};
	},
	watch: {
		"$route": function(newRoute, oldRoute){
			this.$set(this, "defaultActive", newRoute.path)
		}
	}
};
</script>