import UserService from '@/services/user';
import Alert from '@/model/Alert';

export default {

	namespaced: true,

	state: {
		token: localStorage.getItem('token') || false
	},

	mutations: {

		SET_AUTH(state, token) {
			state.token = token;
		}

	},

	getters: {
		isLoggedIn: state => !!state.token,
	},

	actions: {

		async login({ commit }, user) {

			try {

				let response = await UserService.signIn(user);
				
				let { code, message, token } = response.data 
				
				if (code === 0) {

					commit('SET_AUTH', token);

					localStorage.setItem('token', token);
					
					return { code: 0 }
				}

				if (code === 1) {

					Alert.message({
						icon: 'error',
						title: 'Login failed', 
						text: message,
						confirmBtnText: 'Try again',
					})

				}

				return { code: code }

			} catch (error) {
				return { code: 1, error: error };
			}

		},

		logout({ commit }) {
			commit('SET_AUTH', false);
		}

	}

}