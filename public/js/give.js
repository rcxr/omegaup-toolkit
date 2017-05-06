$(function() {
  var timeRegex = /(\d+):(\d+)/;
  var matchRegex = /([\d.,]+)/;
  var omegaUpRegex = /omegaUp/i;

  var timeHumanizer = humanizeDuration.humanizer({
    units: ["mo", "d", "h", "m"],
    delimiter: " and ",
    round: true,
    largest: 2
  });

  var numberHumanizer = function(value, unit) {
    var units = value / unit;
    return 0.75 < units - Math.floor(units) ? "almost " + Math.ceil(units) : "" + Math.floor(units);
  };

  var timeQuoteGenerator = [
    function(value) {
      return "This is as much time as watching The Lord of The Rings: The Two Towers (the Blu Ray Extended Edition) " + numberHumanizer(value, 14100000)  + " times!";
    },
    function(value) {
      return "This is as much time as playing " + numberHumanizer(value, 5400000)  + " full soccer matches!";
    },
    function(value) {
      return "This is as much time as " + numberHumanizer(value, 15180000)  + " times the time Goku took to defeat Freeza! And that was A LOT!";
    },
  ];

  var matchQuoteGenerator = [
    function(value) {
      return "This is enought to get " + numberHumanizer(value, 46.98)  + " Introduction to Algorithms (by Cormen) books for the Mentor's program!";
    },
    function(value) {
      return "This is enought to keep hosting omegaup.com for " + numberHumanizer(value, 100)  + " more years!";
    },
    function(value) {
      return "This is enought to send " + numberHumanizer(value, 5)  + " Coder of the Month packages to young students in Latin America!";
    },
  ];

  var table = $("#give-table");
  var report = $("#give-report");
  table.hide();
  report.hide();

  if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    alert("The File APIs are not fully supported in this browser. :(");
  }

  function generateTimeText(milliseconds) {
    return "You have volunteered " + timeHumanizer(milliseconds) + ". " + timeQuoteGenerator[Math.floor(Math.random() * timeQuoteGenerator.length)](milliseconds);
  };

  function generateMatchText(match) {
    return "And you company has joined the cause matching this volunteered time with $" + match + " moneys. " + matchQuoteGenerator[Math.floor(Math.random() * matchQuoteGenerator.length)](match);
  };

  function generateThanksText() {
    return "Thank you. You rock!";
  };

  function filePickerHander(evt) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var body = $("#give-table tbody");
      $("#give-info").hide();
      body.empty();
      table.hide();
      report.hide();

      var lines = reader.result.split("\n");
      lines.splice(0, 1);

      var time = moment.duration(0);
      var match = 0;
      var last = null;

      for (var i in lines) {
        if (!lines[i] || !omegaUpRegex.test(lines[i])) {
          continue;
        }

        var cells = lines[i].split(",");

        body.append($("<tr></tr>")
          .append($("<td></td>").text(cells[0]))
          .append($("<td></td>").text(cells[1]))
          .append($("<td></td>").text(cells[3]))
          .append($("<td></td>").text(cells[4].split(" ")[0])));

        var timeMatches = timeRegex.exec(cells[3]);
        var matchMatches = matchRegex.exec(cells[4]);

        last = cells[0];
        time.add(parseInt(timeMatches[1]), "h").add(parseInt(timeMatches[2]), "m");
        match += parseInt(matchMatches[1]);
      }

      $("#give-report-time").text(generateTimeText(time.asMilliseconds()));
      $("#give-report-match").text(generateMatchText(match));
      $("#give-report-thanks").text(generateThanksText());

      table.show();
      report.show();
    };

    reader.readAsText(evt.target.files[0]);
  };

  $("#give-report-picker").on("change", filePickerHander);
})
