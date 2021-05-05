'use strict';

const optTitleListSelector = '.titles';
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optArticleTagsSelector = '.post-tags .list';
const optTagLinkSelector = '.list-horizontal a';
const optActiveSelector = 'a.active[href^="#tag-"]';
const optArticleAuthorSelector = 'data-author';
const optAuthorWrap = '.tags a';
const optPostAuthor = '.post-author';
//console.log(optArticleSelector);

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){

    /* [DONE] remove class 'active' from all article links  */

    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.post.active');

  for(let activeArticle of activeArticles){

    /* [DONE] remove class 'active' from all articles */

    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  /* [DONE] add class 'active' to the correct article */
  
  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);

  /* [ DONE ] remove contents of titleList */

  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

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

    html = html + linkHTML;
  }

  /* [ DONE ] insert link into titleList */

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){

  /* [ DONE ] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);  
  
  /* START LOOP: for every article: */

  for(let article of articles){

    /* [ DONE ] find tags wrapper */

    const titleList = article.querySelector(optArticleTagsSelector);
    
    /* [ DONE ] make html variable with empty string */

    let html = '';

    /* [ DONE ] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    
    /* [ DONE ] split tags into array */

    const articleTagsArray = articleTags.split(' ');
    
    /* [ DONE ] START LOOP: for each tag */

    for(let tag of articleTagsArray){

      /* [ DONE ] generate HTML of the link */
      
      const linkHTML = '<li><a href="#tag-' + tag + '"><span class="post-tags">' + tag+ '</span></a></li>';

      /* [ DONE ] add generated code to html variable */

      html = html + linkHTML;

      /* [ DONE ] END LOOP: for each tag */
    }

    /* [ DONE ] insert HTML of all the links into the tags wrapper */

    titleList.innerHTML = html;

    /* [ DONE ] END LOOP: for every article: */
  }

}

generateTags();

function tagClickHandler(event){

  /* [ DONE ] prevent default action for this event */

  event.preventDefault();

  /* [ DONE ] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [ DONE ] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* [ DONE ] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* [ DONE ] find all tag links with class active */

  const activeTags = document.querySelectorAll(optActiveSelector);

  /* [ DONE ] START LOOP: for each active tag link */
  /* [ DONE ] remove class active */

  for(let activeTag of activeTags){
    activeTag.classList.remove('active');

    /* [ DONE ] END LOOP: for each active tag link */
  }
 
  /* [ DONE ] find all tag links with "href" attribute equal to the "href" constant */

  const linksHref = document.querySelectorAll('href');
  
  /* [ DONE ] START LOOP: for each found tag link */
  
  for(let href of linksHref){

    /* [ DONE ] add class active */

    href.classList.add('active');

    /* [ DONE ] END LOOP: for each found tag link */
  }

  /* [ DONE ] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){

  /* [ DONE ] find all links to tags */

  const tagLink = document.querySelectorAll(optTagLinkSelector);

  /* [ DONE ] START LOOP: for each link */

  for(let href of tagLink){

    /* [ DONE ] add tagClickHandler as event listener for that link */

    href.addEventListener('click', tagClickHandler);

    /* [ DONE ] END LOOP: for each link */
  }

}

addClickListenersToTags();





function generateAuthors(){

  const authors = document.querySelectorAll(optArticleSelector);
  
  for(let author of authors){
    let html = '';
    const authorList = author.getAttribute(optArticleAuthorSelector);
    console.log(authorList);
    const linkHTML = '<li><a href="#' + authorList + '"><span class="post-tags">' + authorList + '</span></a></li>';
    console.log(linkHTML);
    
    //console.log(html);
    //const wrapAuthors = author.querySelector(optPostAuthor);
    //console.log(wrapAuthors);
    //author.innerHTML = '';
   

    optPostAuthor.classList.add('linkHTML');


    //html = html + linkHTML;
    
    
    author.innerHTML = html;
  }
  
}

generateAuthors();





function authorClickHandler(event){
  event.preventDefault();


  generateTitleLinks('[data-author="' + author + '"]');
}





function addClickListenersToAuthors(){
  const authorLink = document.querySelectorAll(optAuthorWrap);
  for(let link of authorLink){
    link.addEventListener('click', generateAuthors);
  }

}

addClickListenersToAuthors();
