function abbrNum(number, decPlaces = 2) {
  decPlaces = Math.pow(10, decPlaces);
  var abbrev = ["k", "M", "B", "T"];
  for (var i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);
    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;
      number += abbrev[i];
      break;
    }
  }
  return number;
}
module.exports = { abbrNum };
