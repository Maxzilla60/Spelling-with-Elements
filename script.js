var filteredlist; // Filtered list of elements
var chemlist; // Generated spelling of input

function doTheThing() {
	// var elements; (imported from elements.js)
	var input = getInput();

	// Initialize lists
	filteredlist = []; // We can filter out the elements list by looking for all possible substrings
	chemlist = []; // This is the actual spelling of the input (= output)

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

	// We call our recursive function to spell out the input
	// This will fill chemlist with correct spelling
	if (chemSearch(input) == false) {
		// We re-sort the list according to where the element is found in the string
		filteredlist.sort(function(a,b){return a[2] - b[2];});
		// If we didn't find a nice spelling we give the filtered list
		setOutput("Sorry, we couldn't find a nice spelling. "
			+"<i class=\"fa fa-frown-o\" aria-hidden=\"true\"></i>"
			+"<br>Here are all chemical elements that fit the input:<br>"+listToString(filteredlist));
	}
	else if (chemlist.length == 0) {
		// If the generated list is empty, we show the nice FontAwesome flask
		setOutput("<i class=\"fa fa-flask fa-2x\" aria-hidden=\"true\">");
	}
	else {
		// If we did, we show it!
		setOutput(listToString(chemlist));
	}
	return false;
}

function chemSearch(string) {
	var check; // Help boolean
	if (string == "") {
		// When the string is empty, we're done
		return true;
	}
	// We loop through the filtered list:
	for (var i = 0; i < filteredlist.length; i++) {
		// We check if the current string starts with the element's name
		// THIS FUNCTION ONLY WORKS WITH CHROME AND FIREFOX!!
		if (string.startsWith(filteredlist[i][0].toLowerCase()) == true) {
			// And we call the function again, catching the return value
			// This time we slice the string shorter
			check = chemSearch(string.slice(filteredlist[i][0].length, string.length));
			if (check == true) {
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

function listToString(list) {
	var output = "";
	// We construct a string that will show the elements' symbols that hyperlink to their wiki page
	for (i = 0; i < list.length; i++) {
		output += "<a target=\"_blank\" href=\"https://en.wikipedia.org/wiki/"+list[i][1]+"\">"+list[i][0]+"</a>";
		if (i != list.length-1) {
			output += " ";
		}
	}
	return output;
}

function getInput() {
	// Get the input (also keep only letters and convert to lowercase)
	var input = document.getElementById('input').value.toLowerCase().replace(/[^a-zA-Z]/g,"");
	document.getElementById('input').value = input; // Update content of inputfield
	return input;
}

function setOutput(output) {
	document.getElementsByTagName('output')[0].innerHTML = output;
}

// Debug
function p(line) {
	console.log(line);
}