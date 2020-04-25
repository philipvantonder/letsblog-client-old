<template>
	<div :id="this.name" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<slot name="header"></slot>

					<button type="button" class="close" @click="close()">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<slot name="content"></slot>
				</div>
				<div class="modal-footer">
					<slot name="footer"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import $ from 'jquery';

export default {

	props: {

		showModal: {
			type: Boolean,
			required: true
		},

		name: {
			type: String,
			required: true
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
			$(`#${this.name}`).modal('hide');
			this.$emit('modalState', false);
		},

		show() {
			$(`#${this.name}`).modal('show');
			this.$emit('modalState', true);
		}

	}

}
</script>