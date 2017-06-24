import $ from 'jquery'; 
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
	constructor(els, offset) {
		this.itemsToReveal = els;
		this.offsetPercentage = offset;
		this.hideInitially();
		this.createWaypoints();
	}

	hideInitially() {
		this.itemsToReveal.addClass('reveal-item');
	}

	createWaypoints() {
		//to be used in offset
		var that = this;
		//function to create a new waypoint for each element we'd like
		this.itemsToReveal.each(function() {
			var currentItem = this;
			new Waypoint({
				//DOM element we'd want to watch scrolling down the page
				element: currentItem, 
				//the handler action we'd like to act on each element
				handler: function() { 
					$(currentItem).addClass('reveal-item--is-visible');
				},
				//set the viewport offset so waypoints will act sooner on scroll
				offset: that.offsetPercentage
			});
		});
	}
}

export default RevealOnScroll;