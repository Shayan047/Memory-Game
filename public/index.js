var clicks = 0;
var clickOne = "";
var clickTwo = "";
var correct = [];
var moves = 0;
var isAnimating = false;
var order, paired = 0;

function checkClicked(cardOne, cardTwo) {
    const data1 = $(cardOne).attr("id");
    const data2 = $(cardTwo).attr("id");
    return data1 === data2;
};

function endGame(done, total) {
    setTimeout(()=> {

        if(done == total) {
            $(".backdrop").removeClass("hidden");
            $(".score-board").removeClass("hidden");
            $(".score-board").css({
                "animation": "pop-up 0.5s"
            });
            $(".moves-taken h1").text(moves);
        };

    }, 500)
    
}

$(document).ready(function() {

    const size = localStorage.getItem("size");
    console.log(size);
    if(size == 8) {
        order = 16;
        $(".cards").css({
            "height": "460px",
            "width": "460px"
        });
    } else if(size == 18) {
        order = 36;
        $(".cards").css({
            "height": "660px",
            "width": "660px"
        });
    };

    $(".container").each(function(event) {
        $(this).css({
            order: Math.floor(Math.random() * order) + 1
        });
    });

    $(".container").click(function(event) {
        if(this != clickOne && this != clickTwo && !correct.includes(this) && !isAnimating) {
            isAnimating = true;
            clicks += 1;
            $(this).children(".card").addClass("rotate");
            if(clicks == 1) {
                clickOne = this;
                isAnimating = false;
            } else if(clicks == 2) {
                moves += 1;
                clickTwo = this;
                setTimeout(() => {
                    $(".moves h1").text(moves);
                    if(!checkClicked(clickOne, clickTwo)) {
                        $(clickOne).children(".card").removeClass("rotate");
                        $(clickTwo).children(".card").removeClass("rotate");
                    } else {
                        $(clickOne).find(".back").addClass("correct");
                        $(clickTwo).find(".back").addClass("correct");
                        paired += 1;
                        correct.push(clickOne, clickTwo);
                        endGame(paired, size);
                    }
                    clicks = 0;
                    clickOne = null;
                    clickTwo = null;
                    isAnimating = false;
                }, 1000)   
            };
        };
    });

});