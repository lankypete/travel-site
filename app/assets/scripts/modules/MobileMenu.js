import $ from 'jquery';

class MobileMenu {
	constructor() {
		this.siteHeader = $('.site-header');
		this.menuIcon = $('.site-header__menu-icon');
		this.menuContent = $('.site-header__menu-content');
		this.events();  //tells browser to listen for 'events' method
	}

	events() {
		this.menuIcon.click(this.toggleTheMenu.bind(this));
	}

	toggleTheMenu() {
		//Note that 'this' doens't point to the class in this method
		//since it was called from the events() method, keyword this will be the element that is clicked
		//so we add the .bind function to define what keyword 'this' will equal from there on
		//we want it to point to the class (mobileMenu), and we can simply use .bind(this)
		this.menuContent.toggleClass("site-header__menu-content--is-visible");
		this.siteHeader.toggleClass("site-header--is-expanded");
		this.menuIcon.toggleClass("site-header__menu-icon--close-x");
	}

}

export default MobileMenu;