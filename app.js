const apiKey = '023b98ec9f8f486e91eebcbf2bea8528'
//const defaultSource = 'the-washington-post';
const defaultSource = 'All Sources';
const sourceSelector = document.querySelector('#sources');
const newsArticles = document.querySelector('main');
const searchBtn=document.querySelector("#searchBtn");
const topBtn=document.querySelector("#returnToTop");

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('sw.js')
      .then(registration => console.log('Service Worker registered'))
      .catch(err => 'SW registration failed'));
}

window.addEventListener('load', e => {
  sourceSelector.addEventListener('change', evt => updateNews(evt.target.value));
  updateNewsSources().then(() => {
      sourceSelector.value = defaultSource;
      updateNews();
   });
});
window.addEventListener('online', () => updateNews(sourceSelector.value));

async function updateNewsSources() {
  const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
  const json = await response.json();
  sourceSelector.innerHTML =
    json.sources
      .map(source => `<option value="${source.id}">${source.name}</option>`)
      .join('\n');
	  sourceSelector.insertAdjacentHTML("afterbegin", `<option value="All Sources">All Sources</option>`);
}

async function updateNews(source = defaultSource) {
  newsArticles.innerHTML = '';
  document.getElementById("searchTxt").value='';
  if(source=="All Sources")
	  searchNews();
  else{
	const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
	const json = await response.json();
	newsArticles.innerHTML =
    json.articles.map(createArticle).join('\n');
  }
}

function createArticle(article) {
  return `
    <div class="article">
      <a href="${article.url}">
        <h2>${article.title}</h2>
        <img src="${article.urlToImage}" alt="${article.title}">
        <p>${article.description}</p>
      </a>
    </div>
  `;
}

async function searchNews() {
  sourceSelector.value = defaultSource;
  var searchTxt=document.querySelector("#searchTxt").value;
  newsArticles.innerHTML = '';
  var response;
  if(searchTxt.trim()=="")
      response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
  else 
      response = await fetch(`https://newsapi.org/v2/top-headlines?q=${searchTxt}&apiKey=${apiKey}`);
  const json = await response.json();
  newsArticles.innerHTML =
    json.articles.map(createArticle).join('\n');
}

window.addEventListener('scroll', () => goToTop());
function goToTop() {
  var top = document.documentElement.scrollTop || document.body.scrollTop;
  if(top>100)
  {
    topBtn.style.display = 'block';
  }else{
    topBtn.style.display = 'none';
  }
}

async function loadHeadlines() {
  newsArticles.innerHTML = '';
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
  const json = await response.json();
  newsArticles.innerHTML =
    json.articles.map(createArticle).join('\n');
}
