import UserService from '@/services/user';

export default {

	namespaced: true,

	state: {
		token: localStorage.getItem('token') || false,
		user: ''
	},

	mutations: {

		SET_AUTH_TOKEN(state, token) {
			state.token = token;
		},

		SET_USER (state, user) {
			state.user = user;
		}

	},

	getters: {

		isLoggedIn: state => !!state.token

	},

	actions: {

		async login({ commit }, userDTO) {

			const { token, user } = await UserService.signIn(userDTO);

			localStorage.setItem('token', token);

			commit('SET_AUTH_TOKEN', token);
			commit('SET_USER', user);
			
		},

		logout({ commit }) {

			commit('SET_AUTH_TOKEN', false);
			commit('SET_USER', {});

		},

		async setUser({ commit, state }) {

			if (state.token) {
				
				let { user } = await UserService.fetchUser();
				
				commit('SET_USER', user);

			}

		},

		async updateUser(context, postDTO) {

			const { user } = await UserService.update(postDTO);

			return { user };

		},

		async createUser(context, postDTO) {

			const { message } = await UserService.create(postDTO);

			return { message };

		},

		async passwordReset (context, postDTO) {
				
			const { message } = await UserService.sendPasswordReset(postDTO);

			return { message };
		
		},
		
		async changePassword(context, postDTO) {
			
			const { message } = await UserService.changePassword(postDTO);

			return { message };

		}

	}

}