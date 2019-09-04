"use strict";

function map_month(month){
    if(month == 'January'){
        return 1;
    }
    else if(month == 'February'){
        return 2;
    }
    else if(month == 'March'){
        return 3;
    }
}
function Calendar(a, b, c, d, f) {
    this.id = a, this.size = b, this.labelSettings = c, this.colors = d, this.initday = 0, f = f || {}, this.indicator = !0, f.indicator != void 0 && (this.indicator = f.indicator), this.indicator_type = 1, f.indicator_type != void 0 && (this.indicator_type = f.indicator_type), this.indicator_pos = 1 == this.indicator_type ? "bottom" : "top", f.indicator_pos != void 0 && (this.indicator_pos = f.indicator_pos);
    var g = document.createElement("LI");
    g.className = "cjslib-list-placeholder", g.appendChild(document.createTextNode("No events on this day")), this.placeholder = g.outerHTML, f.placeholder != void 0 && (this.placeholder = f.placeholder);
    var h = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    f.months != void 0 && 12 == f.months.length && (h = f.months);
    var k = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.defaultLabels = k, f.days != void 0 && 7 == f.days.length && (k = f.days), this.months = h, this.label = [], this.labels = [];
    for (var l = 0; 7 > l; l++) this.label.push(k[k.indexOf(c[0]) + this.label.length >= k.length ? Math.abs(k.length - (k.indexOf(c[0]) + this.label.length)) : k.indexOf(c[0]) + this.label.length]);
    for (var l = 0; 7 > l; l++) this.labels.push(this.label[l].substring(0, 3 < c[1] ? 3 : c[1]));
    this.date = new Date, this.today = new Date, this.draw(), this.update(), this.setOnClickListener("days-blocks"), this.setOnClickListener("month-slider"), this.setOnClickListener("year-slider")
}
Calendar.prototype = {
    constructor: Calendar,
    back: function(b) {
        var c = this.date,
            d = new Date(11 < c.getMonth() + 1 ? c.getFullYear() + 1 : c.getFullYear(), 12 < c.getMonth() + 1 ? 0 : c.getMonth() + 1, 0).getDate(),
            f = new Date(0 > c.getMonth() ? c.getFullYear() - 1 : c.getFullYear(), 0 > c.getMonth() ? 11 : c.getMonth(), 0).getDate();
        "month" == b ? (c.getDate() > f && this.changeDateTo(f), 0 < c.getMonth() ? c.setMonth(c.getMonth() - 1) : (c.setMonth(11), c.setFullYear(c.getFullYear() - 1))) : "year" == b && c.setFullYear(c.getFullYear() - 1), this.update()
    },
    next: function(b) {
        var c = this.date,
            d = new Date(11 < c.getMonth() + 1 ? c.getFullYear() + 1 : c.getFullYear(), 12 < c.getMonth() + 1 ? 0 : c.getMonth() + 1, 0).getDate(),
            f = new Date(11 < c.getMonth() + 2 ? c.getFullYear() + 1 : c.getFullYear(), 12 < c.getMonth() + 2 ? 0 : c.getMonth() + 2, 0).getDate();
        "month" == b ? (c.getDate() > f && this.changeDateTo(f), 11 == c.getMonth() ? (c.setMonth(0), c.setFullYear(c.getFullYear() + 1)) : c.setMonth(c.getMonth() + 1)) : c.setFullYear(c.getFullYear() + 1), this.update()
    },
    changeDateTo: function(b, c) {
        if (31 <= c && 11 >= b || 6 >= c && 8 <= b) {
            31 <= c && 11 >= b ? this.next("month") : 6 >= c && 8 <= b && this.back("month"), this.date.setDate(b);
            var d = this;
            return setTimeout(function() {
                d.update()
            }, 1), !0
        }
        this.date.setDate(b)
    }
}, Calendar.prototype.draw = function() {
    var a = "<svg style=\"width: 24px; height: 24px;\" viewBox=\"0 0 24 24\"><path fill=\"" + this.colors[3] + "\" d=\"M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z\"></path></svg>",
        b = "<svg style=\"width: 24px; height: 24px;\" viewBox=\"0 0 24 24\"><path fill=\"" + this.colors[3] + "\" d=\"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z\"></path></svg>",
        c = document.createElement("DIV");
    c.className = "cjslib-calendar cjslib-size-" + this.size, document.getElementById(this.id).appendChild(c.cloneNode(!0));
    for (var d = [], f = ["year", "month", "labels", "days"], g = 0; g < f.length; g++)
        if (d[g] = document.createElement("DIV"), d[g].className = "cjslib-" + f[g], "days" != f[g])
            if ("month" == f[g]) {
                d[g].style.backgroundColor = this.colors[0], d[g].style.color = this.colors[2];
                var h = document.createElement("DIV");
                h.id = this.id + "-month-back", h.insertAdjacentHTML("beforeend", a), d[g].appendChild(h.cloneNode(!0));
                var k = document.createElement("SPAN");
                k.id = this.id + "-" + f[g], d[g].appendChild(k.cloneNode(!0));
                var l = document.createElement("DIV");
                l.id = this.id + "-month-next", l.insertAdjacentHTML("beforeend", b), d[g].appendChild(l.cloneNode(!0))
            } else if (d[g].style.backgroundColor = this.colors[1], d[g].style.color = this.colors[3], "labels" != f[g]) {
        var h = document.createElement("DIV");
        h.id = this.id + "-year-back", h.insertAdjacentHTML("beforeend", a), d[g].appendChild(h.cloneNode(!0));
        var k = document.createElement("SPAN");
        k.id = this.id + "-" + f[g], d[g].appendChild(k.cloneNode(!0));
        var l = document.createElement("DIV");
        l.id = this.id + "-year-next", l.insertAdjacentHTML("beforeend", b), d[g].appendChild(l.cloneNode(!0))
    }
    for (var m, g = 0; g < this.labels.length; g++) m = document.createElement("SPAN"), m.id = this.id + "-label-" + (g + 1), m.appendChild(document.createTextNode(this.labels[g]).cloneNode(!0)), d[2].appendChild(m.cloneNode(!0));
    for (var n = [], o = [], p = [], g = 0; 6 > g; g++) n[g] = document.createElement("DIV"), n[g].className = "cjslib-row";
    for (var g = 0, q = 0; 42 > g; g++) {
        p[g] = document.createElement("INPUT"), p[g].className = "cjslib-day-radios", p[g].type = "radio", p[g].name = this.id + "-day-radios", p[g].id = this.id + "-day-radio-" + (g + 1), o[g] = document.createElement("LABEL"), o[g].className = "cjslib-day", o[g].htmlFor = this.id + "-day-radio-" + (g + 1), o[g].id = this.id + "-day-" + (g + 1);
        var k = document.createElement("SPAN");
        if (k.className = "cjslib-day-num", k.id = this.id + "-day-num-" + (g + 1), o[g].appendChild(k.cloneNode(!0)), this.indicator) {
            var r = document.createElement("SPAN");
            r.className = "cjslib-day-indicator cjslib-indicator-pos-" + this.indicator_pos, 1 == this.indicator_type && (r.className += " cjslib-indicator-type-numeric"), r.id = this.id + "-day-indicator-" + (g + 1), o[g].appendChild(r.cloneNode(!0))
        }
        n[q].appendChild(p[g].cloneNode(!0)), n[q].appendChild(o[g].cloneNode(!0)), 0 == (g + 1) % 7 && q++
    }
    for (var g = 0; 6 > g; g++) d[3].appendChild(n[g].cloneNode(!0));
    for (var g = 0; g < d.length; g++) c.appendChild(d[g].cloneNode(!0));
    document.getElementById(this.id).innerHTML = "<style>.cjslib-day-indicator { color: " + this.colors[1] + "; background-color: " + this.colors[1] + "; } .cjslib-indicator-type-numeric { color: " + this.colors[2] + "; } .cjslib-day.cjslib-day-today > .cjslib-day-num { border-color: " + this.colors[1] + " !important; }</style>", document.getElementById(this.id).appendChild(c.cloneNode(!0))
}, Calendar.prototype.update = function() {
    document.getElementById(this.id + "-year").innerHTML = this.date.getFullYear(), document.getElementById(this.id + "-month").innerHTML = this.months[this.date.getMonth()];
    for (var a = 1; 42 >= a; a++) document.getElementById(this.id + "-day-num-" + a).innerHTML = "", document.getElementById(this.id + "-day-" + a).className = this.id + " cjslib-day cjslib-day-listed";
    var b = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay(),
        c = new Date(11 < this.date.getMonth() + 1 ? this.date.getFullYear() + 1 : this.date.getFullYear(), 12 < this.date.getMonth() + 1 ? 0 : this.date.getMonth() + 1, 0).getDate(),
        d = new Date(0 > this.date.getMonth() ? this.date.getFullYear() - 1 : this.date.getFullYear(), 0 > this.date.getMonth() ? 11 : this.date.getMonth(), 0).getDate();
    this.initday = this.label.indexOf(this.defaultLabels[b]);
    for (var f = this.defaultLabels[b], g = this.label.indexOf(f), a = 0, h = d; a < g; a++, h--) document.getElementById(this.id + "-day-num-" + (g - a)).innerHTML = h, document.getElementById(this.id + "-day-" + (g - a)).className = this.id + " cjslib-day cjslib-day-diluted";
    for (var a = 1; a <= c; a++) document.getElementById(this.id + "-day-num-" + (g + a)).innerHTML = a, a == this.date.getDate() && (document.getElementById(this.id + "-day-radio-" + (g + a)).checked = !0), this.date.getMonth() == this.today.getMonth() && a == this.today.getDate() && (document.getElementById(this.id + "-day-" + (g + a)).className += " cjslib-day-today");
    for (var a = c + 1, h = 1; 42 >= g + a; a++, h++) document.getElementById(this.id + "-day-num-" + (g + a)).innerHTML = h, document.getElementById(this.id + "-day-" + (g + a)).className = this.id + " cjslib-day cjslib-day-diluted"
}, Calendar.prototype.setupBlock = function(a, b, c) {
    document.getElementById(b.id + "-day-" + a).onclick = function() {
        0 < document.getElementById(b.id + "-day-num-" + a).innerHTML.length && (b.changeDateTo(document.getElementById(b.id + "-day-num-" + a).innerHTML, a), c())
    }
}, Calendar.prototype.setOnClickListener = function(a, b, c) {
    var d = this.id;
    b = b || function() {}, c = c || function() {};
    var f = this;
    switch (a) {
        case "days-blocks":
            for (var g = 1; 42 >= g; g++) f.setupBlock(g, f, b);
            break;
        case "month-slider":
            document.getElementById(d + "-month-back").onclick = function() {
                f.back("month"), b()
            }, document.getElementById(d + "-month-next").onclick = function() {
                f.next("month"), c()
            };
            break;
        case "year-slider":
            document.getElementById(d + "-year-back").onclick = function() {
                f.back("year"), b()
            }, document.getElementById(d + "-year-next").onclick = function() {
                f.next("year"), c()
            };
    }
};

function Organizer(a, b, c) {
    this.id = a, this.calendar = b, this.data = c || {}, this.draw();
    var d = this;
    d.onMonthChange(function() {
        d.indicateEvents()
    }), this.setOnClickListener("days-blocks"), this.setOnClickListener("day-slider"), this.setOnClickListener("month-slider"), this.setOnClickListener("year-slider")
}
Organizer.prototype = {
    constructor: Organizer,
    back: function(b) {
        var c = this.calendar.date,
            d = new Date(11 < c.getMonth() + 1 ? c.getFullYear() + 1 : c.getFullYear(), 12 < c.getMonth() + 1 ? 0 : c.getMonth() + 1, 0).getDate(),
            f = new Date(0 > c.getMonth() ? c.getFullYear() - 1 : c.getFullYear(), 0 > c.getMonth() ? 11 : c.getMonth(), 0).getDate();
        if ("day" == b) {
            if (1 != c.getDate()) this.changeDateTo(c.getDate() - 1), this.update();
            else {
                this.calendar.back("month"), this.changeDateTo(d);
                var g = this;
                g.onMonthChange(function() {
                    g.indicateEvents()
                })
            }
            document.getElementById(this.calendar.id + "-day-radio-" + (this.calendar.initday + c.getDate())).checked = !0
        } else {
            this.calendar.back(b);
            var g = this;
            g.onMonthChange(function() {
                g.indicateEvents()
            })
        }
    },
    next: function(b) {
        var c = this.calendar.date,
            d = new Date(11 < c.getMonth() + 1 ? c.getFullYear() + 1 : c.getFullYear(), 12 < c.getMonth() + 1 ? 0 : c.getMonth() + 1, 0).getDate(),
            f = new Date(11 < c.getMonth() + 2 ? c.getFullYear() + 1 : c.getFullYear(), 12 < c.getMonth() + 2 ? 0 : c.getMonth() + 2, 0).getDate();
        if ("day" == b) {
            if (c.getDate() != d) c.setDate(c.getDate() + 1), this.update();
            else {
                this.calendar.next("month"), c.setDate(1);
                var g = this;
                g.onMonthChange(function() {
                    g.indicateEvents()
                })
            }
            document.getElementById(this.calendar.id + "-day-radio-" + (this.calendar.initday + c.getDate())).checked = !0
        } else {
            this.calendar.next(b);
            var g = this;
            g.onMonthChange(function() {
                g.indicateEvents()
            })
        }
    },
    changeDateTo: function(b, c) {
        var d = this.calendar.changeDateTo(b, c),
            f = this;
        setTimeout(function() {
            d ? f.onMonthChange(function() {
                f.indicateEvents()
            }) : f.update()
        }, 1)
    }
}, Organizer.prototype.draw = function() {
    var a = "<svg style=\"width: 24px; height: 24px;\" viewBox=\"0 0 24 24\"><path fill=\"" + this.calendar.colors[3] + "\" d=\"M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z\"></path></svg>",
        b = "<svg style=\"width: 24px; height: 24px;\" viewBox=\"0 0 24 24\"><path fill=\"" + this.calendar.colors[3] + "\" d=\"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z\"></path></svg>",
        c = document.createElement("DIV");
    c.className = "cjslib-events cjslib-size-" + this.calendar.size;
    var d = document.createElement("DIV");
    d.className = "cjslib-date", d.style.backgroundColor = this.calendar.colors[1], d.style.color = this.calendar.colors[3];
    var f = document.createElement("DIV");
    f.id = this.id + "-day-back", f.insertAdjacentHTML("beforeend", a), d.appendChild(f.cloneNode(!0));
    var g = document.createElement("SPAN");
    g.id = this.id + "-date", d.appendChild(g.cloneNode(!0));
    var h = document.createElement("DIV");
    h.id = this.id + "-day-next", h.insertAdjacentHTML("beforeend", b), d.appendChild(h.cloneNode(!0));
    var k = document.createElement("DIV");
    k.className = "cjslib-rows";
    var l = document.createElement("OL");
    l.className = "cjslib-list", l.id = this.id + "-list", k.appendChild(l.cloneNode(!0)), c.appendChild(d.cloneNode(!0)), c.appendChild(k.cloneNode(!0)), document.getElementById(this.id).appendChild(c.cloneNode(!0))
}, Organizer.prototype.update = function() {
    document.getElementById(this.id + "-date").innerHTML = this.calendar.months[this.calendar.date.getMonth()] + " " + this.calendar.date.getDate() + ", " + this.calendar.date.getFullYear(), document.getElementById(this.id + "-list").innerHTML = "", this.showEvents()
}, Organizer.prototype.list = function(a) {
    console.log(this.calendar.date.getMonth()+1 + "," + this.calendar.date.getDate() + ", " + this.calendar.date.getFullYear());
    //-------------------------HANDLE ON CLICK EVENT BELLOW------------------------------------------
    populateSelect((this.calendar.date.getMonth()+1),this.calendar.date.getDate(),this.calendar.date.getDate());
    setDate(this.calendar.date.getFullYear(),(this.calendar.date.getMonth()+1),this.calendar.date.getDate() )
    document.getElementById(this.id + "-list").innerHTML = "";
    for (var d, b = document.createElement("UL"), c = 0; c < a.length; c++) {
        d = document.createElement("LI"), d.id = this.id + "-list-item-" + c;
        var f = document.createElement("DIV"),
            g = document.createElement("SPAN");
        g.id = this.id + "-list-item-" + c + "-time", g.class = this.id + " time", g.appendChild(document.createTextNode(a[c].startTime + " - " + a[c].endTime)), f.appendChild(g);
        var h = document.createElement("P");
        h.id = this.id + "-list-item-" + c + "-text", h.appendChild(document.createTextNode(a[c].text)), d.appendChild(f), d.appendChild(h), b.appendChild(d)
    }
    document.getElementById(this.id + "-list").innerHTML = b.innerHTML, 0 == a.length && this.showPlaceholder()
}, Organizer.prototype.setupBlock = function(a, b, c) {
    var d = b.calendar;
    document.getElementById(d.id + "-day-" + a).onclick = function() {
        0 < document.getElementById(d.id + "-day-num-" + a).innerHTML.length && (b.changeDateTo(document.getElementById(d.id + "-day-num-" + a).innerHTML, a), c())
    }
}, Organizer.prototype.showEvents = function(a) {
    a = a || this.data;
    var b = this.calendar.date;
    try {
        this.list(a[b.getFullYear()][b.getMonth() + 1][b.getDate()])
    } catch (c) {
        this.showPlaceholder()
    }
}, Organizer.prototype.showPlaceholder = function() {
    document.getElementById(this.id + "-list").innerHTML = this.calendar.placeholder
}, Organizer.prototype.indicateEvents = function(a) {
    a = a || this.data;
    var b = this.calendar.date;
    if (this.calendar.indicator) {
        for (var c = document.getElementsByClassName(this.calendar.id + " cjslib-day cjslib-day-listed"), d = 0; d < c.length; d++) c[d].children[1].innerHTML = "";
        try {
            var f = a[b.getFullYear()][b.getMonth() + 1];
            for (var g in f) 0 < f[g].length && (c[g - 1].children[1].innerHTML = 9 < f[g].length ? "9+" : f[g].length)
        } catch (h) {}
    }
    this.update()
}, Organizer.prototype.onMonthChange = function(a) {
    a()
}, Organizer.prototype.setOnClickListener = function(a, b, c) {
    var d = this.calendar.id,
        f = this.id;
    b = b || function() {}, c = c || function() {};
    var g = this;
    switch (a) {
        case "days-blocks":
            for (var h = 1; 42 >= h; h++) g.setupBlock(h, g, b);
            break;
        case "day-slider":
            document.getElementById(f + "-day-back").onclick = function() {
                g.back("day"), b()
            }, document.getElementById(f + "-day-next").onclick = function() {
                g.next("day"), c()
            };
            break;
        case "month-slider":
            document.getElementById(d + "-month-back").onclick = function() {
                g.back("month"), b()
            }, document.getElementById(d + "-month-next").onclick = function() {
                g.next("month"), c()
            };
            break;
        case "year-slider":
            document.getElementById(d + "-year-back").onclick = function() {
                g.back("year"), b()
            }, document.getElementById(d + "-year-next").onclick = function() {
                g.next("year"), c()
            };
    }
};