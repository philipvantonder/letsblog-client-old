import UserService from '@/services/user';
import JWTService from '@/services/jwt';
import Alert from '@/model/Alert';

export default {

	namespaced: true,

	state: {
		token: localStorage.getItem('token') || false,
		loggedInUser: ''
	},

	mutations: {

		SET_AUTH_TOKEN(state, token) {
			state.token = token;
		},

		SET_USER_DETAILS(state, user) {
			state.loggedInUser = user.name + ' ' + user.surname;
		}

	},

	getters: {

		isLoggedIn: state => !!state.token,

		loggedInUser: state => state.loggedInUser

	},

	actions: {

		async login({ commit }, userDTO) {

			try {

				let response = await UserService.signIn(userDTO);
				
				let { code, message, token } = response.data 
				
				if (code === 0) {

					commit('SET_AUTH_TOKEN', token);

					localStorage.setItem('token', token);

					let user = await JWTService.getUserInfo(token);

					commit('SET_USER_DETAILS', user);
				
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