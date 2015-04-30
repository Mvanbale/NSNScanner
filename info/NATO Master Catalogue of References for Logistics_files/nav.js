$(document).ready(function () {


    /*$("#mainNav ul.level2").wrap("<div />"); // make sublevel memu items wrapped into a div
    $("#mainNav ul.level3").hide(); // Hide sub-sublevel from menu
    $("#mainNav ul.level4").hide(); // Hide sub-sublevel from menu
    $("#mainNav *").removeClass(); // remove all classes
    $("#mainMenu").contents().unwrap(); // remove wrapping div*/
    $("#mainNav ul:empty").parent().remove();

    // Enabling menu
    $('#mainNav li').hover(function () {
        $(this).children('div').stop(true, true).slideDown('1000');
    }, // mouseout
        function () {
            $(this).children('div').stop(true, true).css('display', 'none');
        }
    );

    /*$("#mainFooter ul.level3").hide();
    $("#mainFooter ul.level4").hide();
    $("#mainFooter *:not(ul.level1)").removeClass(); // remove all classes except level1
    $("#mainFooter ul.level1 > li > a").wrap("<h3>"); // Make top links H3
    $("#mainFooter ul.level1 > li:not(:has(> ul))").hide(); // Hide Top links if no childrens
    $("#footerMenu").contents().unwrap(); // remove wrapping div*/
    /*$("#mainFooter ul:empty").parent().remove();*/
        




        //$("#mainFooter ul:empty").parent().remove();

});