import Swal from 'sweetalert2';

class Alert {

	static message(options) {

		Swal.fire({
			icon: options.icon || 'success',
			title: options.title || '',
			text: options.text,
			confirmButtonText: options.confirmBtnText || 'Ok',
			position: options.position || '',
			showConfirmButton: (options.confirmButton !== undefined ? options.confirmButton : false), 
			timer: options.time || false,
			backdrop: (options.backdrop !== undefined ? options.backdrop : true)
		})
		.then((result) => {
			
			if (result.value) {

				if (options.redirect) {
					location.href = options.redirect;
				}

			}

		});

	}

	static confirm(options) {

		return new Promise((resolve, reject) => {
			
			Swal.fire({
				position: options.position || '',
				icon: options.icon || 'info',
				title: options.title,
				confirmButtonText: options.confirmButtonText || 'Yes',
				showCancelButton:  (options.cancelButton !== undefined ? options.cancelButton : true)
			}).then((result) => {
				
				if (result.value) {
					resolve(true);			
				} else {
					resolve(false);		
				}
				
			})
			.catch(error => reject(error));

		});

	}
	
}

export default Alert