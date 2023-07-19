// Ignore!
// No JavaScript needed for this pattern
// JavaScript is only used for the form that illustrates the options.

$("#changeUp").on("click",function(e){

  e.preventDefault();

  var selectedValue = $("#selector-list option:selected").val();
  var newClass = selectedValue + " hero-banner";
  var codeExampleText = $("#codeExampleClass").text();
  var constrainClass = "constrain";

  $("#this-hero").removeAttr('class');
  $("#this-hero").attr('class', newClass);

  if (codeExampleText.indexOf(" " + constrainClass) > -1) {

    $("#codeExampleClass").text(selectedValue + " " + constrainClass);

  } else {

    $("#codeExampleClass").text(selectedValue);

  }

  if($("#constrainMe").is(':checked')){

    $("#this-hero").addClass(constrainClass);

    if (codeExampleText.indexOf(" " + constrainClass) === -1) {

      $("#codeExampleClass").text(codeExampleText + " " + constrainClass);

    }

  } else {

    var currentText = $("#codeExampleClass").text().replace(" " + constrainClass, "");

    $("#codeExampleClass").text(currentText);

  }

  $("#form-update").empty();

  setTimeout(function(){

    $("#form-update").text("Layout and HTML updated.");

  }, 500);

});
