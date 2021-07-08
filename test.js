let color = ["b", "r", "y", "g"];
let token = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "+", "r", "s"];

let final = [];
let fi = {

}

for (let i of color) {
    for (let j of token) {
        final.push(i + j + '');
    }
}

for (let fin of final) {
    fi['"' + fin + '"'] = 2;
}

console.log(fi);
console.log(final);