function p(line) {
    console.log(line);
}

function random(min, max) {
    return Math.floor(Math.random() * max) + min;
}

var x = Math.floor(Math.random() * elements.length);
var y = Math.floor(Math.random() * 2);
p("elements length:" + elements.length);
p("x: "+x);p("y: "+y);
p(elements[x][y]);
document.getElementsByTagName("output")[0].innerHTML = "Kaas";
/*for (var i in elements) {
    p(i);
}*/