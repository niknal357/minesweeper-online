var new_features = [
  "Added changelog",
  "Added right-click support",
  "Added timer",
];
var bug_fixes = [
  "Fixed game not detecting when you win on donut shaped boards",
];
var known_issues = [
  "No leaderboards ¯\\_(ツ)_/¯",
  "Changelog bugs out when there is nothing in a given category",
  "Timer dies at the end of the game",
];
window.addEventListener("load", function () {
  var txt = "";
  txt += "New Features:";
  for (var i = 0; i < new_features.length; i++) {
    txt += "\n - " + new_features[i] + "";
  }
  txt += "\n\nBug Fixes:";
  for (var i = 0; i < bug_fixes.length; i++) {
    txt += "\n - " + bug_fixes[i] + "";
  }
  txt += "\n\nKnown Issues:";
  for (var i = 0; i < known_issues.length; i++) {
    txt += "\n - " + known_issues[i] + "";
  }
  document.getElementById("changelog").innerText = txt;
});
