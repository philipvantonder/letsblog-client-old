<template>
	<div class="d-flex flex-column">
		<form @submit.prevent="submitForm()">
			<div>
				<textarea class="form-control" rows="4" placeholder="What is on your mind?" v-model="formData.comment" :class="{ 'is-invalid': $v.formData.comment.$error }"></textarea>
				<div v-if="$v.formData.comment.$error" class="invalid-feedback">
					<span v-if="!$v.formData.comment.required"> Enter a comment </span>
				</div>
			</div>
			<div class="mt-3">
				<button class="btn btn-primary"> Add Comment </button>
				<button class="btn btn-secondary ml-2" @click="hideCommentBox()"> Cancel </button>
			</div>
		</form>
	</div>
</template>

<script>

import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {

	name: 'AddComment',

	props: {

		postId: {

			type: String,
			required: true

		},

		userId: {

			type: String,
			required: true

		},

	},

	data() {

		return {

			formData: {
				comment: '',
				userId: this.userId,
				postId: this.postId
			}

		}

	},

	methods: {

		...mapActions('Comment', ['create', 'setPostCommentsById']),

		async submitForm() {

			this.$v.$touch();
			if (this.$v.$invalid) {
				return true;
			}

			await this.create(this.formData);

			await this.setPostCommentsById(this.postId);

			this.formData.comment = '';
			this.$emit('hideCommentBox');
		},

		hideCommentBox() {
			this.$emit('hideCommentBox');
		}

	},

	validations: {

		formData: {

			comment: { required }
		
		}

	}

}

</script>