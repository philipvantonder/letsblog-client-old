import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import UserModule from './modules/user';
import PostsModule from './modules/posts';
import CategoryModule from './modules/category';
import CommentModule from './modules/category';

export default new Vuex.Store({

	modules: {

		user: UserModule,
		posts: PostsModule,
		category: CategoryModule,
		comment: CommentModule

	}

});