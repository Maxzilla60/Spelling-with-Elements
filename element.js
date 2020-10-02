// Class for printing elements based on his number
class Element {

    // Constructor that take the number of the element and gets its information
    // form another file
    constructor(num) {
        var elt = elts['elements'];
        this.number = num;
        this.letter = elt[num - 1]['symbol'];
        this.name = elt[num - 1]['name'].split(' ')[0];
        this.mass = Math.round(elt[num - 1]['atomic_mass'] * 1000) / 1000;
        this.type = elt[num - 1]['category'].replace(/\s+/g, '').split(',')[0];
    }

    // Get the element based on its symbol
    static getBySymbol(symbol) {
        var elt = elts['elements'];
        var number = -1;
        for (var i = 0; i < elt.length; i++) {
            if (elt[i].symbol.toLowerCase() === symbol.toLowerCase()) {
                number = i + 1;
            }
        }

        if (number > 0) {
            return new Element(number);
        } else {
            throw "No element known named " + symbol;
        }
    }

    // Get the element based on its name
    static getByName(name) {
        var elt = elts['elements'];
        var number = -1;
        for (var i = 0; i < elt.length; i++) {
            if (elt[i].name.split(' ')[0].toLowerCase() === name.toLowerCase()) {
                number = i + 1;
            }
        }

        if (number > 0) {
            return new Element(number);
        } else {
            throw "No element known named " + name;
        }
    }

    // Return the name of the element
    getNumber() {
        return this.number;
    }

    // Return the symbol of the element
    getLetter() {
        return this.letter;
    }

    // Return the name of the element
    getName() {
        return this.name;
    }

    // Return the mass of the element
    getMass() {
        return this.mass;
    }

    // Return the type of the element
    getType() {
        return this.type;
    }

    // Return a string HTML formated showing the element
    toString() {
        var retour = "<div id=\"" + this.letter + "\" class=\"element " + this.type + "\">" +
            "<a target=\"_blank\" href=\"https://en.wikipedia.org/wiki/" + this.name + "\">" +
            "<div class=\"number text\">" + this.number + "</div>" +
            "<div class=\"letter text\">" + this.letter + "</div>" +
            "<div class=\"name text\">" + this.name + "</div>" +
            "<div class=\"atomicmass text\">" + this.mass + "</div>" +
            "</a>" +
            "</div>";

        return retour;
    }
}
