<template>
	<div class="d-flex align-items-center">
		<div>
			<font-awesome-layers full-width class="fa-fw fa-1x py-1"> <font-awesome-icon icon="link" /> </font-awesome-layers>
		</div>

		<div class="pl-2 d-flex align-items-center">
			<span>{{ url }}</span>
			<span>{{ subdirectory }}</span>
			<span class="slug" v-show="slug && !isEditMode">{{ slug }}</span>
			<div v-show="isEditMode" class="ml-2">
				<input type="text" name="slug-edit" class="form-control" v-model="customSlug">
			</div>
		</div>

		<div class="pl-2">
			<button class="btn btn-secondary" @click.prevent="editSlug()" > Edit </button>
			<button class="btn btn-danger ml-2" @click.prevent="resetSlug()" v-show="isEditMode" > Reset </button>
			<button class="btn btn-primary ml-2" @click.prevent="saveSlug()" v-show="isEditMode"> Save </button>
		</div>

	</div>
</template>

<script>

import _debounce from 'lodash.debounce';
import { mapActions } from 'vuex';

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
		},

		id: {
			type: String,
			required: false,
		},
		type: {
			type: String,
			required: false,
			default: ''
		}

	},

	data() {

		return {
			slug: this.setSlug(this.title),
			isEditMode: false,
			customSlug: '',
			wasEdited: false
		}

	},

	watch: {

		title: _debounce(function () {
			
			if (!this.wasEdited) {
				this.setSlug(this.title);
			}

		}, 250),

	},

	methods: {

		...mapActions('Posts', ['checkUnique']),

		editSlug() {

			this.customSlug = this.slug;
			this.isEditMode = true;

		},

		saveSlug() {

			// if a custom slug has been editted, lock the change
			if (this.customSlug !== this.slug) {
				this.wasEdited = true;
			}

			this.setSlug(this.customSlug);
			this.isEditMode = false;

		},

		resetSlug() {

			this.setSlug(this.title);
			this.wasEdited = false;
			this.isEditMode = false;

		},

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
		},

		async setSlug(newVal) {

			const slug = this.stringToSlug(newVal);

			let id = false;
			if (this.id) {
				id = this.id;
			}

			if (this.type != '' && this.type === 'category') {

				if (slug != '') {

					const { newSlug } = await this.$store.dispatch('Category/checkUniqueCategory', { slug, id });

					this.slug = newSlug;
					this.$emit('slugChanged', newSlug);
				
				} else {

					await '';
					
					this.slug = '';
					this.$emit('slugChanged', '');

				}

			} else {
				
				const { newSlug } = await this.checkUnique({ slug, id });

				this.slug = newSlug;
				this.$emit('slugChanged', newSlug);

			}

		}

	}

}
</script>