import Swal from 'sweetalert2';

class Alert {

	static message(options) {

		Swal.fire({
			icon: options.icon || 'success',
			title: options.title || '',
			text: options.text,
			confirmButtonText: options.confirmBtnText || 'Ok',
			position: options.position || 'center',
			showConfirmButton: (options.confirmButton !== undefined ? options.confirmButton : false), 
			timer: options.time || false,
			backdrop: (options.backdrop !== undefined ? options.backdrop : true),
			showCancelButton: (options.cancelButton !== undefined ? options.cancelButton : false)
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
				position: options.position || 'center',
				icon: options.icon || 'question',
				title: options.title,
				confirmButtonText: options.confirmButtonText || 'Yes',
				showCancelButton: (options.cancelButton !== undefined ? options.cancelButton : true)
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

	static toast(options) {

		const Toast = Swal.mixin({
			toast: true,
			position: options.position || 'top-end',
			timer: options.timer || 3000,
			customClass: options.customClass || '',
			showConfirmButton: false,
			onOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
		});

		Toast.fire({
			icon: options.icon || 'success',
			title: options.title
		});

	}
	
}

export default Alert;