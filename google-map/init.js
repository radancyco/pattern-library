/*!

  Radancy Pattern Library: Google Map for Jobs

  Contributor(s):
  Bobby KC, Email: bobby.kc@radancy.com
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy

*/

var clientHandle = googleMapConfig.client;
var feedURL = "https://services1-tmpwebeng-com.tmpqa.com/location/GoogleMap/";
var map;
var geocoder = new google.maps.Geocoder();

var JobsGoogleMap = JobsGoogleMap || {};

JobsGoogleMap.Util = {};

JobsGoogleMap.Var = {

  // Define global veriables for Location Feature

  marker1: {},
  markerPlaces: {},
  infowindow: new google.maps.InfoWindow({}),
  latlng1: null,
  scrolled: 0,
  currentMarker: null,
  refreshMarker: false,
  directionsDisplay: null

}

JobsGoogleMap.Util.init = function () {

  // Set All Util Functions

  this.formatName = function (vname) {

    // var rName = vname.toLowerCase().replace(/ /g, '-');

    var rName = vname.replace('#', '');
    rName = rName.replace(',', '');
    return rName;

  }

  this.setIsMobile = function () {

    var viewportWith = $(window).width();
    var mobileBreakpoint = 768;

    if (viewportWith < mobileBreakpoint) {

      return true;

    }

    return false;

  }

  this.log = function (vmsg) {

    console.log(vmsg);

  }

  this.scrollto = function (vElement) {

    JobsGoogleMap.Util.log("scroll to " + vElement + "-" + $(vElement).offset().top)

    setTimeout(function () {

      $('html, body').animate({ scrollTop: $(vElement).offset().top - 10 }, 1000);

    }, 200);

  }

  this.setHash = function (vhash) {

    if (location.hash == "#" + vhash) {

      return false;

    }

    JobsGoogleMap.Util.log(location.hash + "setting hash-" + vhash);

    if (history.pushState) {

      history.pushState(null, null, '#' + vhash);

    } else {

      location.hash = '#' + vhash;

    }

  }

  this.fillHash = function (hashVal) {

    if (hashVal.length == 0) {

      return "all";

    } else {

      return hashVal;

    }

  }

  /*

  this.setStateActive = function (vstate) {

    $('#location-list h3').find("a[href=#" + vstate + "]").trigger("click");

  }

  this.scollToLocation = function (elm) {

    JobsGoogleMap.Var.scrolled = $(".map-search-container__location").offset().top;

    $(".map-search-container").animate({

      scrollTop: scrolled

    });

  }

  */

  this.initPopup = function () {

    JobsGoogleMap.Util.log("initPopup called ");

    $(".gm-style-iw").addClass("map-info__dialog");
    $('.map-info__dialog').attr("aria-labelledby", "map-info-listing");

    // Close Button

    $('.map-info__dialog button').removeAttr("title").click(function () {

     $('.map-search-container__list li').removeClass("active");

    });

    // Escape Key

    $(document).on("keyup", function(e) {

    if (e.key == "Escape") {

        // $('.map-search-container__list li:nth-child(' + JobsGoogleMap.Var.currentFocusIndex + ') button').focus();
        // Bobby, we don't appear to need this as Google already setting focus for us.

        $('.map-search-container__list li').removeClass("active");

      }

    });

    $('.map-info__dialog, .map-info__btn').removeAttr("tabindex");

    // Trap Focus within dialog

    // Add all the elements inside modal which you want to make focusable

    const  focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('.map-info__dialog'); // select the modal by it's id
    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

    document.addEventListener('keydown', function(e) {

      let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

      if (!isTabPressed) {

        return;

      }

      if (e.shiftKey) { // If shift key pressed for shift + tab combination

        if (document.activeElement === firstFocusableElement) {

          lastFocusableElement.focus(); // Add focus for the last focusable element
          e.preventDefault();

      }

    } else { // If tab key is pressed

      if (document.activeElement === lastFocusableElement) { // If focused has reached to last focusable element then focus first focusable element after pressing tab

        firstFocusableElement.focus(); // Add focus for the first focusable element
        e.preventDefault();

      }

    }

  });

  firstFocusableElement.focus();

  }

}

JobsGoogleMap.Util.Loading = {

  city: function (isLoading) {

    if (isLoading) {

      JobsGoogleMap.Selector.$selCity.css("visibility","hidden");

      $('#loading-city').show();

    } else {

      $('#loading-city').fadeOut(500, function () {

        JobsGoogleMap.Selector.$selCity.css("visibility", "visible");

      });

    }

  }, state: function (isLoading) {

    if (isLoading) {

      JobsGoogleMap.Selector.$selState.css("visibility", "hidden");

      $('#loading-state').show();

    } else {

      $('#loading-state').fadeOut(500, function () {

        JobsGoogleMap.Selector.$selState.css("visibility", "visible");

      });

    }

  }, map: function (isLoading) {

    if (isLoading) {

      $('.map-search-alternative').show();
      $('.map-search-container').hide();

    } else {

      $('.map-search-alternative').hide();
      $('.map-search-container').show();
      $('#search-clear').show();

    }

  }

};

JobsGoogleMap.Util.init(); // Initialize  all util methids
JobsGoogleMap.Selector = {};

JobsGoogleMap.Selector.init = function () {

  this.$searchClear = $("#search-clear");
  this.$locationList = $(".map-search-container__list");
  this.$searchMap = $("#search-submit-location");
  this.$myLocation = $("#my-location");
  this.$selState = $("#map-search-state");
  this.$selCity = $("#map-search-city");
  this.$txtZip = $("#map-search-zip");

}

JobsGoogleMap.Location = {};
JobsGoogleMap.Location.Map = {}; //Core Google Map routine

// Location specific Var

JobsGoogleMap.Location.deepHashLink = JobsGoogleMap.Util.formatName(location.hash);
JobsGoogleMap.Util.isMobile = JobsGoogleMap.Util.setIsMobile();

$(document).ready(function () {

  // Only execute if googel map container exists

  if ($("#google-job-map").length) {

    if (!googleMapConfig.searchDomain) {

      googleMapConfig.searchDomain = "";

    }

    if (!googleMapConfig.searchCustomFieldName) {

      googleMapConfig.searchCustomFieldName = "custom_fields.Shift";

    }

    // initDOM

    JobsGoogleMap.Location.Map.DOM.init();

    // init all selectors

    JobsGoogleMap.Selector.init();

    // Map Event Handler

    JobsGoogleMap.Location.Map.Events.init();

    if (JobsGoogleMap.Util.isMobile) {

      $('.map-search-container__map').insertBefore($('.map-search-container__toggle'));

    }

  }

});

// DOM rendering

JobsGoogleMap.Location.Map.DOM = {

  init: function () {

    var mapDOM = '<div class="map-search" role="search" aria-label='+ JSON.stringify(googleMapConfig.label.a11yFormName) + '>'+

    ' <div class="map-search__filters">'+

    '   <div class="map-search__field">'+

    '     <label for="map-search-state">' + googleMapConfig.label.state + '</label>' +

    '     <span class="map-search__spinner" id="loading-state"></span>'+

    '     <select id="map-search-state" required style="visibility: hidden;">' +
    '       <option value=""> ' + googleMapConfig.label.select + ' </option>' +
    '     </select>'+

    '   </div>'+

    '   <div class="map-search__field">'+

    '     <label for="map-search-city">' + googleMapConfig.label.city + '</label>' +

    '     <span class="map-search__spinner" id="loading-city"></span>'+

    '     <select id="map-search-city" style="visibility: hidden;">' +
    '       <option value=""> ' + googleMapConfig.label.select + ' </option>' +
    '     </select>' +

    '   </div>'+

    '   <div class="map-search__field">'+

    '     <label for="map-search-zip">' + googleMapConfig.label.zip + '</label>' +

    '     <input autocomplete="postal-code" id="map-search-zip" type="text" inputmode="numeric" pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$">'+

    '   </div>'+

    '   <div class="map-search__cta">'+

    '     <button id="search-submit-location" type="submit" aria-label=' + JSON.stringify(googleMapConfig.label.search) + '><span>' + googleMapConfig.label.search + '</span></button>' +

    '     <button id="search-clear" type="reset" aria-label=' + JSON.stringify(googleMapConfig.label.reset) + '><span>' + googleMapConfig.label.reset + '</span></button>' +

    '   </div>'+

    ' </div><!-- /.map-search__filters -->'+

    '</div><!-- /.map-search -->'+

    '<div class="map-search-alternative">'+

    '  <button id="my-location" class="map-search-alternative__button" aria-label=' + JSON.stringify(googleMapConfig.label.useMyLocation) + '><span>' + googleMapConfig.label.useMyLocation + '</span></button>' +

    '  <span class="map-search-alternative__or">' + googleMapConfig.label.or + '</span>' +

    '  <button href="/remote-jobs-vanity-url" class="map-search-alternative__button" aria-label=' + JSON.stringify(googleMapConfig.label.showRemote) + '><span>' + googleMapConfig.label.showRemote + '</span></button>' +

    '</div><!-- /.map-search-alternative -->'+

    '<div class="map-search-container" style="display: none;">'+

    '  <h2 class="map-search-container__heading">' + googleMapConfig.label.locationsHeading + '</h2>' +

    '  <p class="map-search-container__status"></p>' +

    '   <button class="map-search-container__toggle" aria-expanded="false" aria-label=' + JSON.stringify(googleMapConfig.label.toggleLocations) + '>' + googleMapConfig.label.toggleLocations + '<span class="map-search-container__toggle--icon" aria-hidden="true"></span></button>'+

    '  <div class="map-search-container__content">'+

    '   <div class="map-search-container__locations">'+

    '     <ol class="map-search-container__list"></ol>'+

    '   </div>'+

    '   <div class="map-search-container__map">'+

    '     <div id="google-api"></div>'+

    '   </div>'+

    '  </div> <!-- /.map-search-container__content -->'+

    ' </div> <!-- /.map-search-container -->'

    $('#google-job-map').html(mapDOM);
    $('#search-clear').hide();

    $(".map-search-container__toggle").click(function(e) {

      $(this).attr('aria-expanded', function (i, attr) {

        return attr == 'true' ? 'false' : 'true';

      });

      if ($(this).attr('aria-expanded') === "false") {

        $('.map-search-container__map').insertBefore($('.map-search-container__toggle'));
        $('.map-search-container__map').append($('#google-api'));

      }

    });

  }

}

// Event Handlers

JobsGoogleMap.Location.Map.Events = {

  init: function () {

    // This will be JobsGoogleMap.Location.Map.Events

    this.locatoinInit()

  }, locatoinInit: function () {

    // Load States

    $.getJSON(feedURL + "/GetState?handle=" + clientHandle, null, function (data) {

      $.each(data, function (i, item) {

        if (item.length > 0) {

          JobsGoogleMap.Selector.$selState.append('<option value="' + item + '">' + item + '</option>');

        }

      });

      JobsGoogleMap.Util.Loading.state(false);
      JobsGoogleMap.Util.Loading.city(false);

      // DeepHash

      JobsGoogleMap.Location.Map.deepHash();

    });

    // State Selection

    JobsGoogleMap.Selector.$selState.change(function () {

      JobsGoogleMap.Util.Loading.city(true);

      var selState = JobsGoogleMap.Selector.$selState.find(":selected").val();

      $.getJSON(feedURL + "/GetCity?state=" + selState + "&handle=" + clientHandle, null, function (data) {

        $.each(data, function (i, item) {

          JobsGoogleMap.Selector.$selCity.append('<option value="' + item + '">' + item + '</option>');

        });

        JobsGoogleMap.Util.Loading.city(false);

      });

    });

    // Infographic click

    JobsGoogleMap.Selector.$searchMap.click(function (e) {

      if (JobsGoogleMap.Util.isMobile && !$('.map-search-container__map #google-api').length) {

        $('.map-search-container__map').append($('#google-api'));

      }

      // var selCity = JobsGoogleMap.Selector.$selCity.find(":selected").val();
      var selCity = JobsGoogleMap.Selector.$selCity.find(":selected").val();
      var selState = JobsGoogleMap.Selector.$selState.find(":selected").val();
      var selZip = JobsGoogleMap.Selector.$txtZip.val();

      JobsGoogleMap.Util.log("citi=" + selCity + "|state=" + selState + "|zip=" + selZip);

      if (selCity == "" && selState == "" && selZip == "") {

        // alert("Please select City/State or Zip Code");

        if (!$('#map-search-error').length){

          $('.map-search').prepend( '<p id="map-search-error" class="alert">' + googleMapConfig.label.errorMessage + '</p>');

        }

        $("#map-search-state").attr("aria-describedby", "map-search-error").focus();

        return false;

      } else {

        $('#map-search-error').remove();
        $("#map-search-state").removeAttr("aria-describedby")

      }

      if (selZip.length > 0) {

        geocoder.geocode({ 'address': selZip }, function (results, status) {

          if (status == google.maps.GeocoderStatus.OK) {

            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
            JobsGoogleMap.Location.Map.CreateMarkers("", "", selZip + "," + lat + "," + lng);

          } else {

            alert("Geocode was not successful for the following reason: " + status);

          }

        });

      } else {

        JobsGoogleMap.Location.Map.CreateMarkers(selState, selCity, selZip);

      }

      JobsGoogleMap.Util.setHash(JobsGoogleMap.Util.fillHash(selState) + "/" + JobsGoogleMap.Util.fillHash(selCity) + "/" + JobsGoogleMap.Util.fillHash(selZip));

    });

    JobsGoogleMap.Selector.$myLocation.click(function (e) {

      e.preventDefault();
      getGeoLocation();

      // Get GEOLocation city.

    });

    JobsGoogleMap.Selector.$searchClear.click(function (e) {

      JobsGoogleMap.Selector.$selState.val(['']);
      JobsGoogleMap.Selector.$selCity.val(['']);
      JobsGoogleMap.Selector.$txtZip.val("");

      if ($(".map-search-container__map").length > 0) {

        JobsGoogleMap.Location.Map.InItMap();

      }

      $('.map-search-container').hide();
      $('#map-search-assistive-tech').empty(); // Clear AT message.

    });

  }

}

// End Locatoin Event Handlers

JobsGoogleMap.Location.Map.ListLocations = function (data) {

  $('.map-search-container__list').empty();

  var count = 0;

  $.each(data, function (i, item) {

    count++;

    var address = item.address;
    var state = item.state;
    var eCity = item.city;
    var jobCount = item.count;
    var searcURL = googleMapConfig.searchDomain + "/search-jobs?ascf=[{'key':'" + googleMapConfig.searchCustomFieldName + "','value':'" + address + "'}]&orgIds=1242";

    if (jobCount > 1) {

      var jobTerm = googleMapConfig.label.jobCountMsgPlaural;

    } else {

      var jobTerm = googleMapConfig.label.jobCountMsgSingular;

    }

    $('.map-search-container__list').append('<li><button class="map-search-container__btn" data-job-count=' + count + ' data-href="' + searcURL + '"><span class="map-search-container__address">' + address + '<br> ' + eCity + ', ' + state + '</span> <strong class="map-search-container__count">' + jobCount + ' ' + jobTerm + '</strong></button></li>');

  });

  // Job Status Message

  var dataCount = data.length;

  // Note: Using "location(s)" sounds "off" in some screen readers, so handling it this way. Doing similar in location list buttons.

  if (dataCount > 1) {

    var resultsMsg = dataCount + ' ' + googleMapConfig.label.locationCount;

  } else {

    var resultsMsg = dataCount + ' ' + googleMapConfig.label.locationCountSingular;

  }

  var jobStatusMessage = resultsMsg;

  $('.map-search-container__status').text(jobStatusMessage); // Visual Message
  $('#map-search-assistive-tech').text(jobStatusMessage); // Assistive Technology

  JobsGoogleMap.Selector.$locationList.find('.map-search-container__btn').click(function (e) {

    var index = $(this).data("job-count");
    var sMarker = JobsGoogleMap.Var.marker1[index];
    map.setZoom(17);
    map.panTo(sMarker.position);

    new google.maps.event.trigger(sMarker, 'click');

    if (sMarker.getAnimation() != google.maps.Animation.BOUNCE) {

      sMarker.setAnimation(google.maps.Animation.BOUNCE);

    } else {

      sMarker.setAnimation(null);

    }

    if (JobsGoogleMap.Util.isMobile) {

      $that = $(this);

      setTimeout(function () {

        $('.map-search-container__map').append($('#google-api'));

        var container = $('.map-search-container__list'),

        scrollTo = $('.map-search-container__list li').eq(parseInt(index) - 1);

        container.animate({

          scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()

        }, function () { $that.parent().append($('#google-api')); });

      }, 200);

    }

    e.preventDefault();

  });

}

JobsGoogleMap.Location.Map.InItMap = function () {

  $('.map-search-alternative').show();

};

JobsGoogleMap.Location.Map.CreateMarkers = function (state, city, zip) {

  // Initial Setup

  JobsGoogleMap.Util.Loading.map(true);

  // $('.map-search-alternative').hide();

  JobsGoogleMap.Location.Map.clearOverlays();

  // End Initial Setup

  JobsGoogleMap.Util.log("state=" + state);
  JobsGoogleMap.Util.log("cit=" + city);

  var locURL = "";

  if (typeof zip != 'undefined' && zip.length > 0) {

    locURL = feedURL + "/GetLocationByZip?zipcode=" + zip;
    JobsGoogleMap.Util.log("feed url " + locURL);

    $.getJSON(locURL + "&handle=" + clientHandle, null, function (data) {

      JobsGoogleMap.Location.Map.LoadLocation(data);

    });

  } else {

    var zip = "";

    if (city.length > 0) {

      var findLatLonAddr = city;

      if (typeof state !== 'undefined' && state.length > 0) {

        findLatLonAddr = findLatLonAddr + ", " + state;

      }

      geocoder.geocode({ 'address': findLatLonAddr }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {

          var lat = results[0].geometry.location.lat();
          var lng = results[0].geometry.location.lng();

          JobsGoogleMap.Util.log("Geo Add: " + city + " Lat:" + lat + " Lng:" + lng);

          zip = "00000" + "," + lat + "," + lng;
          locURL = feedURL + "/GetLocation?city=" + city + "&state=" + state + "&zipcode=" + zip;

          JobsGoogleMap.Util.log("feed url " + locURL);

          $.getJSON(locURL+"&handle="+clientHandle, null, function (data) {

            JobsGoogleMap.Location.Map.LoadLocation(data);

          });

        } else {

          console.log("Geocode was not successful for the following reason: " + status);

        }

      });

    } else {

      locURL = feedURL + "/GetLocation?city=" + city + "&state=" + state + "&zipcode=" + zip;

      JobsGoogleMap.Util.log("feed url " + locURL);

      $.getJSON(locURL + "&handle=" + clientHandle, null, function (data) {

        JobsGoogleMap.Location.Map.LoadLocation(data);

      });

    }

  }

}

JobsGoogleMap.Location.Map.LoadLocation = function (data) {

  JobsGoogleMap.Var.latlng1 = new Array();

  var myLatlng = new google.maps.LatLng(16.186543, 4.125001);

  var mapStyle = "";

  if (googleMapConfig.styles) {

    mapStyle = googleMapConfig.styles;

  }

  var myOptions = {

    maxZoom: googleMapConfig.maxZoom,
    minZoom: googleMapConfig.minZoom,
    center: myLatlng,
    styles: mapStyle,
    mapTypeControlOptions: {

      mapTypeIds: []

    }, // here�s the array of controls
    backgroundColor: googleMapConfig.backgroundColor,
    animation: google.maps.Animation.DROP,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    panControl: true,
    zoomControl: true,
    streetViewControl: false

  }

  if (map == null || typeof map === 'undefined') {

    map = new google.maps.Map(document.getElementById("google-api"), myOptions);

    if (typeof ga !== 'undefined') {

      console.log("Sending Map Load Event to GA ");

      //ga('send', 'event', 'Map API', 'load', 'Google Map API Load');

      APP.MODELS.GoogleBot.sendCustomDimensions('Custom Event', 'Load', "Google Map API Load", 'event');

    }

  }

  var marker, i;
  var counter = 1;

  JobsGoogleMap.Location.Map.ListLocations(data);

    $.each(data, function (i, item) {

      var lat = item.lat;
      var lon = item.lng;
      var name = $(this).find("a").text();
      var address = item.address;
      var state = item.state;
      var eCity = item.city;
      var zip = item.zip;

      // Define Marker properties

      var image = new google.maps.MarkerImage(googleMapConfig.markerImage);
      var shadowImg = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow", null, null, new google.maps.Point(9, 37));
      var locLatLng = new google.maps.LatLng(lat, lon);
      var infowindowHover = new google.maps.InfoWindow({

        content: '<span>' + address + ' - ' + item.count + ' ' + googleMapConfig.label.markerTooltipJobs + '</span>',
        position: locLatLng

      });

      var marker = new google.maps.Marker({

        position: locLatLng,
        map: map,
        icon: image,
        shadow: shadowImg,
        zoom: 10,
        center: locLatLng

      });

      JobsGoogleMap.Var.latlng1.push(new google.maps.LatLng(lat, lon));
      JobsGoogleMap.Var.marker1[counter] = marker;

      var searchURL = googleMapConfig.searchDomain+"/search-jobs?ascf=[{'key':'" + googleMapConfig.searchCustomFieldName + "','value':'" + address + "'}]&orgIds=1242";
      var categoryInfoContent = "";

      if (googleMapConfig.showCategoryInfo) {

        var $categoryInfo = $("<ul>");

        $.each(item.category.split('|'), function (index, categoryName) {

          if (categoryName.length > 0) {

            $categoryInfo.append("<li>" + categoryName + "</li>");

          }

        });

        categoryInfoContent = $('<p>').append($categoryInfo).prop('outerHTML');

      }

      var content = '<div class="map-info__content"><h3 class="map-info__heading" id="map-info-listing">' + address + '</h3><p>' + item.count + ' ' + googleMapConfig.label.mapInfoAvailablePositions + '</p>' + categoryInfoContent;
      content += '<a class="map-info__btn" href="' + searchURL + '" target="_blank" rel="noopener">' + googleMapConfig.linkText + ' <span class="map-info__new-window">(' + googleMapConfig.label.mapInfoNewWindow + ')</span></a></div>';

      // TODO: Bobby to add switch to disable new window if not desired. Default behavior is always a new window.

      google.maps.event.addListener(marker, 'click', (function (marker, i) {

        return function () {

          infowindowHover.close();

          JobsGoogleMap.Var.currentMarker = marker;

          if (JobsGoogleMap.Var.infowindow) {

            JobsGoogleMap.Var.infowindow.close();

          }

          JobsGoogleMap.Var.infowindow.setContent(content);
          JobsGoogleMap.Var.infowindow.open(map, marker);

          google.maps.event.addListener(JobsGoogleMap.Var.infowindow, 'domready', JobsGoogleMap.Util.initPopup);


          // Scroll to list

          $('.map-search-container__list li').removeClass('active');
          $('.map-search-container__list li').eq(i).addClass('active');

          if (!JobsGoogleMap.Util.isMobile) {

            var container = $('.map-search-container__list'),
            scrollTo = $('.map-search-container__list li').eq(i);

            container.animate({

              scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()

            });

          }

        }

      })(marker, i));

      google.maps.event.addListener(marker, 'mouseover', function () {

        infowindowHover.open(map, marker);

      });

      google.maps.event.addListener(marker, 'mouseout', function () {

        infowindowHover.close();

      });

      google.maps.event.addListener(map, 'idle', function () {

        if (!this.get('dragging') && this.get('oldCenter') && this.get('oldCenter') !== this.getCenter()) {

          // do what you want to

          // alert("a");

        }

        if (!this.get('dragging')) {

          this.set('oldCenter', this.getCenter())

        }

      });

      google.maps.event.addListener(map, 'dragstart', function () {

        this.set('dragging', true);

      });

      google.maps.event.addListener(map, 'dragend', function () {

        this.set('dragging', false);
        google.maps.event.trigger(this, 'idle', {});

      });

      counter++;

    });

    setTimeout(function () {

      JobsGoogleMap.Location.Map.zoomtoAllMarkers(map);

    }, 250);

    JobsGoogleMap.Util.Loading.map(false);

  }

  JobsGoogleMap.Location.Map.deepHash = function () {

    if (JobsGoogleMap.Location.deepHashLink.length > 0) {

      var hashState = JobsGoogleMap.Location.deepHashLink.split('/')[0];
      var hashCity = JobsGoogleMap.Location.deepHashLink.split('/')[1];
      var hashZip = JobsGoogleMap.Location.deepHashLink.split('/')[2];
      var hashLatLog = JobsGoogleMap.Location.deepHashLink.split('/')[3];

      JobsGoogleMap.Util.log("Deep Hash " + hashState + "|" + hashCity + "|" + hashZip + "|" + hashLatLog);

      if (hashZip != "all" && hashZip.length > 0) {

        JobsGoogleMap.Selector.$txtZip.val(hashZip);

      }

      if (hashState != "all" && hashState.length > 0) {

        JobsGoogleMap.Selector.$selState.val(hashState);

        $.getJSON(feedURL + "/GetCity?state=" + hashState + "&handle=" + clientHandle, null, function (data) {

          $.each(data, function (i, item) {

            JobsGoogleMap.Selector.$selCity.append('<option value="' + item + '">' + item + '</option>');

          });

          JobsGoogleMap.Util.Loading.city(false);

          $('.glyphicon-remove').replaceWith('<button class="glyphicon glyphicon-remove" aria-label="' + JSON.stringify(googleMapConfig.label.glyphRemoveCitySelection) + '">' + googleMapConfig.label.glyphRemoveCitySelection + '</button>');

          if (hashCity != "all" && hashCity.length > 0) {

            JobsGoogleMap.Selector.$selCity.val(hashCity);

          }

          JobsGoogleMap.Selector.$searchMap.trigger("click");

        });

      } else if (typeof hashLatLog !== "undefined" && hashLatLog.length > 0) {

        JobsGoogleMap.Location.Map.CreateMarkers("", "", "00000" + "," + hashLatLog.split('x')[0] + "," + hashLatLog.split('x')[1]);

      }

    } else {

      // getGeoLocation();

    }

  }

  JobsGoogleMap.Location.Map.clearOverlays = function () {

 // Reset everything

 JobsGoogleMap.Var.latlng1 = new Array();

 if (JobsGoogleMap.Var.marker1) {

   for (i in JobsGoogleMap.Var.marker1) {

     try {

       JobsGoogleMap.Var.marker1[i].setMap(null);

     }

     catch (err) {

     }

   }

 }

 JobsGoogleMap.Var.marker1 = new Array();

}

JobsGoogleMap.Location.Map.zoomtoAllMarkers = function (vmap) {

  var bounds = new google.maps.LatLngBounds();

  for (var i = 0, LtLgLen = JobsGoogleMap.Var.latlng1.length; i < LtLgLen; i++) {

    //  And increase the bounds to take this point

    bounds.extend(JobsGoogleMap.Var.latlng1[i]);

  }

  vmap.fitBounds(bounds);

}

$(window).on('hashchange', function () {

  // Nothing now

});

// TODO: Bobby, instead of using resize, we may wish to explore window.matchMedia in the future.
// This is more effecient and can allow dev to pass desired breakpoints
// to script, if they wish. - Spell

$(window).resize(function () {

  console.log('Resizing...');

    waitForResize(function () {

      console.log('Resizing Done.');

      JobsGoogleMap.Util.isMobile = JobsGoogleMap.Util.setIsMobile();

      if (!JobsGoogleMap.Util.isMobile) {

        $('.map-search-container__map').insertAfter($('.map-search-container__locations'));
        $('.map-search-container__map').append($('#google-api'));

      } else {

        $('.map-search-container__map').insertBefore($('.map-search-container__toggle'));

      }

    }, 500, "tda-resizse");

  });

  var waitForResize = (function () {

    var timers = {};

    return function (callback, ms, uniqueId) {

      if (!uniqueId) {

        uniqueId = "Don't call this twice without a uniqueId";

      }

      if (timers[uniqueId]) {

        clearTimeout(timers[uniqueId]);

      }

      timers[uniqueId] = setTimeout(callback, ms);

    };

  }

)();

function getGeoLocation() {

  if (navigator.geolocation) {

    return navigator.geolocation.getCurrentPosition(showPosition);

  } else {

    x.innerHTML = "Geolocation is not supported by this browser.";

  }

}

function showPosition(position) {

  var lat = position.coords.latitude;
  var lng = position.coords.longitude;

  JobsGoogleMap.Location.Map.CreateMarkers("", "", "00000" + "," + lat + "," + lng);

  if (typeof ga !== 'undefined') {

    console.log("Sending Map Load Event to GA ");

    // ga('send', 'event', 'Map API Geocode', 'load', 'Google Map API Geocode');

    APP.MODELS.GoogleBot.sendCustomDimensions('Custom Event', 'Load', "Google Map API Geocode", 'event');

  }

  JobsGoogleMap.Util.setHash("all/all/all/" + lat + "x" + lng);

  var latlng = new google.maps.LatLng(lat, lng);
  var city = "";
  geocoder.geocode({ 'latLng': latlng }, function (results, status) {

    if (status == google.maps.GeocoderStatus.OK) {

      if (results[1]) {

        // Formatted address

        // Find country name

        for (var i = 0; i < results[0].address_components.length; i++) {

          for (var b = 0; b < results[0].address_components[i].types.length; b++) {

            if (results[0].address_components[i].types[b] == "locality") {

              city = results[0].address_components[i].short_name;

              JobsGoogleMap.Selector.$selCity.val(city);

              break;

            }

          }

        }

      } else {

        alert("No results found");

        // Bobby, I never saw this message appear in UI, so not sure if we should tokenize it. Also, if it IS related to interface, I may want to send it to HTML instead of using an alert.

      }

    } else {

      alert("Geocoder failed due to: " + status);

    }

  });

}
