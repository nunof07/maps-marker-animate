/*!
 * Google Maps Marker Animate
 * https://github.com/nunof07/maps-marker-animate
 * @version 0.1.0
 * @author Nuno Freitas (nunofreitas@gmail.com)
 * @license https://raw.githubusercontent.com/nunof07/maps-marker-animate/master/LICENSE
 */
/* global google */
google.maps.Marker.prototype.animateTo = function (newPosition, duration, completeCallback) {
	var self = this,
		startLat = this.getPosition().lat(),
		startLng = this.getPosition().lng(),
		endLat = newPosition.lat(),
		endLng = newPosition.lng(),
		animateStep = function (startDate) {
			var elapsedTime = new Date() - startDate,
				durationRatio = elapsedTime / duration,
				easingDurationRatio = 0.5 - Math.cos(durationRatio * Math.PI) / 2;
			
			if (durationRatio < 1) {
				var deltaLat = startLat + (endLat - startLat) * easingDurationRatio,
					deltaLng = startLng + (endLng - startLng) * easingDurationRatio,
					deltaPosition = new google.maps.LatLng(deltaLat, deltaLng);
				self.setPosition(deltaPosition);
				self.animateHandler = window.requestAnimationFrame(function () {
					animateStep(startDate);
				});
			} else {
				self.setPosition(newPosition);
				
				if (typeof completeCallback === 'function') {
					completeCallback();
				}
			}
		};
	window.cancelAnimationFrame(this.animateHandler);
	animateStep(new Date());
};

google.maps.Marker.prototype.bounce = function (isEnabled) {
	this.isBounceEnabled = isEnabled;
	
	if (this.isBounceEnabled) {
		// save start position
		this.bounceStartPosition = this.getPosition();
		
		// bounce by animating between a higher position and the start position
		var self = this,
			duration = 320,
			map = this.getMap(),
			diff =  591657550.5 / Math.pow(2, map.getZoom() - 1) / (591657550.5 / 10),
			topPosition = new google.maps.LatLng(
				this.bounceStartPosition.lat() + diff,
				this.bounceStartPosition.lng()),
			bounceAnimation = function () {
				self.animateTo(topPosition, duration, function () {
					self.animateTo(self.bounceStartPosition, duration, bounceAnimation);
				});
			};
		bounceAnimation();
		
		// handle zoom changes
		google.maps.event.removeListener(this.bounceZoomListener);
		this.bounceZoomListener = google.maps.event.addListener(map, 'zoom_changed', function () {
			if (self.isBounceEnabled) {
				// reset bounce on zoom change
				self.setPosition(self.bounceStartPosition);
				self.bounce(true);
			}
		});
	} else {
		// return to original position when stopping bounce
		if (this.bounceStartPosition !== undefined) {
			this.animateTo(this.bounceStartPosition, 160);
		}
		
		// remove zoom change listener
		google.maps.event.removeListener(this.bounceZoomListener);
	}
};