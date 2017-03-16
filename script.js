var filtered;
var chemlist;

function doTheThing() {
	// var elements (imported from elements2.js)
	// Get the input (also keep only letters and convert to lowercase)
	var input = document.getElementById('input').value.toLowerCase().replace(/[^a-zA-Z]/g,"");
	document.getElementById('input').value = input;
	// Make new list, this will be our output
	filtered = []; // We can filter out the elements list by looking for all possible substrings
	chemlist = []; // This is the actual spelling of the input

	// Go through all the elements to make our filtered list
	for (i = 0; i < elements.length; i++) {
		// Check if the element's symbol is a substring of the input
		if (input.search(elements[i][0].toLowerCase()) != -1) {
			// If this is the case, we push to filtered
			// [element's symbol, element's full name, index of where we found the substring]
			filtered.push([elements[i][0], elements[i][1], input.search(elements[i][0].toLowerCase())]);
		}
	}

	// We sort the list according to stringlength (largest to smallest)
	filtered.sort(function(a,b){return b[0].length - a[0].length;});

	// We call our recursive function to spell out the input
	// This will fill chemlist with correct spelling
	if (chemSearch(input) == false) {
		// We re-sort the list according to where the element is found in the string
		filtered.sort(function(a,b){return a[2] - b[2];});
		// If we didn't find a nice spelling we give the filtered list
		document.getElementsByTagName("output")[0].innerHTML = 
		"Sorry, we couldn't find a nice spelling. :(<br>Here are all chemical elements that fit the input:<br>"+listToString(filtered);
	}
	else {
		// If we did, we show it!
		document.getElementsByTagName("output")[0].innerHTML = listToString(chemlist);
	}
	return false;
}

function chemSearch(string) {
	var check; // Help boolean
	if (string == "") {
		// When the string is empty, we're done
		return true;
	}
	// We loop through the filtered list
	for (var i = 0; i < filtered.length; i++) {
		// We check if the current string starts with the element's name
		// THIS FUNCTION ONLY WORKS WITH CHROME AND FIREFOX!!
		if (string.startsWith(filtered[i][0].toLowerCase()) == true) {
			// And we call the function again, catching the return value
			// This time we slice the string shorter
			check = chemSearch(string.slice(filtered[i][0].length, string.length));
			if (check == true) {
				// If all went well, we add the found element to the chemlist and we're done
				chemlist.unshift(filtered[i]);
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
		output += "<a href=\"https://en.wikipedia.org/wiki/"+list[i][1]+"\">"+list[i][0]+"</a>";
		if (i != list.length-1) {
			output += ", ";
		}
	}
	return output;
}

// UNUSED:

function startsWith(thing, otherthing) {
	for (i = 0; i < otherthing.length; i++) {
		if (thing[i] != otherthing[i]) {
			return false;
		}
	}
	return true;
}

function old_doTheThing() {
	// var elements (imported from elements2.js)
	// Get the input (also convert to lowercase and remove whitespaces)
	var input = document.getElementById('input').value.toLowerCase().replace(" ","");
	// Make new list, this will be our output
	list = [];

	// Go through all the elements
	for (i = 0; i < elements.length; i++) {
		// Check if the element's symbol is a substring of the input
		if (input.search(elements[i][0].toLowerCase()) != -1) {
			// If this is the case, we push to list
			// [element's symbol, element's full name, index of where we found the substring]
			list.push([elements[i][0], elements[i][1], input.search(elements[i][0].toLowerCase())]);
		}
	}

	// We sort the list according to where the element is found in the string
	list.sort(function(a,b){return a[2] - b[2];});

	// We output to the HTML
	document.getElementsByTagName("output")[0].innerHTML = listToString(list);
	return false;
}