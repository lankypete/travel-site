import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {

	constructor() {
		//this first one is a fix because lazyloading messess with the waypoints
		this.lazyImages = $('.lazyload');
		this.siteHeader = $('.site-header');
		this.headerTriggerElement = $('.large-hero__title');
		this.pageSections = $('.page-section');
		this.headerLinks = $('.primary-nav a');
		this.createHeaderWaypoint(); //So the this method runs as soon as the page loads
		this.createPageSectionWaypoints();
		this.addSmoothScrolling();
		this.refreshWaypoints();
		
	}

	refreshWaypoints() {
		//.on('load') means everytime an object (image) gets loaded in, do something
		this.lazyImages.on("load", function() {
		  	//Waypoint has a method to refresh all waypoints
		    Waypoint.refreshAll();
		 });
	}

	addSmoothScrolling() {
		//call the smooth-scroll library on all header links
		this.headerLinks.smoothScroll();
	}

	createHeaderWaypoint() {
		var that = this;
		new Waypoint({
			element: this.headerTriggerElement[0], //(must be javascript handler) 
			//use [0] because the first element in jQuery element is always native javascript document element
			handler: function(direction) {
				if (direction == "down") {
					that.siteHeader.addClass("site-header--dark");
				} else {
					that.siteHeader.removeClass("site-header--dark");
				}

				
			}
		});
	}

	createPageSectionWaypoints() {
		var that = this;
		this.pageSections.each(function(){
			//within each method, this keyword points towards the DOM element from collection that is currently looped to
			var currentPageSection = this;
			new Waypoint({
				element: currentPageSection,
				handler: function(direction){
					if (direction == "down") {
						//set a var to equal the 'data-matching-link' attribute
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass('is-current-link');
						$(matchingHeaderLink).addClass('is-current-link');
					} 
				},
				offset: "18%"
			});

			new Waypoint({
				element: currentPageSection,
				handler: function(direction){
					if (direction == "up") {
						//set a var to equal the 'data-matching-link' attribute
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass('is-current-link');
						$(matchingHeaderLink).addClass('is-current-link');
					} 
				},
				offset: "-40%"
			});

		});
	}

}

export default StickyHeader;