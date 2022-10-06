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
            let optional = 0;
            parameters.forEach(param => { if (param.optional) { optional++ } });
            // if (optional > 0) {
            //  console.log(`${JSON.stringify(parameters)}`);
            //  return;
            // }
	    result.push({name: `${object}.${func}`, parameters: parameters.length, optionals: optional});
	}
    }
}

// result.sort((a, b) => a.parameters - b.parameters);
result.sort((a, b) => a.optionals - b.optionals);

// console.log(`|API| Number of Parameters|`);

for (let p = 0; p < result.length; p++) {
    const api = result.at(-1 - p);

    if (api.optionals < 2) {
      break;
    }

    console.log(`* ${api.name}: ${api.optionals} optional [of ${api.parameters}]`);
}
