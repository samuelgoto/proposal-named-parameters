# Introduction

* Early reviewers: @adamk, @domenic, @slightlyoff, @erights, @waldemarhorwats, @dimvar

This is a [stage 0](https://tc39.github.io/process-document/) proposal to add named parameters to Javascript.

In this formulation, an **opt-in** mechanism is introduced to expose parameter names with a new keyword ```as```:

```javascript
function dostuff(b as b, c as c) {
}
```

That enables callers of your function to use named parameters:

```javascript
dostuff(b: 1, c: false);
```

## Keeping the contract

The opt-in mechanism ```as``` serves as an explicit and deliberate decision of the author of the function to expose parameter names, ***keeping*** the contract that parameter names are erased by default.

Breaking that contract can be harmful, notably with the interaction with minifiers: exposing (without consent) the parameters now forces library authors to maintain them and their backwards compatibility.

We expect (encourage, really) functions that have a large number of parameters to be the exception rather than the norm,  so an opt-in mechanism works well too.

# Use cases

## Long parameters list

The most immediate application of named parameter is with web APIs that has evolved, humm, lets say, organically. So, for example, we could make ```Date.UTC``` more ergonomic by exposing named parameters:

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

WebGL is also a good example of a source of functions with 7 or more parameters (by the valid nature of that space):

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

## Documentation

It works well too even with as few as three parameters and extremely popular functions (but possibly a very unpopular parameter). For example:

```javascript
// As opposed to:
//
// el.addEventListener("mouseup", listener, true)
//
// followed by your readers googling what the third argument means you can write:

el.addEventListener("mouseup", listener, capture: false).
```

## Disambiguation

In addition to making code more readable, it also has applications when parameter types are of the same type. Example:

```javascript
// Documentation, makes reading code easier to know what to expect

// as opposed to move(100, 200) is the 100 x or y?
move(x: 100, y: 200);

// as opposed to resize(20, 30) is 20 the width or height?
resize(width: 20, height: 30); 
```

You can find here a list of web apis sorted by [number of parameters](#web-apis).

## Multiple Optional Parameters

Named parameters enable function signatures that have already declared optional parameters to have more of them after that.

```javascript
// Ah, neat, now I can make "c" optional with a default value and add a new required parameter!
function dostuff(b as b, opt_c as c, opt_d as d) {
}

// phew, i don't have to use dostuff(1, undefined, "hello") ...
dostuff(b: 1, d: "hello");
```

# Cross Cutting Considerations

Generally speaking, we would want all features (past and future) that are applied to parameters to apply to named parameters.

## Default Values

```javascript
function a(b = 123 as b, c as c) {
}
a(c: false) // b takes 123
```

## Destructuring Parameters

Destructuring works the same way, except that the parameter can be referred nominally rather than (or, in addition to) positionally. For example:

```javascript
fetch("url.txt", options: {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
});
```


# Areas of Investigation

* can you intermingle positional arguments with named arguments?

# Prior art

* https://esdiscuss.org/topic/named-paramters
* https://github.com/lukescott/es-named-arguments

# Annex

## Web APIs

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
