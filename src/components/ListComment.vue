<template>
	<div v-if="comments.length > 0">
		
		<div> <strong> Comments ({{ comments.length }}) </strong> </div>

		<div v-for="(comment, index) in comments" :key="index">
			<div class="shadow rounded bg-white p-3 mt-2">
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
					<div>
						{{ comment.createdAt }}
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	
	export default {

		props: {

			comments: {
				type: Array,
				required: false,
				default: () => []
			}

		},

		data() {

			return {

			}

		}

	}

</script>