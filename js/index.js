
function createCalendar(id) {
    id = _.isNumber(id) && id > 0 ? id : 1;
    moment.locale("de");

    var output = "",
        i = 0;

    for (i; i < id; i++) {
        output += _.template([
            '<tr>',
                '<th colspan="7"><%= monthName %></th>',
            '</tr>',
            '<tr>',
                '<% _.forEach(weekName, function(name) { %>',
                    '<th><%= name %></th>',
                '<% }); %>',
            '</tr>',
                // todo here start firstDayWeekDay
            '<tr>',
                '<% for (var p = lastMonthDays - firstDayWeekDay; p < lastMonthDays; p++) { %>',
                    '<td class="OverMonth"><%= p + 1 %></td>',
                '<% } %>',
                '<% for (var k = 0; k < daysInMonth; k++) { %>',
                    '<% if (firstDayWeekDay != 0 && firstDayWeekDay++ % 7 == 0) { %>',
                        '<tr>',
                    '<% } %>',
                    '<td id="<%= year_month_day(k) %>"><%= k + 1 %></td>',
                '<% } %>',
                '<% for (var m = 0; m < 7 - (firstDayWeekDay % 7); m++) { %>',
                    '<td class="OverMonth"><%= m + 1 %></td>',
                '<% } %>',
            '</tr>'
        ].join(""),
        {
            lastMonthDays: moment().add(i - 1, "month").endOf('month').format("D"),
            year_month_day: function(k) {
                return "date_" + moment().add(i, "month").startOf("month").add(k, "day").format("YYYY_MM_DD");
            },
            monthName: moment().add(i, "month").format("MMMM YYYY"),
            // todo with global momentJS weeksnames
            weekName: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
            //firstDayWeekDay: moment().add(i, "month").subtract(moment().add(i, "month").format("D"), 'days').day(),
            firstDayWeekDay: moment().add(i, "month").startOf("month").day(),
            daysInMonth: moment().add(i, "month").endOf('month').format("D")
        });

    } // end for()

    
    //console.log(moment().format("DD"));
    //console.log(moment().startOf("month").startOf('isoweek')); //-> 28
    //console.log(moment().startOf("month").startOf('isoday')); //-> friday
    // 
    // difference between the current day to sunday
    //console.log(moment().diff(moment().startOf('week'),'days'));
    // 
    // this week's wedesday
    //console.log(moment().startOf('week').add(3, 'days'));
    //
    // 
    console.log(moment().day("isoweek").format("dd")); // -> So -> true
    /* todo : date is 1 day in future
     * the week started with sunday
     * dateISO
     */

    $(document.body).append("<table>" + output + "</table>");
} 
