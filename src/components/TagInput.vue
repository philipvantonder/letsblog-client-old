<template>
	<div>
		<div v-if="message" class="mt-2 tag-input__message tag-input__warning" :class="{ 'tag-input__shake': message }" v-html="message"></div>

		<div class="tag-input">
			<div v-for="(tag, index) in tags" :key="tag" class="tag-input__tag">
				<span @click="removeTag(index)">x</span>
				{{ tag }}
			</div>
			<input type="text" placeholder="Enter a Tag" v-model.trim="tag" class="tag-input__text" @keydown.enter="addTag()" />
		</div>

		<div class="mt-2">
			<button class="btn btn-primary" @click="addTag()"> Add Tag </button>
		</div>
	</div>
</template>

<script>

export default {

	name: 'TagInput',

	props: {
		
		tagsArr: {
			type: Array,
			default: () => []
		}

	},

	data() {

		return {

			message: '',
			tag: '',
			tags: this.tagsArr || []

		}

	},

	watch: {

		tags (o, n) {
			this.$emit('input', n);
		}

	},

	methods: {
		
		addTag() {
			
			this.message = '';

			if (this.tags.includes(this.tag)) {
				this.message = `Tag <b>${this.tag}</b> already added.`;
			} else {
				if (this.tag) {	
					this.tags.push(this.tag);
					this.tag = '';
				}
			}

		},

		removeTag(id) {
	
			this.tags.splice(id, 1);

		}
	}

}

</script>

<style scoped>

.tag-input {
	width: 100%;
	border: 1px solid #eee;
	font-size: 0.9em;
	height: auto;
	box-sizing: border-box;
	padding: 0 10px;
}

.tag-input__tag {
	height: 30px;
	float: left;
	margin-right: 10px;
	background-color: #eee;
	margin-top: 10px;
	line-height: 30px;
	padding: 0 5px;
	border-radius: 5px;
}

.tag-input__tag > span {
	cursor: pointer;
	opacity: 0.75;
}

.tag-input__text {
	border: none;
	outline: none;
	font-size: 0.9em;
	line-height: 50px;
	background: none;
}

.tag-input__warning {
	border-left-color: red !important;
}

.tag-input__message {
	padding: 1.25rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    border: 1px solid #eee;
    border-left-width: .25rem;
    border-radius: .25rem;
}

.tag-input__shake {
	animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
	transform: translate3d(0, 0, 0);
	backface-visibility: hidden;
	perspective: 1000px;
}

@keyframes shake {
	10%, 90% {
		transform: translate3d(-1px, 0, 0);
	}
  
	20%, 80% {
		transform: translate3d(2px, 0, 0);
	}

	30%, 50%, 70% {
		transform: translate3d(-4px, 0, 0);
	}

	40%, 60% {
		transform: translate3d(4px, 0, 0);
	}
}

</style>