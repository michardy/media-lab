var view;
var globalspec;

fetch('words.json')
	.then(res => res.json())
	.then(spec => render(spec))
	.catch(err => console.error(err));

function update(sel) {
	if (sel.checked){
		globalspec.data[0].url = `https://labs.mhardy.dev/query/news/terms/24h/${sel.value}/50`;
		render(globalspec);
	}
}

function render(spec) {
	let v = document.getElementById("view");
	spec.width = v.clientWidth;
	spec.marks[0].transform[0].size[0] = spec.width;
	globalspec = spec;
	view = new vega.View(vega.parse(spec), {
		renderer:  'canvas',  // renderer (canvas or svg)
		container: '#view',   // parent DOM container
		hover:     true       // enable hover processing
	});
	return view.runAsync();
}