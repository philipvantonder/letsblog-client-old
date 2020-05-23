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
					<ul class="list-group" v-if="categories.length > 0" >
						<li class="list-group-item d-flex justify-content-between align-items-center" v-for="(category, index) in categories" :key="index"> 
							<div class="category-container d-flex flex-column"> 
								<div class="category-heading cursor-pointer">
									{{ category.category.name }} <font-awesome-layers v-if="category.subcategory.length > 0" full-width class="fa-fw fa-1x py-1 category-caret"> <font-awesome-icon icon="caret-down" /> </font-awesome-layers>
								</div>

								<div v-if="category.subcategory.length > 0" class="subcategories d-none position-absolute mt-4 shadow bg-white p-3 rounded z-10">
									<ul class="list-unstyled">
										<li v-for="subcategoryItem in category.subcategory" :key="subcategoryItem.id" class="leading-loose" > {{ subcategoryItem.name }} </li>
									</ul>
								</div>
							</div>

							<div class="d-flex align-items-center">
								<button class="btn btn-secondary btn-sm" @click="editCategory(category.category.id)"> Edit </button>
								<button v-if="category.category.canRemoveCategory" class="btn btn-danger btn-sm ml-2" @click="remove(category.category.id)"> Remove </button>
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
						<div v-for="(subcategory, index) in formData.subcategoryArr" :key="subcategory.id">
							<div class="form-group d-flex flex-column">
								<div class="d-flex">
									<input type="text" v-model="subcategory.name" :class="{ 'is-invalid' : $v.$error }" class="form-control" placeholder="Subcategory name"> 
									<button class="btn btn-danger ml-2" v-if="subcategory.canRemoveSubCategory" @click="deleteSubcategory(subcategory.id, index)"> Remove </button>
								</div>
								<div class="d-flex mt-2">
									<SlugWidget @slugChanged="updateSubcategorySlug($event, index)" :url="'http://localhost:8080'" :subdirectory="'/category/'" :title="subcategory.name" :type="'category'" :id='subcategory.id' />
									<input type="hidden" v-model="subcategory.slug" />
								</div>
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
		...mapActions('category', ['setCategories', 'createCategory', 'removeCategory', 'removeSubCategory', 'setCategory', 'updateCategory']),

		async submitForm() {

			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			if (this.edit) {

				await this.updateCategory(this.formData);
				
				Alert.toast({ title: 'Category updated.', customClass: 'mt-7' });

				await this.setCategories();

				this.resetForm();

			} else {
				
				await this.createCategory(this.formData);

				Alert.toast({ title: 'New category added.', customClass: 'mt-7' });

				await this.setCategories();

				this.resetForm();

			}

		},

		updateSlug(val) {
			this.formData.categorySlug = val;
		},

		updateSubcategorySlug(val, index) {
			this.formData.subcategoryArr[index].slug = val;
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
				name: '',
				slug: '',
				canRemoveSubCategory: true
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

			let { category, subcategory } = this.getCategory[0];

			// populate edit data on the modal
			this.formData.id = category.id; // add id to the object use for updating
			this.formData.categoryName = category.name;
			this.formData.categorySlug = category.slug;

			this.formData.subcategoryArr = subcategory;

		},

		async deleteSubcategory(id, index) {
			
			if (typeof id === 'undefined') {
				this.formData.subcategoryArr.splice(index, 1);
			} else {

				const response = await Alert.confirm({ title: "Are you sure you want to remove this subCategory.", confirmButton: true });
	
				if (response) {
					
					await this.removeSubCategory(id);
				
					this.formData.subcategoryArr.splice(index, 1);

					Alert.toast({ title: 'subCategory have been removed.', customClass: 'mt-7' });

					await this.setCategories();
	
				}

			}

		},

		async remove(id) {

			const response = await Alert.confirm({ title: "Are you sure you want to remove this category.", confirmButton: true });

			if (response) {
				
				await this.removeCategory(id);
			
				Alert.toast({ title: 'Category have been removed.', customClass: 'mt-7' });

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

					name: { required }

				}

			}

		},

	}

}
</script>

<style scoped>

.category-caret {
	transition: transform 0.5s;
}

.category-heading:hover > .category-caret {
	cursor: pointer;
	transform: rotate(180deg);
}

.category-heading:hover + .subcategories {
	display: block !important;
}

</style>