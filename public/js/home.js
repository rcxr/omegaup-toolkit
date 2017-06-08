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
              .append($("<kbd class='hidden-xs hidden-sm'><kbd>g</kbd>, <kbd>" + shortcut + "</kbd></kbd>"))));
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
    new Thumbnail(Categories.ALL, "https://tracker.toptal.com/app/web-tracker", "<i class='towhitecolor glyphicon glyphicon-time'></i>", "track", "", "w"),
    new Thumbnail(Categories.ALL, "slack://omegauporg.slack.com", "<img src='img/slack_monochrome_white.png'></img>", "channels", "", "s"),
    new Thumbnail(Categories.ALL, "http://drive.omegaup.com", "<i class='towhitecolor glyphicon glyphicon-folder-open'></i>", "drive", "", "d"),
    new Thumbnail(Categories.DEV, "https://trello.com/omegaup", "<img src='img/trello-logo-white.png'></img>", "tasks", "", "q"),
    new Thumbnail(Categories.DEV, "https://enterpos.net/omegaup/", "<i class='towhitecolor glyphicon glyphicon-briefcase'></i>", "erp", "", "e"),
    new Thumbnail(Categories.DEV, "onenote:https://d.docs-df.live.net/f3cc87f1cbe7befb/Documentos/OmegaUp/", "<img class='towhitefilter' src='img/AppLockup_rgb_OneNote_Large_OneNote_88.png'></img>", "notes", "", "n"),
    new Thumbnail(Categories.DEV, "http://mail.omegaup.com/", "<i class='towhitecolor glyphicon glyphicon-envelope'></i>", "mail", "", "m"),
    new Thumbnail(Categories.NONE, "https://docs.google.com/a/omegaup.com/spreadsheets/d/1l2H_wFmBOi6bec8cYi8B8mo2mIhf5jNcK5sBzGMPkgk/edit?usp=sharing", "<i class='towhitecolor glyphicon glyphicon-gift'></i>", "orders", "", "x"),
    new Thumbnail(Categories.TECH, "https://github.com/omegaup/omegaup", "<img src='img/GitHub-Mark-Light-120px-plus.png'></img>", "repo", "", "g"),
    new Thumbnail(Categories.SOCIAL, "https://www.facebook.com/omegaup", "<img src='img/FB-f-Logo__white_1024.png'></img>", "fb", "", "f"),
    new Thumbnail(Categories.SOCIAL, "https://twitter.com/omegaUp", "<img src='img/Twitter_Logo_White_On_Image.png'></img>", "tw", "", "t"),
    new Thumbnail(Categories.SOCIAL, "https://www.linkedin.com/company-beta/16244586/", "<img src='img/Logo-White-128px-R.png'></img>", "linkedIn", "", "l"),
    new Thumbnail(Categories.NONE, "https://omegaup.com", "<img src='img/logo.square.white.png'></img>", "com", "", "o"),
    new Thumbnail(Categories.NONE, "https://omegaup.org", "<img src='img/logo.square.white.png'></img>", "org", "", "i"),
    new Thumbnail(Categories.NONE, "https://drive.google.com/open?id=1MhuN-NwpsPI-ICbemvcTMmlzQuP5LQEBIzhsL6ppqxk", "<img src='img/logo.square.white.png'></img>", "bylaws", "", "."),
    new Thumbnail(Categories.ALL, "https://tracker.toptal.com/app/web-tracker", "<i class='towhitecolor glyphicon glyphicon-time'></i>", "track", "", "w"),
  ];

  thumbnails.forEach(function(thumbnail) { $("#dashboard-other").append(thumbnail.generate()); });

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
