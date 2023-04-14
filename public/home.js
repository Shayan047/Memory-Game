$(document).ready(function() {

    $(".players-btns label").click(function() {
        $(".players-btns label").each(function(event) {
            $(this).removeClass("selected");
        });
        $(this).addClass("selected");
    });

    $(".grid-btns label").click(function() {
        $(".grid-btns label").each(function(event) {
            $(this).removeClass("selected");
        });
        $(this).addClass("selected");
    });

    $("form").submit(function() {
        
        const players = $("input[name=noOfPlayers]:checked").val();
        const size = $("input[name=size]:checked").val();

        localStorage.setItem("gameData", JSON.stringify({
            "playersNum": players,
            "size": size
          }));
          
    });

});