var view;
var globalspec;

fetch('map.json')
	.then(res => res.json())
	.then(spec => render(spec))
	.catch(err => console.error(err));

function update(sel) {
	if (sel.checked){
		fetch(sel.value)
			.then(res => res.json())
			.then(spec => render(spec))
			.catch(err => console.error(err));
	}
}

function render(spec) {
	let v = document.getElementById("view");
	spec.width = v.clientWidth;
	if (spec.marks[0].transform[0].size) {
		spec.marks[0].transform[0].size[0] = spec.width;
	}
	view = new vega.View(vega.parse(spec), {
		renderer:  'canvas',  // renderer (canvas or svg)
		container: '#view',   // parent DOM container
		hover:     true       // enable hover processing
	});
	return view.runAsync();
}