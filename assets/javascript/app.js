//function for calendar drop-ups
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

//builds itinerary object
function itinerary(date, weather, name, address, rating, phone) {
    this.date = date;
    this.weather = weather;
    this.name = name;
    this.address = address;
    this.rating = rating;
    this.phone = phone;
}
