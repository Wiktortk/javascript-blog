'use strict';

const optTitleListSelector = '.titles';
const optArticleSelector = '.post'; 
const optTitleSelector = '.post-title';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post.active'); 

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');  
}

function generateTitleLinks(){

  const titleList = document.querySelector(optTitleListSelector);

  /* [ DONE ] remove contents of titleList */

  titleList.innerHTML = '';
   
  const articles = document.querySelectorAll(optArticleSelector);
  
  let html = '';

  /* [ DONE ] for each article */
  
  for(let article of articles){
  
    /* [ DONE ] get the article id */

    const articleId = article.getAttribute('id');

    /* [ DONE ] find the title element */
    /* [ DONE ] get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    
    /* [ DONE ] create HTML of the link */
    
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    html = html + linkHTML
  }

  /* [ DONE ] insert link into titleList */

  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
