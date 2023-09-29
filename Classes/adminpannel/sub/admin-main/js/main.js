(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1000);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });


    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#000000";


    // Worldwide Sales Chart
    var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "USA",
                    data: [15, 30, 55, 65, 60, 80, 95],
                    backgroundColor: "rgba(235, 22, 22, .7)"
                },
                {
                    label: "UK",
                    data: [8, 35, 40, 60, 70, 55, 75],
                    backgroundColor: "rgba(235, 22, 22, .5)"
                },
                {
                    label: "AU",
                    data: [12, 25, 45, 55, 65, 70, 60],
                    backgroundColor: "rgba(235, 22, 22, .3)"
                }
            ]
            },
        options: {
            responsive: true
        }
    });


    // Salse & Revenue Chart
    var ctx2 = $("#salse-revenue").get(0).getContext("2d");
    var myChart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "Salse",
                    data: [15, 30, 55, 45, 70, 65, 85],
                    backgroundColor: "rgba(235, 22, 22, .7)",
                    fill: true
                },
                {
                    label: "Revenue",
                    data: [99, 135, 170, 130, 190, 180, 270],
                    backgroundColor: "rgba(235, 22, 22, .5)",
                    fill: true
                }
            ]
            },
        options: {
            responsive: true
        }
    });
    


    // Single Line Chart
    var ctx3 = $("#line-chart").get(0).getContext("2d");
    var myChart3 = new Chart(ctx3, {
        type: "line",
        data: {
            labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
            datasets: [{
                label: "Salse",
                fill: false,
                backgroundColor: "rgba(235, 22, 22, .7)",
                data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Single Bar Chart
    var ctx4 = $("#bar-chart").get(0).getContext("2d");
    var myChart4 = new Chart(ctx4, {
        type: "bar",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Pie Chart
    var ctx5 = $("#pie-chart").get(0).getContext("2d");
    var myChart5 = new Chart(ctx5, {
        type: "pie",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Doughnut Chart
    var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
    var myChart6 = new Chart(ctx6, {
        type: "doughnut",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });

    
})(jQuery);







//start resistretion validation

function checkValidData() {
    let nm = document.userform.uname;
    let name = nm.value;

    if (name == '') {
        nm.focus();
        document.getElementById('errName').innerHTML = "Please enter name";
        document.getElementById('errName').style.color = "#e7b4b4";
        return false;
    } else {
        document.getElementById('errName').innerHTML = "";
    };

    if (name.length < 2 || name.length > 10) {
        nm.focus();
        document.getElementById('errName').innerHTML = "Name must be min 2 or max 10 char";
        document.getElementById('errName').style.color = "red";
        return false;
    } else {
        document.getElementById('errName').innerHTML = "";
    };

    let p = /^[A-Za-z]+$/;
    let a = p.test(name);
    if (a == false) {
        nm.focus();
        document.getElementById('errName').innerHTML = "Please enter only alphabets";
        document.getElementById('errName').style.color = "red";
        return false;
    } else {
        document.getElementById('errName').innerHTML = "";
    };



    let no = document.userform.no;
    let number = no.value;

    if (number == '') {
        no.focus();
        document.getElementById('errNo').innerHTML = "Please enter number";
        document.getElementById('errNo').style.color = "red";
        return false;
    }

    if (number.length < 7 || number.length > 14) {
        no.focus();
        document.getElementById('errNo').innerHTML = "Please enter valid number";
        document.getElementById('errNo').style.color = "red";
        return false;
    } else {
        document.getElementById('errNo').innerHTML = "";
    };


    let e = document.userform.email;
    let email = e.value;

    if (email == '') {
        e.focus();
        document.getElementById('errEmail').innerHTML = "Please enter Email";
        document.getElementById('errEmail').style.color = "red";
        return false;
    }

    let pat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let b = pat.test(email);
    if (b == false) {
        e.focus();
        document.getElementById('errEmail').innerHTML = "Please enter valid Email";
        document.getElementById('errEmail').style.color = "red";
        return false;
    } else {
        document.getElementById('errEmail').innerHTML = "";
    };

    let ps = document.userform.pwd;
    let pas = ps.value;

    if (pas == '') {
        ps.focus();
        document.getElementById('errPwd').innerHTML = "Please enter password";
        document.getElementById('errPwd').style.color = "red";
        return false;
    }

    let p2 = /^[a-zA-Z!@#$%^&*0-9]{6,16}$/;
    let pas2 = p2.test(pas);

    if (pas2 == false) {
        ps.focus();
        document.getElementById('errPwd').innerHTML = "Please enter strong password";
        document.getElementById('errPwd').style.color = "red";
        return false;
    } else {
        document.getElementById('errPwd').innerHTML = "";
    };

    let cp = document.userform.cpwd;
    let cpp = cp.value;

    if (cpp == '') {
        cp.focus();
        document.getElementById('errCPwd').innerHTML = "Please enter password";
        document.getElementById('errCPwd').style.color = "red";
        return false;
    }
    if (pas !== cpp) {
        cp.focus();
        document.getElementById('errCPwd').innerHTML = "password not same";
        document.getElementById('errCPwd').style.color = "red";
        return false;
    } else {
        document.getElementById('errCPwd').innerHTML = "";
    };

    let da = document.userform.date;
    let dat = da.value;

    if (dat == '') {
        da.focus();
        document.getElementById('errdate').innerHTML = "Please enter date";
        document.getElementById('errdate').style.color = "red";
        return false;
    } else {
        document.getElementById('errdate').innerHTML = "";
    };

    let g = document.querySelectorAll("input[type='radio']:checked");
    if (g.length < 1) {
        document.getElementById('errgen').innerHTML = "Please enter gender";
        document.getElementById('errgen').style.color = "red";
        return false;
    } else {
        document.getElementById('errgen').innerHTML = "";
    };

    let h = document.querySelectorAll("input[type='checkbox']:checked");
    if (h.length < 1) {
        document.getElementById('errhoby').innerHTML = "Please enter Hobby";
        document.getElementById('errhoby').style.color = "red";
        return false;
    } else {
        document.getElementById('errhoby').innerHTML = "";
    };

    document.userform.reset;
    localStorage.setItem("username", name);
    localStorage.setItem("useremail", email);
    localStorage.setItem("userpsw", pas);
    
    return true;
}

//end resistretion validation



//start login validation

function check() {
    let pas = document.lform.ps;
    let p2 = pas.value;
    let nm = document.lform.em;
    let name = nm.value
    let d2 = localStorage.getItem('useremail');
    let d3 = localStorage.getItem('userpsw');

    console.log(d2);
    console.log(d3);

    if (name !== d2) {
        nm.focus();
        document.getElementById('errem').innerHTML = "email not resister";
        document.getElementById('errem').style.color = "red";
        return false;

    }

    if (p2 != d3) {
        pas.focus();
        document.getElementById('errps').innerHTML = "wrong password";
        document.getElementById('errps').style.color = "red";
        return false;
    }
  
    return true;
}

//end login validation