<template>	
	<el-row>
		<el-col :offset="6" :span="12">
			<ul>
				<li 
					is="bar-item" 
					v-for="item in bars" 
					v-bind:bar="item">
				</li>
			</ul>
			<el-pagination
				v-model="current"
				:page-count="totalPages"
				:page-size="perPage"
				layout="prev, pager, next"
				v-on:current-change="currentChange"
			>
			</el-pagination>
			<!-- Issue with pagination (maybe) where if you click the bars  tab after flipping through pages, the url resorts to page NaN-->
		</el-col>
	</el-row>
</template>


<script>
export default {
	name: "bar-collection",
	data: function(){
		return {
			current: parseInt(this.$route.query.page) || 1,
			perPage: 3
		}
	},
	computed: {
		totalPages: function(){
			return Math.ceil(this.$store.getters.getBars.length  / this.perPage);
		},
		bars: function(){
			var bars, chunkStart, chunkEnd;
			bars = this.$store.getters.getBars;
			chunkStart = (this.current - 1) * this.perPage;
			chunkEnd = chunkStart + this.perPage;
			return bars.slice(chunkStart, chunkEnd);
		}
	},
	methods: {
		"currentChange": function(newPage){
			this.$set(this, "current", newPage);
		}
	},
	watch: {
		"$route": function(newRoute, oldRoute){
			this.$set(this, "current", parseInt(newRoute.query.page));
		},
		"current": function(newPage, oldPage){
			this.$router.push({"path": location.path, "query": {"page": newPage}});
		}
	}
};
</script>