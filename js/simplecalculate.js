// ATB increases and cumulative increase

var atbincrease = [.03,.03,.04],
    cumulative = atbincrease.reduce(function(a,b) { return a + b; });


$(document).ready(function() {

  // hide panels

  $(".panel-body").css("display","none");

  // adding commas function

  function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }


  var plotwages = function(w) {

    wages.y2015 = (w * atbincrease[0]) + w;
    wages.y2016 = (wages.y2015 * atbincrease[1]) + wages.y2015;
    wages.y2017 = (wages.y2016 * atbincrease[2]) + wages.y2016;

  }

  var plotsalaries = function(h) {

    // annual gross wage

    salary.agwage = wages.basewage * h * 52;
    salary.y2015 = wages.y2015 * h * 52;
    salary.y2016 = wages.y2016 * h * 52;
    salary.y2017 = wages.y2017 * h * 52;

    // calculate wage differences

    wages.additional = {
      y2015: (salary.y2015 - salary.agwage) * .98,
      y2016: (salary.y2016 - salary.agwage) * .98,
      y2017: (salary.y2017 - salary.agwage) * .98,
    };

    // Additional pay over contract

    wages.additional.overall = commaSeparateNumber((wages.additional.y2015 + wages.additional.y2016 + wages.additional.y2017).toFixed(2));

    // Filling in the information

    // annual gross wage
    $("#agwage").html("$" + commaSeparateNumber(salary.agwage.toFixed(2)));

    // adjusted hourly
    $("#2015").html("$" + wages.y2015.toFixed(2));
    $("#2016").html("$" + wages.y2016.toFixed(2));
    $("#2017").html("$" + wages.y2017.toFixed(2));

    // adjusted gross
    $("#y2015").html("$" + commaSeparateNumber(salary.y2015.toFixed(2)));
    $("#y2016").html("$" + commaSeparateNumber(salary.y2016.toFixed(2)));
    $("#y2017").html("$" + commaSeparateNumber(salary.y2017.toFixed(2)));

    // addditional wages
    $("#add2015").html("$" + commaSeparateNumber(wages.additional.y2015.toFixed(2)));
    $("#add2016").html("$" + commaSeparateNumber(wages.additional.y2016.toFixed(2)));
    $("#add2017").html("$" + commaSeparateNumber(wages.additional.y2017.toFixed(2)));

    // additional pay over contract
    $("#overall").html(wages.additional.overall);

  }

    var wages = { basewage: Number($("#inputHourlyWage").val()) },
        salary = { hours: Number($("#inputHours").val()) };

    // plotting the hourly wages for each year

    plotwages(wages.basewage);

    // plotting the salary for each year

    plotsalaries(salary.hours);


  // CALCULATE FUNCTION

  $("#calculate").click( function() {

    wages = { basewage: Number($("#inputHourlyWage").val()) };
    salary = { hours: Number($("#inputHours").val()) };

    plotwages(wages.basewage);
    plotsalaries(salary.hours);

    $("#pay").slideDown();

  });


  // TOGGLE SECTIONS

  $(".panel-heading").click( function() {
    $(this).next().slideToggle();
  });

});
