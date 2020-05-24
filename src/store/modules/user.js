import UserService from '@/services/user';
import JWTService from '@/services/jwt';

export default {

	namespaced: true,

	state: {
		token: localStorage.getItem('token') || false,
		loggedInUser: '',
		user: ''
	},

	mutations: {

		SET_AUTH_TOKEN(state, token) {
			state.token = token;
		},

		SET_LOGGED_IN_USER(state, user) {
			state.loggedInUser = user.name + ' ' + user.surname;
		},

		SET_USER (state, user) {
			state.user = user;
		}

	},

	getters: {

		isLoggedIn: state => !!state.token,

		loggedInUser: state => state.loggedInUser,

	},

	actions: {

		async login({ commit }, userDTO) {

			const { token } = await UserService.signIn(userDTO);

			commit('SET_AUTH_TOKEN', token);

			localStorage.setItem('token', token);

			let user = await JWTService.getUserBasicInfo(token);
			
			commit('SET_LOGGED_IN_USER', user);
			
		},

		logout({ commit }) {

			commit('SET_AUTH_TOKEN', false);
			commit('SET_LOGGED_IN_USER', '');
			commit('SET_USER', {});

		},

		async setUserDetailsFromToken({ commit, state }) {

			if (state.token) {
	
				let user = await JWTService.getUserBasicInfo(state.token);
				
				commit('SET_LOGGED_IN_USER', user);
				
			}

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