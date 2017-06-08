$(function() {
  var Categories = {
    NONE: 0,
    DIRECTOR: 1,
    DEVELOPMENT: 2,
    MENTORS: 4,
    TECHNOLOGY: 8,
    EDUCATION: 16,
    ALL: 31
  };

  var timeHumanizer = humanizeDuration.humanizer({
    units: ["mo", "d", "h", "m"],
    delimiter: " and ",
    round: true,
    largest: 2
  });

  function Notification(category, url, title, description, timeout, expiration) {
      var trigger = function() {
        if (!window.open(url, "_blank")) {
          alert("Allow popups for the website.");
        }
      };

      var expiration = moment(expiration, "MM-DD-YYYY").add(1, "days").diff(moment(), "milliseconds");

      this.filter = function(filter) {
        return (filter & category) && 0 < expiration;
      };

      this.generate = function() {
        var alert = $("<div></div>")
          .hide()
          .addClass("alert alert-info alert-dismissible")
          .attr("role", "alert")
          .append($("<button></button>")
            .addClass("close")
            .attr("type", "button")
            .attr("data-dismiss", "alert")
            .append($("<span></span>")
              .html("&times;")))
          .append($("<span></span>")
            .text(description))
          .append($("<a></a>")
            .addClass("alert-link")
            .attr("href", url)
            .attr("target", "_blank")
            .text(title))
          .append($("<span></span>")
            .text(" (ends in " + timeHumanizer(expiration) + ")"));

        setTimeout(function() {
          alert.show("slow");
        }, 0);
        setTimeout(function() {
          alert.hide("slow", function() {
            alert.alert("close");
            scheduleNextNotification();
          });
        }, timeout);

        return alert;
      };
  };

  var notifications = [
    new Notification(Categories.ALL, "https://www.lovetoride.net/washington/teams/1271?locale=en-US", "omegaUp Team", "Enroll into the Bike Everywhere Challenge, and join the ", 10000, "05-31-2017"),
    new Notification(Categories.ALL, "https://goo.gl/forms/C1KdJnvl064y7tQp2", "𝝮Up.org Logo", "Don't forget to answer the surver ", 10000, "05-05-2017"),
    new Notification(Categories.ALL, "https://goo.gl/forms/VzRfSAzIfdO1eer53", "Books for the Mentors Program", "Don't forget to answer the survey ", 10000, "05-15-2017"),
  ].filter(function(notification) {
    return notification.filter(Categories.ALL);
  });

  notifications.sort(function () { return 0.5 - Math.random(); });

  var scheduleNextNotification = function() {
    setTimeout(function() {
      if (notifications.length) {
        $("#notification-container").append(notifications[0].generate());
        notifications.push(notifications.shift());
      }
    }, 2000);
  };

  scheduleNextNotification();
})
