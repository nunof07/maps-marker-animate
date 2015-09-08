# Google Maps Marker Animate
Custom animation methods for Google Maps Marker class.

- animateTo method based on [marker-animate](https://github.com/combatwombat/marker-animate)
- Before using include a requestAnimationFrame polyfill such as [request-frame](https://github.com/julienetie/request-frame)

## Usage
First include the necessary scripts.

```html
<!-- Google Maps -->
<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>

<!-- requestAnimationFrame polyfill -->
<script src="https://cdn.rawgit.com/julienetie/request-frame/master/dist/request-frame.min.js"></script>

<!-- Marker Animate -->
<script src="marker-animate.js"></script>
```

Then call the methods on a marker.

```javascript
// disable bounce animation
marker.bounce(false);

// animate marker to a new position
marker.animateTo(newPosition, duration, completeCallback);
```

## Demos
- Demo 1: click anywhere on the map to move the pin to that position
- Demo 2: custom bounce animation
- Demo 3: custom bounce animation on Markers using [Map-Icons]

[map-icons]: https://github.com/scottdejonge/Map-Icons/

## Why?
A custom bounce animation method is useful if you are attaching anything to the marker and want it animated together.

The Google Maps API already includes a bounce animation, but it doesn't update the marker's position when bouncing, while this method does.