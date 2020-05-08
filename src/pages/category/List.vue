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
								<button class="btn btn-secondary btn-sm" @click="editCategory(category._id)"> Edit </button>
								<button class="btn btn-danger btn-sm ml-2" @click="remove(category._id)"> Remove </button>
							</div>

						</li>
					</ul>
					<ul v-else class="list-group">
						<li class="list-group-item"> No data. </li>
					</ul>

					<div class="mt-3">
						<button class="btn btn-primary" @click="addCategory()"> Add new category </button>
					</div>

				</div>
			</div>
		</div>

		<Modal v-show="modalIsOpen" @modalState="updateModalState($event)" :showModal="modalIsOpen" >

			<template #header>
				<h1> Add new category </h1>
			</template>
			
			<template #content>
				<div class="mt-3">
					<div class="form-group">
						<label for="categoryName" class="font-weight-bolder">Category Name</label>
						<input type="text" name="categoryName" v-model="formData.categoryName" :class="{ 'is-invalid' : $v.formData.categoryName.$error }" class="form-control" placeholder="Category name">
					</div>

					<div class="form-group">
						<label class="font-weight-bolder">Slug Name</label>
						<SlugWidget @slugChanged="updateSlug($event)" :url="'http://localhost:8080'" :subdirectory="'/category/'" :title="formData.categoryName" :type="'category'" :id='formData.id' />
						<input type="hidden" v-model="formData.categorySlug" />
					</div>

					<div v-if="formData.subcategoryArr.length > 0">
						<label for="password" class="font-weight-bolder"> Subcategories </label>
						<div v-for="(subcategory, index) in formData.subcategoryArr" :key="index">
							<div class="form-group d-flex">
								<input type="text" v-model="subcategory.subcategoryname" :class="{ 'is-invalid' : $v.$error }" class="form-control" placeholder="Subcategory name"> <button class="btn btn-danger ml-2" @click="removeSubcategory(index)"> Remove </button>
							</div>
						</div>
					</div>

					<div class="form-group">
						<button class="btn btn-success" @click="addSubcategory()"> Add Subcategory </button>
					</div>
				</div>
			</template>

			<template #footer>
				<button class="btn btn-success" @click="submitForm()"> Save </button>
				<button class="btn btn-secondary ml-1" @click="modalIsOpen = !modalIsOpen"> Close </button>
			</template>

		</Modal>

	</div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

import SlugWidget from '@/components/SlugWidget.vue';
import Alert from '@/model/Alert';
import Modal from '@/components/Modal';

export default {

	name: 'Category',

	components: {
		SlugWidget,
		Modal
	},

	data() {
		return  {

			modalIsOpen: false,

			formData: {
				id: '', // id use to update post
				categoryName: '',
				categorySlug: '',
				subcategoryArr: []
			}

		}
	},

	methods: {
		...mapActions('category', ['setCategories', 'createCategory', 'removeCategory', 'setCategory', 'updateCategory']),

		async submitForm() {

			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			if (this.edit) {

				let { code } = await this.updateCategory(this.formData);

				if (code === 0) {
				
					Alert.toast({ title: 'Category updated.', customClass: 'mt-7' });

					await this.setCategories();

					this.resetForm();
				}

			} else {
				
				let { code } = await this.createCategory(this.formData);

				if (code === 0) {
				
					Alert.toast({ title: 'New category added.', customClass: 'mt-7' });

					await this.setCategories();

					this.resetForm();
				}

			}

		},

		updateSlug(val) {
			this.formData.categorySlug = val;
		},

		updateModalState(state) {
			this.modalIsOpen = state;
		},

		resetForm() {

			this.$v.$reset();
			this.modalIsOpen = false;
			this.modalIsOpen = false;

			this.formData.categoryName = '';
			this.formData.categorySlug = '';
			this.formData.subcategoryArr = [];
		
		},

		addSubcategory() {
			
			this.formData.subcategoryArr.push({
				subcategoryname: ''
			});

		},

		addCategory() {

			this.edit = false;
			this.resetForm();
			this.modalIsOpen = true;

		},

		async editCategory(id) {

			this.edit = true;
			this.modalIsOpen = true;
			
			await this.setCategory(id);

			const category = this.getCategory;

			// populate edit data on the modal
			this.formData.id = category._id; // add id to the object use for updating
			this.formData.categoryName = category.name;
			this.formData.categorySlug = category.slug;

			let subcategoriesArr = category.subcategories.map(item => ({ subcategoryname: item }));

			this.formData.subcategoryArr = subcategoriesArr;

		},

		removeSubcategory(id) {

			this.formData.subcategoryArr.splice(id, 1)

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
		...mapState('category', ['categories', 'category']),

		...mapGetters('category', ['getCategory'])
	},

	created() {

		this.setCategories();

	},

	validations: {

		formData: {

			categoryName: { required },

			subcategoryArr : {

				$each: {

					subcategoryname: { required }

				}

			}

		},

	}

}
</script>