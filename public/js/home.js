$(function() {
  var Categories = {
    NONE: 0,
    DEV: 1,
    ORG: 2,
    SOCIAL: 4,
    ALL: 7
  };

  var triggerIndividualUntil = 0;
  var triggerGlobalUntil = 0;

  function Thumbnail(category, url, thumbnail, title, description, shortcut) {
      var element = $("<div></div>")
        .addClass("col-xs-6 col-md-3")
        .append($("<a></a>")
          .addClass("thumbnail")
          .attr("href", url)
          .attr("target", "_blank")
          .append($("<div></div>")
            .addClass("dashboard")
            .append($("<span></span>")
              .addClass("helper")
              .text(" "))
            .append(thumbnail))
          .append($("<div></div>")
            .addClass("caption")
            .append($("<p></p>")
              .addClass("title")
              .text(title))
            .append($("<span>hotkey: </span><kbd><kbd>g</kbd>, <kbd>" + shortcut + "</kbd></kbd>"))));

      var trigger = function() {
        if (!window.open(url, "_blank")) {
          alert('Allow popups for the website.');
        }
      }

      this.getElement = function() {
        return element;
      };

      this.attemptTrigger = function(enabled) {
        if (enabled & category) {
          trigger();
        }
      };

      $(document).bind("keydown", shortcut, function() {
        if (new Date().getTime() < triggerIndividualUntil) {
          trigger();
        }
      });
  };

  var thumbnails = [
    new Thumbnail(Categories.ALL, "https://tracker.toptal.com/app/web-tracker", $("<i></i>").addClass("glyphicon glyphicon-time"), "time tracker", "", "w"),
    new Thumbnail(Categories.ALL, "slack://omegauporg.slack.com", $("<img></img>").attr("src", "/img/Slack_Mark_Web.png"), "channels", "", "s"),
    new Thumbnail(Categories.BOARD, "https://enterpos.net/omegaup/", $("<i></i>").addClass("glyphicon glyphicon-briefcase"), "enterprise", "", "e"),
    new Thumbnail(Categories.BOARD, "https://trello.com/omegaup", $("<img></img>").attr("src", "/img/trello-logo-blue.png"), "tasks", "", "q"),
    new Thumbnail(Categories.DEV, "https://github.com/omegaup/omegaup", $("<img></img>").addClass("black").attr("src", "/img/GitHub-Mark-Light-120px-plus.png"), "repo", "", "g"),
    new Thumbnail(Categories.BOARD, "onenote:https://d.docs-df.live.net/f3cc87f1cbe7befb/Documentos/OmegaUp/", $("<img></img>").attr("src", "/img/AppLockup_rgb_OneNote_Large_OneNote_88.png"), "notes", "", "n"),
    new Thumbnail(Categories.NONE, "https://docs.google.com/a/omegaup.com/spreadsheets/d/1l2H_wFmBOi6bec8cYi8B8mo2mIhf5jNcK5sBzGMPkgk/edit?usp=sharing", $("<i></i>").addClass("glyphicon glyphicon-credit-card"), "business cards", "", "b"),
    new Thumbnail(Categories.SOCIAL, "https://twitter.com/omegaUp", $("<img></img>").attr("src", "/img/Twitter_Logo_Blue.png"), "twitter", "", "t"),
    new Thumbnail(Categories.SOCIAL, "https://www.facebook.com/omegaup", $("<img></img>").attr("src", "/img/FB-f-Logo__blue_1024.png"), "facebook", "", "f"),
    new Thumbnail(Categories.NONE, "https://omegaup.com", $("<img></img>").attr("src", "/img/square.png"), "site", "", "o"),
  ];

  var dashboard = $("#dashboard-row");

  thumbnails.forEach(function(thumbnail) { dashboard.append(thumbnail.getElement()); });

  $(document).bind("keydown", "g", function() {
    setTimeout(function() {
      triggerIndividualUntil = new Date().getTime() + 1000;
    }, 0);
  });

  $(document).bind("keydown", "a", function() {
    triggerGlobalUntil = new Date().getTime() + 1000;
  });

  $(document).bind("keydown", "d", function() {
    if (new Date().getTime() < triggerGlobalUntil) {
      thumbnails.forEach(function(thumbnail) {
        thumbnail.attemptTrigger(Categories.DEV);
      });
    }
  });

  $(document).bind("keydown", "b", function() {
    if (new Date().getTime() < triggerGlobalUntil) {
      thumbnails.forEach(function(thumbnail) {
        thumbnail.attemptTrigger(Categories.BOARD);
      });
    }
  });

  $(document).bind("keydown", "s", function() {
    if (new Date().getTime() < triggerGlobalUntil) {
      thumbnails.forEach(function(thumbnail) {
        thumbnail.attemptTrigger(Categories.SOCIAL);
      });
    }
  });
})
