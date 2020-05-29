<template>
	<div>
		<div class="shadow radius-10 bg-white p-3 mt-2">
			<div class="d-flex justify-content-between">
				<div class="d-flex align-items-center">
					<img class="rounded-circle h-10 w-10 obj-fit" :src="'http://localhost:4000/api/users/image/' + comment.userId + '/' + comment.userProfileImage" />

					<div class="d-flex flex-column">
						<div class="ml-3">
							<div>
								<h4 class="mb-1"> {{ comment.userName }} {{ comment.userSurname }} </h4>
							</div>
							<div>
								<p class="mb-0"> {{ comment.commentBody }} </p>
							</div>
						</div>
					</div>
				</div>
				<div class="d-flex flex-column">
					<div>
						{{ comment.createdAt }}	
					</div>
					<div class="d-flex align-items-center justify-content-between">
						<div>
							<a href="javascript:void(0)" @click="showReplyPopup(comment.commentId, comment.userId, comment.postId)"> Reply </a>
						</div>
						<div>
							<span>
								<font-awesome-layers v-tooltip:top="'Like Post'" full-width class="fa-fw fa-1x py-1 cursor-pointer comment-icon" @click="submitLike(true, comment.commentId, comment.userId)"> <font-awesome-icon icon="thumbs-up" /> </font-awesome-layers>	
								({{ comment.commentLike }})
							</span>
							<span>
								<font-awesome-layers v-tooltip:top="'Dislike Post'" full-width class="fa-fw fa-1x py-1 cursor-pointer comment-icon" @click="submitLike(false, comment.commentId, comment.userId)"> <font-awesome-icon icon="thumbs-down" /> </font-awesome-layers>
								({{ comment.commentDislike }})
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Modal v-show="modalIsOpen" @modalState="updateModalState($event)" :showModal="modalIsOpen" >
			<template #header>
				Add Reply
			</template>

			<template #content>
				<textarea class="form-control" rows="4" placeholder="What is on your mind?" v-model="formData.comment" :class="{ 'is-invalid': $v.formData.comment.$error }"></textarea>
				<div v-if="$v.formData.comment.$error" class="invalid-feedback">
					<span v-if="!$v.formData.comment.required"> Enter a comment </span>
				</div>
			</template>
			
			<template #footer>
				<button class="btn btn-success" @click="submitReply()"> Reply </button>
				<button class="btn btn-secondary ml-1" @click="modalIsOpen = !modalIsOpen"> Close </button>
			</template>
		</Modal>
	</div>
</template>

<script>

	import Modal from '@/components/Modal';
	import { required } from 'vuelidate/lib/validators';
	import { mapActions } from 'vuex';
	
	export default {

		props: {

			comment: {
				type: Object,
				required: true,
			}

		},

		data() {

			return  {
				modalIsOpen: false,
				formData: {
					commentId: '',
					userId: '',
					postId: '',
					comment: ''
				}
			}

		},

		components: {
			Modal
		},

		methods: {

			...mapActions('comment', ['addReply', 'addLike']),

			showReplyPopup(commentId, userId, postId) {
				this.formData.commentId = commentId;
				this.formData.userId = userId;
				this.formData.postId = postId;

				this.modalIsOpen = true;
			},

			updateModalState(state) {
				this.modalIsOpen = state;
			},

			async submitReply() {

				this.$v.$touch();
				if (this.$v.$invalid) {
					return true;
				}

				await this.addReply(this.formData);
				await this.resetForm();

				this.modalIsOpen = false;
				this.$emit('update-blog-post');
			},

			async resetForm() {
				this.formData.commentId = '';
				this.formData.userId = '';
				this.formData.postId = '';
				this.formData.comment = '';
			},

			async submitLike(value, commentId, userId) {

				this.addLike({value, commentId, userId});

				this.$emit('update-blog-post');

			}

		},

		validations: {

			formData: {

				comment: { required }

			},

		}

	}

</script>

<style>

.comment-icon:hover {
	color: var(--prim-theme-color);

}

</style>