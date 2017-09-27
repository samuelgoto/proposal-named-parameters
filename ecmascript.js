var fs = require('fs');

// let index = fs.readFileSync("ecmascript.json");
let index = fs.readFileSync("html5.json");
let types = eval('x=' + index);

// console.log(types.definitions);

let result = [];

for (let i in types.definitions) {
    let def = types.definitions[i];
    // console.log(def.type);
    for (let j in def.properties) {
        // console.log(j);
	if (def.properties[j].type == "function") {
	    let parameters = def.properties[j].parameter;
	    let func = j;
	    let object = i;
	    // console.log(i);
	    // console.log(`${object}.${func} with ${parameters.length}`);
	    result.push({name: `${object}.${func}`, parameters: parameters.length});
	}
    }
}

result.sort(function(a, b) { return a.parameters - b.parameters });

for (let p = 0; p < 100; p++) {
    console.log(`${result[result.length - 1 - p].name}: ${result[result.length - 1 - p].parameters}`);
}