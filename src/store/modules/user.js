import UserService from '@/services/user';
import JWTService from '@/services/jwt';
import Alert from '@/model/Alert';

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

			try {

				let response = await UserService.signIn(userDTO);
				
				let { code, message, token } = response.data 
				
				if (code === 0) {

					commit('SET_AUTH_TOKEN', token);

					localStorage.setItem('token', token);
				
				}

				if (code === 1) {

					Alert.message({
						icon: 'error',
						title: 'Login failed', 
						text: message,
						confirmBtnText: 'Try again',
						confirmButton: true
					});

				}

				return { code };

			} catch (error) {
				return { code: 1, error };
			}

		},

		logout({ commit }) {
			commit('SET_AUTH_TOKEN', false);
		},

		async setUserDetailsFromToken({ commit, state }) {

			try {

				if (state.token) {
		
					let user = await JWTService.getUserBasicInfo(state.token);
					
					commit('SET_LOGGED_IN_USER', user);
					
				}

			} catch (error) {
				return { code: 1, error: error };
			}

		},

		async setUser({ commit }) {

			try {

				let { code, user } = await UserService.fetchUser();

				if (code === 0) {
					commit('SET_USER', user);
				}

				return { code };

			} catch (error) {
				return { code: 1, error: error };
			}

		},

		async updateUser(context, postDTO) {

			try {

				const { code, user } = await UserService.update(postDTO);

				return { code, user };

			} catch (error) {
				return { code: 1, error: error };
			}

		}

	}

}