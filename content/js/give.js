$(function() {
  var table = $("#give-table");
  table.hide();

  if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    alert("The File APIs are not fully supported in this browser. :(");
  }

  function filePickerHander(evt) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var body = $("#give-table tbody");
      $("#give-info").hide();
      body.empty();
      table.hide();

      var lines = reader.result.split("\n");
      lines.splice(0, 1);

      for (var i in lines) {
        if (!lines[i]) {
          continue;
        }

        var cells = lines[i].split(",");
        body.append($("<tr></tr>")
          .append($("<td></td>").text(new Date(cells[0] * 1000).toLocaleDateString()))
          .append($("<td></td>").text(cells[2]))
          .append($("<td></td>").text(cells[3].split(" ")[0])));

        table.show();
      }
    };

    reader.readAsText(evt.target.files[0]);
  };

  $("#give-report-picker").on("change", filePickerHander);
})
