import CategoryService from '@/services/category';

export default {

	namespaced: true,

	state: {

		category: '', // single blog post category
		categories: [], // blog post categories
		linkedCategoryPosts: [] // all posts linked to a specific category

	},

	mutations: {

		SET_CATEGORIES(state, categories) {
			state.categories = categories;
		},

		REMOVE_CATEGORY(state, id) {
			let category_index = state.categories.map(({ category }) => category.id).indexOf(id);
			state.categories.splice(category_index, 1);
		},

		SET_CATEGORY(state, category) {
			state.category = category;
		},

		SET_LINKED_CATEGORIES(state, posts) {
			state.linkedCategoryPosts = posts;
		},

	},

	getters: {

		getCategory: state => state.category

	},

	actions: {

		async checkUniqueCategory (context, postDTO) {

			const { newSlug } = await CategoryService.checkUniqueCategory(postDTO);

			return { newSlug };

		},

		async setCategories({ commit }) {

			const { categories } = await CategoryService.getCategories();

			commit('SET_CATEGORIES', categories);

		},

		async createCategory (context, postDTO) {

			await CategoryService.createCategory(postDTO);

		},

		async removeCategory ({ commit }, id) {

			await CategoryService.removeCategory(id);

			commit('REMOVE_CATEGORY', id);

		},

		async removeSubCategory (context, id) {

			await CategoryService.removeCategory(id);

		},

		async setCategoryById({ commit }, id) {
				
			const { category } = await CategoryService.getCategoryById(id);

			commit('SET_CATEGORY', category);

		},

		async updateCategory(context, postDTO) {

			await CategoryService.update(postDTO);

		},

		async setCategoryBySlug({ commit }, slug) {
				
			const { posts } = await CategoryService.getCategoryBySlug(slug);

			commit('SET_LINKED_CATEGORIES', posts);

		},

	}

}