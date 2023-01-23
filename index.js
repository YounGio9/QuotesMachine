var quotes
var colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857',
    '#333'
  ];
var currentQuote = ''
var currentColor = ''
var currentAuthor = ''


const getQuotes = () => {
 return $.ajax({
    type: "GET",
    url: "https://api.github.com/gists/9e92ecc4dd1109d26e0f76750419645b",
    dataType: "json",
    success: (res) => {
        quotes = res.files['quotes.json'].content;

        if(typeof quotes === 'string') {
            quotes = JSON.parse(quotes)
            quotes = quotes.quotes
        }
        console.log(quotes)     
    }
});
}

const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)]
}

const getRandomColor = () => {
    return colors[
        Math.floor(Math.random() * colors.length)
    ]
}
const getQuote = () => {
    var quote = getRandomQuote()
    var currentAuthor = quote.author
    var currentQuote = quote.quote
    var currentColor = getRandomColor()

    $('#text-c').animate({ opacity: 0 }, 500, function () {
        
        $(this).animate({
            opacity: 1
        }, 500)
        $('#text').text(currentQuote)
    })
    
    $('#author').animate({opacity: 0}, 500, function () {
        $(this).text(`- ${currentAuthor}`)
        $(this).animate({
            opacity: 1
        }, 500)
    })
    $('html body').animate({
        backgroundColor: currentColor,
        color: currentColor
    }, 1000);

    $('#new-quote').animate({
        backgroundColor: currentColor
    }, 1000)

    $('#tweet-quote').animate({
        opacity: 0
    }, 500, function () {
        $(this).animate({
            opacity: 1,
            backgroundColor: currentColor
        })
        $(this).attr(
            'href', 
            'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURI(
                '"' + currentQuote + '" ' + currentAuthor )
        )

    })
}

$('#new-quote').text('New quote')


$(() => {
    getQuotes().then(() => {
        getQuote()
    })

    $('button').click(() => {
        getQuote()
    }) 

})