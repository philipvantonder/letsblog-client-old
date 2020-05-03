<template>
	<div class="container">
		<div class="row py-2">
			<div class="col">
				<h1> Categories </h1>
			</div>
		</div>

		<div class="row py-2">
			<div class="col">
				<div class="shadow p-5 radius-10 bg-white"> 
					<ul v-if="categories.length" class="list-group">
						<li class="list-group-item d-flex justify-content-between align-items-center" v-for="category in categories" :key="category._id"> 
							{{ category.name }} 
							
							<div class="d-flex align-items-center">
								<button class="btn btn-secondary btn-sm" > Edit </button>
								<button class="btn btn-danger btn-sm ml-2" @click="remove(category._id)"> Remove </button>
							</div>

						</li>
					</ul>
					<ul v-else class="list-group">
						<li class="list-group-item"> No data. </li>
					</ul>

					<div v-if="!addNew" class="mt-3">
						<button class="btn btn-primary" @click="addNew = true"> Add new category </button>
					</div>

					<div v-if="addNew" class="mt-3">
						<div class="form-group">
							<input type="text" v-model="category.name" :class="{ 'is-invalid' : $v.category.name.$error }" class="form-control" placeholder="Category name">
						</div>

						<div class="form-group">
							<SlugWidget @slugChanged="updateSlug($event)" :url="'http://localhost:8080'" :subdirectory="'/category/'" :title="category.name" :type="'category'" />
							<input type="hidden" v-model="category.slug" />
						</div>

						<div class="form-group">
							<button class="btn btn-success" @click="submitForm()"> Save </button>
							<button class="btn btn-secondary ml-1" @click="addNew = false"> Cancel </button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';

import SlugWidget from '@/components/SlugWidget.vue';
import Alert from '@/model/Alert';

export default {

	name: 'Category',

	components: {
		SlugWidget
	},

	data() {
		return  {
			addNew: false,
			category: {
				name: '',
				slug: ''
			}
		}
	},

	methods: {
		...mapActions('category', ['setCategories', 'createCategory', 'removeCategory']),

		async submitForm() {

			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			const { code } =  await this.createCategory(this.category);

			if (code === 0) {

				Alert.toast({ title: 'New category added.', customClass: 'mt-7' });

				await this.setCategories();

				this.resetAddNew();
			}

		},

		updateSlug(val) {
			this.category.slug = val;
		},

		resetAddNew() {

			this.addNew = false;
			this.category.name = '';
			this.category.slug = '';

		},

		async remove(id) {
		
			const response = await Alert.confirm({ title: "Are you sure you want to remove this category.", confirmButton: true});

			if (response) {
				
				const { code } = await this.removeCategory(id);
			
				if (code === 0) {
					Alert.toast({ title: 'Category have been removed.', customClass: 'mt-7' });
				}

			}

		}

	},

	computed: {
		...mapState('category', ['categories'])
	},

	created() {
		this.setCategories();
	},

	validations: {

		category: {

			name: { required }

		}

	}

}
</script>