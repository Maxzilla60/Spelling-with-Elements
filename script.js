var filteredlist; // Filtered list of elements
var chemlist; // Generated spelling of input

// Triggers when the try-button is pressed
// Gets input, makes a filtered list and outputs to page
function doTheThing() {
	// var elements; (imported from elements.js)
	var input = getInput();

	// Initialize lists:
	filteredlist = []; // We can filter out the elements list by looking for all possible substrings
	chemlist = []; // This is the actual spelling of the input (= output)

	// Generate filtered list
	filterList(input);

	// We call our recursive function (chemSearch) to spell out the input
	// This will fill chemlist with correct spelling
	
	// If we didn't find a nice spelling:
	if (chemSearch(input) === false) {
		// A "sorryful" error-message
		var sorry = "Sorry, we couldn't find a nice spelling. "+
				"<i class=\"fa fa-frown-o\" aria-hidden=\"true\"></i>";
		
		// If there's something in the filtered list:
		if (filteredlist.length !== 0) {
			// We re-sort the list according to where the element is found in the string
			filteredlist.sort(function(a,b){return a[2] - b[2];});
			// We show an error message and the filtered list
			setOutput(sorry + "<br>Here are all chemical elements that fit the input:<br>"+listToString(filteredlist));
		}
		// If there's nothing in the filtered list:
		else {
			debugger;
			setOutput(sorry);
		}
	}
	// If the generated list is empty:
	else if (chemlist.length === 0) {
		// we show the nice FontAwesome flask
		setOutput("<i class=\"fa fa-flask fa-2x\" aria-hidden=\"true\">");
	}
	// If we did find a nice spelling:
	else {
		// we show it!
		setOutput(listToString(chemlist));
	}
	return false;
}

// Finds all possible elements that are a substring of the input
// fills the filtered list
function filterList(input) {
	// Go through all the elements to make our filtered list:
	for (var i = 0; i < elements.length; i++) {
		// Check if the element's symbol is a substring of the input:
		var found_index = input.search(elements[i][0].toLowerCase());
		if (found_index != -1) {
			// If this is the case, we push the result to filtered list
			// "[element's symbol, element's full name, index of where we found the substring]"
			filteredlist.push([elements[i][0], elements[i][1], found_index]);
		}
	}
	// We sort the list according to string-length (largest to smallest)
	filteredlist.sort(function(a,b){return b[0].length - a[0].length;});
}

// Recursive function to split a string into chemical element symbols
// makes use of the filtered list but can do without
// This is where the magic happens
function chemSearch(string) {
	var check; // Help boolean
	
	// When the string is empty, we're done:
	if (string === "") {
		return true;
	}
	// We loop through the filtered list:
	for (var i = 0; i < filteredlist.length; i++) {
		// We check if the current string starts with the element's name
		// THIS FUNCTION ONLY WORKS WITH CHROME AND FIREFOX!!
		if (string.startsWith(filteredlist[i][0].toLowerCase()) === true) {
			// And we call the function again, catching the return value
			// This time we slice the string shorter
			check = chemSearch(string.slice(filteredlist[i][0].length, string.length));
			if (check === true) {
				// If all went well, we add the found element to the chemlist and we're done
				chemlist.unshift(filteredlist[i]);
				return true;
			}
			// If not, we continue going through the filtered list for matches
		}
	}
	// If no matches were found at all, we return false
	return false;
}

// Turns a list of string to a nice HTML representation
// with links to their respective wiki page!
function listToString(list) {
	var output = "";
	// We construct a string that will show the elements' symbols that hyperlink to their wiki page
	for (i = 0; i < list.length; i++) {
		output += "<a target=\"_blank\" href=\"https://en.wikipedia.org/wiki/"+list[i][1]+"\">"+list[i][0]+"</a>";
		if (i != list.length-1) {
			output += " • ";
		}
	}
	return output;
}

// Retrieves the input from the input-field
function getInput() {
	// Get the input (also keep only letters and convert to lowercase)
	var input = document.getElementById('input').value.toLowerCase().replace(/[^a-zA-Z]/g,"");
	document.getElementById('input').value = input; // Update content of inputfield
	return input;
}

// Writes the output to the output-field on the page
function setOutput(output) {
	document.getElementsByTagName('output')[0].innerHTML = output;
}

// Debug
function p(line) {
	console.log(line);
}