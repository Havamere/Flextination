<<<<<<< HEAD
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
=======
$( document ).ready(function() {

	//Flight information js

	//End of flight information js

	//weather information js

	//End of weather information js

	//yelp or tripadvisor information js

	//End of yelp or tripadvisor js

})


>>>>>>> master
