<template>
	<el-menu
		v-model="defaultActive"
		:router="!!$router"
		mode="vertical"
	>
		<el-menu-item index="/">Bars</el-menu-item>
		<el-menu-item index="/profile">Profile</el-menu-item>
		<el-menu-item index="/create-bar">Create Bar</el-menu-item>
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