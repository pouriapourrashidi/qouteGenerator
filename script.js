const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const Loader =  document.getElementById('loader');

let apiQuote = [];


// Loading sign for getting new quote
function loading(){
    Loader.hidden=false;
    quoteContainer.hidden=true;
}

function completing(){
    Loader.hidden=true;
    quoteContainer.hidden=false;
}

// showing new quote
function newQuote(){
    loading();
    const quote = apiQuote [Math.floor(Math.random() * apiQuote.length)]
    console.log(quote); 
    if (!quote.author){
        quoteAuthor.textContent = 'Unknown';
    }else{
        quoteAuthor.textContent = quote.author;
    }
    
    if (quote.text.length > 80){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    completing();
}

// getting qoutes from api
async function getQuote(){
    loading();
    const apiURL='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    // try{

        // const response = await fetch(apiURL);
        // apiQuote = await response.json();
        // newQuote();
        fetch(apiURL).then(data => data.json()).then(Quote=> {apiQuote=Quote;
            newQuote();});

    // }catch(error){

    // }
}

function tweetQuote(){
    const tweetURL=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(tweetURL, '_blank');
}

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

getQuote();

