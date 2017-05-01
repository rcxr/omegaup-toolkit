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

  function Notification(category, url, title, description, timeout, expiration) {
      var trigger = function() {
        if (!window.open(url, "_blank")) {
          alert("Allow popups for the website.");
        }
      };

      var expiration = moment(expiration).add(1, "day").milliseconds();

      this.filter = function(filter) {
        return (filter & category) &&  moment().milliseconds() < expiration;
      };

      this.generate = function() {
        var alert = $("<div></div>")
          .addClass("alert alert-info alert-dismissible")
          .attr("role", "alert")
          .append($("<button></button>")
            .addClass("close")
            .attr("type", "button")
            .attr("data-dismiss", "alert")
            .append($("<span></span>")
              .html("&times;")))
          .append($("<span></span>")
            .text(instructions))
          .append($("<a></a>")
            .addClass("alert-link")
            .attr("href", url)
            .attr("target", "_blank")
            .text(title))
          .append($("<span></span>")
            .text(" (deadline: " + deadline + ")"));

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
    new Notification(Categories.ALL, "https://www.lovetoride.net/washington/teams/1271?locale=en-US", "omegaUp Team", "Enroll into the Bike Everywhere Challenge, and join the ", 15000, "2017-05-01"),
    new Notification(Categories.ALL, "https://goo.gl/forms/C1KdJnvl064y7tQp2", "𝝮Up.org Logo", "Don't forget to answer the ", 15000, "2017-05-05"),
    new Notification(Categories.ALL, "https://goo.gl/forms/VzRfSAzIfdO1eer53", "Books for the Mentors Program", "Don't forget to answer the ", 15000, "2017-05-01"),
  ];

  notifications.sort(function () { return 0.5 - Math.random(); });

  var scheduleNextNotification = function() {
    setTimeout(function() {
      if (notifications.length) {
        $("#notification-container").append(notifications.shift().generate().hide("slow").show("slow"));
      }
    }, 5000);
  };

  scheduleNextNotification();
})
