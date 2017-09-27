This is an exploration of adding named parameters to Javascript.

# Examples

```javascript
function a(b, c) {
}

// can now be called as:
a(b: 1, c: 2);

// a(b = 1, c = 2) would break compatibility unfortunately.
```

# Use cases

There are a number (TODO(goto): get numbers) of Web APIs that have more than 4 parameters (conjecture of this proposal: after 4 parameters it starts getting hard for humans to remember what the following arguments mean).

```drawImage``` is one of the most extreme examples with 9 arguments:

```javascript
// What does this mean?
ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);

// Ah, much clearer:
ctx.drawImage(
  image: image,
  sx: 33,
  sy: 71,
  swidth: 104,
  sHeight: 124,
  dx: 21,
  dy: 20,
  dWidth: 87,
  dHeight: 104
);
```

Another example, Date.UTC:

```javascript
// Signature:
// Date.UTC(year, month[, day[, hour[, minute[, second[, millisecond]]]]])

// Without named parameters:
var utcDate = new Date(Date.UTC(96, 11, 1, 0, 0, 0));

// With named parameters:
var utcDate = new Date(Date.UTC(
  year: 96, 
  month: 11, 
  day: 1, 
  hour: 0, 
  minute: 0, 
  millisecond: 0
));

```

# List of Web APIs sorted by number of parameters

Here are the functions on the Web platform with the most paramters (data from http://html5index.org/json/):

* WebGLRenderingContext.texSubImage2D: 9
* CanvasRenderingContext2D.drawImage: 9
* WebGLRenderingContext.texImage2D: 9
* WebGLRenderingContext.copyTexSubImage2D: 8
* WebGLRenderingContext.copyTexImage2D: 8
* WebGLRenderingContext.compressedTexSubImage2D: 8
* CanvasRenderingContext2D.ellipse: 8
* Path2D.ellipse: 8
* WebGLRenderingContext.compressedTexImage2D: 7
* Date.UTC: 7

Other notable examples:

* HTMLInputElement.setRangeText: 4
* Document.open: 4
* EventTarget.addEventListener: 4

More generally:

```javascript
// Documentation, makes reading code easier to know what to expect
move(x: 100, y: 200); // as opposed to move(100, 200) is the 100 x or y?
resize(width: 20, height: 30); // as opposed to resize(20, 30) is 20 the width or height?

// Makes creating Web APIs more ergonomic, avoiding the {} pattern
fetch("url.txt", method: "GET", cache: "default");

// As opposed to:
let options = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
}
fetch("url.txt", options);

```

# Challenges

* does this create now a contract in which providers of APIs have to support the names of their functions in a backwards compatible way (i.e. changing the parameter name now breaks existing code that uses it)?

# Prior art

* https://esdiscuss.org/topic/named-paramters
* https://github.com/lukescott/es-named-arguments

