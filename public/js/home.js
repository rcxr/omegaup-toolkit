$(function() {
  var Categories = {
    NONE: 0,
    TECH: 1,
    DEV: 2,
    SOCIAL: 4,
    ALL: 7
  };

  var triggerIndividualUntil = 0;
  var triggerGlobalUntil = 0;

  function Thumbnail(category, url, thumbnail, title, description, shortcut) {
      var trigger = function() {
        if (!window.open(url, "_blank")) {
          alert("Allow popups for the website.");
        }
      };

      this.filter = function(filter) {
        return filter & category;
      };

      this.generate = function() {
        return $("<div></div>")
          .addClass("col-xs-4 col-md-2")
          .append($("<a></a>")
            .addClass("thumbnail")
            .attr("href", url)
            .attr("target", "_blank")
            .append($("<div></div>")
              .addClass("dashboard")
              .append($("<span></span>")
                .addClass("helper")
                .text(" "))
              .append($(thumbnail)))
            .append($("<div></div>")
              .addClass("caption")
              .append($("<p></p>")
                .addClass("title")
                .text(title))
              .append($("<span class='hidden-xs hidden-sm'>{ hotkey <kbd><kbd>g</kbd>, <kbd>" + shortcut + "</kbd></kbd> }</span>"))));
      };

      this.attemptTrigger = function(filter) {
        if (filter & category) {
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
    new Thumbnail(Categories.ALL, "https://tracker.toptal.com/app/web-tracker", "<i class='glyphicon glyphicon-time'></i>", "track", "", "w"),
    new Thumbnail(Categories.TECH, "https://github.com/omegaup/omegaup", "<img class='black' src='/img/GitHub-Mark-Light-120px-plus.png'></img>", "repo", "", "g"),
    new Thumbnail(Categories.DEV, "https://enterpos.net/omegaup/", "<i class='glyphicon glyphicon-briefcase'></i>", "erp", "", "e"),
    new Thumbnail(Categories.ALL, "slack://omegauporg.slack.com", "<img src='/img/Slack_Mark_Web.png'></img>", "channels", "", "s"),
    new Thumbnail(Categories.DEV, "https://mail.google.com/mail/u/1/", "<img src='/img/logo_gmail_128px.png'></img>", "mail", "", "m"),
    new Thumbnail(Categories.DEV, "https://trello.com/omegaup", "<img src='/img/trello-logo-blue.png'></img>", "tasks", "", "q"),
    new Thumbnail(Categories.DEV, "onenote:https://d.docs-df.live.net/f3cc87f1cbe7befb/Documentos/OmegaUp/", "<img src='/img/AppLockup_rgb_OneNote_Large_OneNote_88.png'></img>", "notes", "", "n"),
    new Thumbnail(Categories.SOCIAL, "https://twitter.com/omegaUp", "<img src='/img/Twitter_Logo_Blue.png'></img>", "tw", "", "t"),
    new Thumbnail(Categories.SOCIAL, "https://www.facebook.com/omegaup", "<img src='/img/FB-f-Logo__blue_1024.png'></img>", "fb", "", "f"),
    new Thumbnail(Categories.SOCIAL, "https://www.linkedin.com/company-beta/16244586/", "<img src='/img/Logo-2C-128px-R.png'></img>", "linkedIn", "", "l"),
    new Thumbnail(Categories.NONE, "https://omegaup.com", "<img src='/img/square.png'></img>", "com", "", "o"),
    new Thumbnail(Categories.NONE, "https://omegaup.org", "<img class='black' src='/img/square.png'></img>", "org", "", "i"),
    new Thumbnail(Categories.NONE, "https://docs.google.com/a/omegaup.com/spreadsheets/d/1l2H_wFmBOi6bec8cYi8B8mo2mIhf5jNcK5sBzGMPkgk/edit?usp=sharing", "<i class='glyphicon glyphicon-credit-card'></i>", "orders", "", "b"),
  ];

  thumbnails.forEach(function(thumbnail) { if (thumbnail.filter(Categories.TECH)) { $("#dashboard-tech").append(thumbnail.generate()); } });
  thumbnails.forEach(function(thumbnail) { if (thumbnail.filter(Categories.DEV)) { $("#dashboard-dev").append(thumbnail.generate()); } });
  thumbnails.forEach(function(thumbnail) { if (thumbnail.filter(Categories.SOCIAL)) { $("#dashboard-social").append(thumbnail.generate()); } });
  thumbnails.forEach(function(thumbnail) { if (!thumbnail.filter(Categories.ALL)) { $("#dashboard-other").append(thumbnail.generate()); } });

  $(document).bind("keydown", "g", function() {
    setTimeout(function() {
      triggerIndividualUntil = new Date().getTime() + 1000;
    }, 0);
  });

  $(document).bind("keydown", "a", function() {
    triggerGlobalUntil = new Date().getTime() + 1000;
  });

  $(document).bind("keydown", "t", function() {
    if (new Date().getTime() < triggerGlobalUntil) {
      thumbnails.forEach(function(thumbnail) {
        thumbnail.attemptTrigger(Categories.TECH);
      });
    }
  });

  $(document).bind("keydown", "d", function() {
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
