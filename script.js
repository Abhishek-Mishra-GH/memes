let sr = "/memes";
let eurl = "https://meme-api.com/gimme";
let URL = "https://meme-api.com/gimme/memes"
const oldMemes = [];
const main = document.getElementById("main");

loadMore();

window.onscroll = () => {
    if(window.innerHeight + window.scrollY >= (document.body.offsetHeight - 300)) loadMore();
}

// Functions
function update() {
    eurl += "/" + document.getElementById("subreddit").textContent.replace(/\s/g, "");
    URL = eurl;
    main.innerHTML = "";
    loadMore();
}




function appendMeme(memeUrl) {
    const meme = document.createElement("img");
    const hr = document.createElement("hr");

    meme.classList.add("meme");
    meme.src = memeUrl;
    meme.attributes.loading = 'lazy';

    main.appendChild(meme);
    main.appendChild(hr);
}

async function loadMore() {
    let uniqueMemes = 0;
    while(uniqueMemes <= 10) {
        const memeUrl = await loadMeme();
        if(isMemeOld(memeUrl)) continue;
        oldMemes.push(memeUrl);
        appendMeme(memeUrl);
        uniqueMemes++;
    }
}

async function loadMeme() {
    const res = await fetch(URL);
    const data = await res.json();
    let memeUrl = data.url;
    return memeUrl;
}

function isMemeOld(memeUrl) {
    if(oldMemes.includes(memeUrl)) return true;
    return false;
}
