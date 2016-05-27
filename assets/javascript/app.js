
$( function () {
        $('#datetimepicker6').datetimepicker();
        $('#datetimepicker7').datetimepicker({
            useCurrent: false //Important! See issue #1075
        });
        $("#datetimepicker6").on("dp.change", function (e) {
            $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
        });
        $("#datetimepicker7").on("dp.change", function (e) {
            $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
        });
    });
$('.dropdown-toggle').dropdown();

// Itineratry function

/* start an object containing a date, weather, and activities
    set conditional to see if same date 
    -if same date, add to itinerary list
    -if not equal, create new itinerary
    have setItinerary function for add-to button

*/

/*
    $('#question'+e+':checked').val()
    planner = [day1,day2,day3]
    planner = [
        {date: '15/10/2010', weather: '800', activities: ["biking","hiking","sun bathing"]},
        {date: '16/10/2010', weather: '400', activities: ['shopping','indoor mini-golf','movie']}
    ]
*/

var planner = [];

$('#add-to').on('click', function(){
    var itineraryDate = $('.weatherRadioButtons:checked').attr('data');/*selector for radio button date value (see trivia homework)*/
        //console.log(itineraryDate);
    var itineraryWeather = $('.weatherRadioButtons:checked').val();/*selector for radio button weather value*/
        //console.log(itineraryWeather);
    var itineraryActivity = $('.resultbuttons:checked').val();/*selector for checkbox of activities*/
        console.log(itineraryActivity);
    $.each(planner, function(element){
        if (itineraryDate == element.date) {
            element.activities.push(itineraryActivity);
        } else {
            planner.push(new itinerary(itineraryDate, itineraryWeather, itineraryActivity));
        }
    })
    console.log(planner);
})


function itinerary(date, weather, activities) {
    this.date = date;
    this.weather = weather;
    this.activities = activities;
}

