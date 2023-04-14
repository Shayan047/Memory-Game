var clicks = 0;
var clickOne = "";
var clickTwo = "";
var correct = [];
var isAnimating = false;
var order, paired = 0, position = 1;


function checkClicked(cardOne, cardTwo) {
    const data1 = $(cardOne).attr("id");
    const data2 = $(cardTwo).attr("id");
    return data1 === data2;
};

function nextPlayer(scoreArray, maxPlayers, playerIncrease, scoreIncrease) {
    const currentPosition = ".box:nth-child(" + position + ")";
    scoreArray[position - 1] += scoreIncrease;
    $(currentPosition).children("h1").text(scoreArray[position - 1]);
    position += playerIncrease;
    if(position > maxPlayers) {
        position = 1;
    }
    const nextPosition = ".box:nth-child(" + (position) + ")";
    $(currentPosition).removeClass("active");
    $(nextPosition).addClass("active");
};

function endGame(done, total, scoreArray) {
    var x = 0;
    setTimeout(()=> {

        if(done == total) {
            $(".backdrop").removeClass("hidden");
            $(".score-board").removeClass("hidden");
            $(".score-board").css({
                "animation": "pop-up 0.5s"
            });
            $(".players-score").children("h1").each(function() {
                $(this).text(scoreArray[x]);
                x++;
            });
        };

    }, 500)
    
}

$(document).ready(function() {

    $(".box:nth-child(1)").addClass("active");

    const gameData = JSON.parse(localStorage.getItem("gameData"));
    const size = gameData.size;
    const maxPlayers = gameData.playersNum;
    const scoreArray = new Array(Number(maxPlayers)).fill(0);

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
                clickTwo = this;
                setTimeout(() => {
                    if(checkClicked(clickOne, clickTwo)) {
                        $(clickOne).find(".back").addClass("correct");
                        $(clickTwo).find(".back").addClass("correct");
                        correct.push(clickOne, clickTwo);
                        paired += 1;
                        endGame(paired, size, scoreArray);
                        nextPlayer(scoreArray, maxPlayers, 0, 1);
                    } else {
                        $(clickOne).children(".card").removeClass("rotate");
                        $(clickTwo).children(".card").removeClass("rotate");
                        nextPlayer(scoreArray, maxPlayers, 1, 0);
                    }
                    clicks = 0;
                    clickOne = null;
                    clickTwo = null;
                    isAnimating = false;
                }, 1000);
            };
        };
    });

});