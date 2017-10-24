# Named Parameters
## Seeking Stage 1

---

### Overview
### Use Cases
### Areas of Investigation

---

### Overview

+++

### An opt-in mechanism to expose named parameters.

```javascript
// ... whe you write this ...
function dostuff(b as b, c as c) {
}

// ... you enable callers like this ...
dostuff(b: 1, c: false); 
```

@[1-4] (You use "as" to expose named parameters ...)
@[5-6] (... so your callers can use them ...)

---

### Use Cases

+++

### Long parameters list

```javascript
// Signature:
// Date.UTC(year, month[, day[, hour[, minute[, second[, millisecond]]]]])

// ... without named parameters ...
var utcDate = new Date(Date.UTC(96, 11, 1, 0, 0, 0));

// ... with named parameters ...
var utcDate = new Date(Date.UTC(
  year: 96, 
  month: 11, 
  day: 1, 
  hour: 0, 
  minute: 0, 
  millisecond: 0
));
```

@[1-2]
@[4-5]
@[7-15]

+++

### WebGL

```javascript
// ... what does this mean? ...
ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);

// ... ah, much clearer ...
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

@[1-2]
@[4-15]

+++

### Uncommon parameters

```javascript
// ...  is it bubble or capture? ...
el.addEventListener("mouseup", listener, true)

// ... ah, ok, capturing ...
el.addEventListener("mouseup", listener, capture: true)
```

@[1-2]
@[3-5]

+++

### Parameters of the same type

```javascript
// as opposed to move(100, 200) is the 100 x or y?
move(x: 100, y: 200);

// as opposed to resize(20, 30) is 20 the width or height?
resize(width: 20, height: 30); 
```

+++

### Multiple optional parameters

```javascript
// Signature:
blob.slice([start [, end [, contentType]]]);

// Awkward way to change the mime type:
let blob = source.slice(
  undefined, undefined, "image/jpeg");

// Error-prone way to change the mime type:
let blob = source.slice(
  0, source.size, "image/jpeg");

// With named parameters:
let blob = source.slice(contentType: "image/jpeg")
```

@[1-2]
@[4-6]
@[8-10]
@[12-13]

---

### Areas of Investigation

+++

### mixed parameters

```javascript
// Can we intermingle named parameters with positional?
fetch("url.json", option: {
  ...
});
```

---

### Stage 1?