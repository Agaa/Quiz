$(document).ready(function(){
    var source   = $("#entry-template").html();
    var template = Handlebars.compile(source);

    $('.slajder2').append(template(data));
    for (var i=0, len=data.questions.length; i<len; i++) {
        var circles = $('.circles');
        circles.append("<li class='circle'></li>");
    }
    
//    
    var  questionNumber = 0,
    correctAnswer = data.questions[questionNumber].correctAnswer;
       
       
    $('.answers li').on('click', function(){
    var $this = $(this),
    userAnswer = $this.html(); //pobieramy odpowiedź wybraną przez użytkownika
    console.log(userAnswer);
    console.log(correctAnswer);
        if (userAnswer === correctAnswer) {
            $this.addClass('correct');
            addCircle('fullCircle');
            nextQuestion();
        } else {
            $this.addClass('incorrect');
            addCircle('emptyCircle');
            nextQuestion();
        }
    });
    
    //dodaje zamalowane lub puste kółka w zależności od poprawności odpowiedzi
    function addCircle(className){
         $('.circle:not(.fullCircle, .emptyCircle):first').addClass(className);
    }

    //przejście do kolejnego pytania
    function transition() {
        $('.content').animate({
                left: '-=980'
            }, 2000);
    }
    //pobranie kolejnej prawidłowej odpowiedzi z tablicy pasującej do pytania
    function nextAnswer(){
        questionNumber++;
        correctAnswer = data.questions[questionNumber].correctAnswer;
    }
 
    //przejście do kolejnego pytania lub wyświetlenie tablicy koncowej
    function nextQuestion() {
        var len = data.questions.length;
        if (questionNumber+1 === len) {
            var scores = $('.fullCircle').length, //zlicza ilość poprawnych odpowiedzi
            percentage = scores/len*100;
            $('span#score').append(scores + ' (' + parseInt(percentage) + '%)');
            $('#finalScore').fadeIn(2000);
        }else{
            transition();
            nextAnswer();
        }
    }
    
    $('#playAgain').on('click', function(){
        var circle = $('.circle'),
        answers = $('.answers li');
        $('.content').css('left', '0');
        $('#finalScore').hide();
        circle.removeClass('fullCircle');
        circle.removeClass('emptyCircle');
        answers.removeClass('correct');
        answers.removeClass('incorrect');
        console.log(questionNumber);
        var questionNumber = 0;
    });
    
});


var data = {
questions: [
    {
        "question":"Polska waluta?",
        "answers": [
            "złoty", "euro", "frank"
        ],
        "correctAnswer": "złoty"
    },
    {
        "question":"Obecny rok",
        "answers": [
            "2018", "2014", "2000"
        ],
        "correctAnswer": "2014"
    },
    {
        "question":"Co znosi kura",
        "answers": [
            "marchewki", "klocki", "jajo"
        ],
        "correctAnswer": "jajo"
    },
      {
        "question":"Stolica Polski",
        "answers": [
            "Anakara", "Warszawa", "Ateny"
        ],
        "correctAnswer": "Warszawa"
    },
    {
        "question":"Co daje krowa",
        "answers": [
            "sok", "mleko", "woda"
        ],
        "correctAnswer": "mleko"
    }   
]
};