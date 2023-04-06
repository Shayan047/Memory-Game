var size = 8;
localStorage.setItem("size", size);

$(document).ready(function() {

    $(".grid-btns button").click(function(event) {
        $(".play-btn").attr("value", 0);
        $(".grid-btns button").each(function(event) {
            $(this).removeClass("selected");
        });

        $(this).addClass("selected");
        $(".play-btn").attr("value", $(this).attr("value"));
        size = Number($(this).attr("value"));
        localStorage.setItem("size", size);
    })

});