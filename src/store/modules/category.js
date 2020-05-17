import CategoryService from '@/services/category';

export default {

	namespaced: true,

	state: {

		category: '', // single blog post category
		categories: [] // blog post categories

	},

	mutations: {

		SET_CATEGORIES(state, categories) {
			state.categories = categories;
		},

		REMOVE_CATEGORY(state, id) {
			let category_index = state.categories.map(category => category._id).indexOf(id);
			state.categories.splice(category_index, 1);
		},

		SET_CATEGORY(state, category) {
			state.category = category;
		},

	},

	getters: {

		getCategory: state => state.category

	},

	actions: {

		async checkUniqueCategory (context, postDTO) {

			try {

				let { code, newSlug } = await CategoryService.checkUniqueCategory(postDTO);

				return { code, newSlug };

			} catch (error) {
				return { code: 1, error: error };
			}

		},

		async setCategories({ commit }) {

			try {
				
				let { code, categories } = await CategoryService.getCategories();

				if (code === 0) {
					commit('SET_CATEGORIES', categories);
				}

				return { code, categories };

			} catch (error) {
				return { code: 1, message: error };
			}

		},

		async createCategory (context, postDTO) {

			try {

				const { code, message } = await CategoryService.createCategory(postDTO);

				return { code, message };

			} catch (error) {
				return { code: 1, message: error };
			}

		},

		async removeCategory ({ commit }, id) {

			try {

				const { code } =  await CategoryService.removeCategory(id);

				if (code === 0) {
					commit('REMOVE_CATEGORY', id);
				}

				return { code };
				
			} catch (error) {
				return { code: 1, message: error };
			}

		},

		async removeSubCategory (context, id) {

			try {

				const { code } =  await CategoryService.removeCategory(id);

				return { code };
				
			} catch (error) {
				return { code: 1, message: error };
			}

		},

		async setCategory({ commit }, id) {

			try {
				
				let { code, category } = await CategoryService.getCategory(id);

				if (code === 0) {
					commit('SET_CATEGORY', category);
				}

				return { code };

			} catch (error) {
				return { code: 1, message: error };
			}

		},

		async updateCategory(context, postDTO) {

			try {
				
				let { code } = await CategoryService.update(postDTO);

				return { code };

			} catch (error) {
				return { code: 1, message: error };
			}

		}

	}

}