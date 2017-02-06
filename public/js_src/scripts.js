
// show results in websiste
const showResults = () => {

	var inputVal = document.getElementById('searchInput').value;

  var select = document.getElementById("languages");
  var selectValue = select.options[select.selectedIndex].value;

	var url = 'https://' + selectValue + '.wikipedia.org//w/api.php?action=opensearch&search=' + inputVal + '&format=json&callback=?';

	jQuery.ajax({
		dataType: "json",
		type: 'GET',
		url: url,
		async: false
	}).done(function (response) {
		addElement(response);
	});

};

// create and insert new element
const addElement = (response) => {

	// set data
	const data = response;

  // set variables
	var items = document.querySelectorAll('.list-group-item');
	var result = document.querySelector('.jumbotron-result');

	if (items === undefined || items.length === 0) {
		result.classList.add('visible');
		createElement(data);
	} else {
		result.classList.remove('visible');
		setTimeout(() => {
			items.forEach(function (el) {
				el.parentNode.removeChild(el);
			});
			createElement(data);
			result.classList.add('visible');
		}, 1000);

	}

	// default search field
	document.getElementById('searchInput').value = '';

};

var createElement = (data) => {
	for (let i = 0; i < data.length; i++) {

		// create results
		let results = document.createElement("a");
		results.href = data[3][i];
		results.setAttribute('target', '_blank');
		results.className = 'list-group-item list-group-item-action flex-column align-items-start';
		results.innerHTML = `
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${data[1][i]}</h5>
    </div>
    <p class="mb-1">${data[2][i]}</p>
  `;

		// insert results
		let listGroup = document.querySelector('.list-group');
		listGroup.appendChild(results);

	}
}

// add click listener
(() => {

	const btn = document.querySelector('button#searchButton');
	btn.addEventListener('click', showResults, false);

	window.addEventListener('keydown', function (e) {
		if (e.which == 13) {
			showResults();
		}
	});

})();
