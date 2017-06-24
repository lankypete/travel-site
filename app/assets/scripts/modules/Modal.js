import $ from 'jquery';

class Modal {

	constructor() {
		this.openModalButton = $('.open-modal');
		this.modal = $(".modal");
		this.closeModalButton = $(".modal__close");
		this.events();
	}

	events() {
		//clicking the modal open
		this.openModalButton.click(this.openModal.bind(this));
		//clicking the exit button
		this.closeModalButton.click(this.closeModal.bind(this));
		//click any key on keyboard
		$(document).keyup(this.keyPressHandler.bind(this));

	}

	keyPressHandler(e) {
		//if it's the esc key..
		if (e.keyCode == 27) {
			this.closeModal();
		}
	}

	openModal() {

		this.modal.addClass("modal--is-visible");
		return false; //prevents default behaviour of browser scrolling to top of page when clicking a link with href="#"

	}

	closeModal() {

		this.modal.removeClass("modal--is-visible");

	}



}

export default Modal;