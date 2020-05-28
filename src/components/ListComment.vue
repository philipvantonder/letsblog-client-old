<template>
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
						<a href="javascript:void(0)" @click="addReply(comment.commentId)"> Reply </a>
					</div>
					<div>
						<font-awesome-layers v-tooltip:top="'Like Post'" full-width class="fa-fw fa-1x py-1 cursor-pointer comment-icon"> <font-awesome-icon icon="thumbs-up" /> </font-awesome-layers>
						<font-awesome-layers v-tooltip:top="'Dislike Post'" full-width class="fa-fw fa-1x py-1 cursor-pointer comment-icon"> <font-awesome-icon icon="thumbs-down" /> </font-awesome-layers>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {

		props: {

			comment: {
				type: Object,
				required: true,
			}

		},

		methods: {

			addReply() {

			}

		}

	}

</script>

<style>

.comment-icon:hover {
	color: red;
}

</style>