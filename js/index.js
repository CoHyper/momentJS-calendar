var app = {
    init: function() {
        app.createCalendar(3);
    },
    createCalendar: function(id) {
        id = _.isNumber(id) && id > 0 ? id : 1;
        var output = "",
            calendar_node = $("#calendar"),
            i = 0;

        calendar_node.html("");

        for (i; i < id; i++) {
            output += _.bind(_.template([
                '<tr>',
                    '<th colspan="7"><%= monthName %></th>',
                '</tr>',
                '<tr>',
                    // todo with global momentJS weeksname
                    '<% _.forEach(weekName, function(name) { %>',
                        '<th><%= name %></th>',
                    '<% }); %>',
                '</tr>',
                    // todo here start firstDayWeekDay
                '<tr>',
                    '<% if (firstDayWeekDay > 0) { %>',
                        '<td colspan="<%= firstDayWeekDay %>">&nbsp;</td>',
                    '<% } %>',
                    '<% for (var k = 0; k < daysInMonth; k++) { %>',
                        '<% if (firstDayWeekDay++ % 7 == 0) { %>', // todo || firstDayWeekDay == 0, then have double TR
                            '<tr>',
                        '<% } %>',
                        '<td align="center"><%= (k + 1) %></td>',
                    '<% } %>',
                    '<% if (firstDayWeekDay % 7 > 0) { %>',
                        '<td colspan="<%= 7 - (firstDayWeekDay % 7) %>">&nbsp;</td>',
                    '<% } %>',
                '</tr>'
            ].join(""),
            {
                monthName: moment().add(i, "month").format("MMMM YYYY"),
                weekName: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
                firstDayWeekDay: moment().add(i, "month").subtract(moment().add(i, "month").format("D"), 'days').day(),
                daysInMonth: moment().add(i, "month").endOf('month').format("D")
            }), i);
        }
        app.nodes.month.append(output);
    } // end for()
};