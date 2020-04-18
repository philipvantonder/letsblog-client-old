<template>
	<div>
		<div class="d-flex align-items-center">
			<div>
				<font-awesome-layers full-width class="fa-fw fa-1x py-1"> <font-awesome-icon icon="link" /> </font-awesome-layers>
			</div>

			<div class="pl-2">
				<span>{{ url }}</span>
				<span>{{ subdirectory }}</span>
				<span class="slug" v-show="slug">{{ slug }}</span>
			</div>

			<div class="pl-2">
				<button class="btn btn-secondary btn-sm" @click.prevent="alert('awe');" > Edit</button>
			</div>

		</div>
	</div>
</template>

<script>

import _ from 'lodash';

export default {

	props: {

		url: {
			type: String,
			required: true
		},
		subdirectory: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		}

	},

	data() {

		return {
			slug: this.convertTitle()
		}

	},

	watch: {

		title: _.debounce(function () {
			this.slug = this.convertTitle();
		}, 250),

		slug: function(val) {
			this.$emit('slugChanged', val);
		}

	},

	methods: {

		convertTitle() {
			return this.stringToSlug(this.title);
		},

		stringToSlug (str) {
			str = str.replace(/^\s+|\s+$/g, ''); // trim
			str = str.toLowerCase();
		
			// remove accents, swap ñ for n, etc
			var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
			var to   = "aaaaaeeeeiiiioooouuuunc------";

			for (var i=0, l=from.length ; i<l ; i++) {
				str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
			}

			str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
				.replace(/\s+/g, '-') // collapse whitespace and replace by -
				.replace(/-+/g, '-'); // collapse dashes

			return str;
		}

	}

}
</script>

<style scoped>

.slug {
	background-color: #fdfd96;
	padding: 3px 5px;
}

</style>