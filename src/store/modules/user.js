import UserService from '@/services/user';
import JWTService from '@/services/jwt';
import Alert from '@/model/Alert';

export default {

	namespaced: true,

	state: {
		token: localStorage.getItem('token') || false
	},

	mutations: {

		SET_AUTH_TOKEN(state, token) {
			state.token = token;
		}

	},

	getters: {

		isLoggedIn: state => !!state.token,

		async getUserDetails(state) {

			let { user } = await JWTService.getUserInfo(state.token);

			return user;

		}

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
					})

				}

				return { code: code }

			} catch (error) {
				return { code: 1, error: error };
			}

		},

		logout({ commit }) {
			commit('SET_AUTH_TOKEN', false);
		}

	}

}