import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import UserModule from './modules/user';
import PostsModule from './modules/posts';

export default new Vuex.Store({

	modules: {

		user: UserModule,
		posts: PostsModule

	}

});