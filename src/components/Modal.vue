<template>
	<div>
		<div class="modal fade show d-block"  tabindex="-1" role="dialog" >
			<div class="modal-dialog modal-lg z-10" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<slot name="header"></slot>

						<button type="button" class="close" @click="close()">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div :class="'modal-body ' + bodyClass">
						<slot name="content"></slot>
					</div>
					<div class="modal-footer" >
						<slot name="footer"></slot>
					</div>
				</div>
			</div>
			<button @click="close()" tabindex="-1" class="position-fixed border-0 bg-black inset-0 opacity-50 h-100 w-100 cursor-default"></button>
		</div>
	</div>
</template>

<script>

export default {

	props: {

		showModal: {
			type: Boolean,
			required: true
		},

		bodyClass: {
			type: String,
			required: false,
			default: ''
		}
		
	},

	watch: {

		showModal: function(state) {
			if (state) {
				this.show();
			} else {
				this.close();
			}
		}

	},

	methods: {

		close() {
			this.$emit('modalState', false);
		},

		show() {
			this.$emit('modalState', true);
		}

	},

	created() {

		const handleEscape = (e) => {
			if (e.key === 'Esc' || e.key === 'Escape') {
				this.$emit('modalState', false);
			}
		};

		document.addEventListener('keydown', handleEscape);

		this.$once('hook:beforeDestroy', () => {
			document.removeEventListener('keydown', handleEscape);
		});

	}

}
</script>

<style scoped>

.modal-body::-webkit-scrollbar {
	width: 12px;
	background-color: #fff;
}

.modal-body::-webkit-scrollbar-thumb {
	width: 12px;
	background-color: #95999c;
	border-radius: 50rem;
}

</style>