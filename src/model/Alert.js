import Swal from 'sweetalert2'

class Alert {

	static message(options) {

		Swal.fire({
			icon: options.icon,
			title: options.title,
			text: options.text,
			confirmButtonText: options.confirmBtnText,
		})
		.then((result) => {
			
			if (result.value) {

				if (options.redirect) {

					location.href = options.redirect;
				
				}

			}

		})

	}
	
}

export default Alert