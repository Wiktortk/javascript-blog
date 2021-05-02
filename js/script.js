'use strict';

const optTitleListSelector = '.titles';
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optArticleTagsSelector = '.post-tags .list';
const optTagLinkSelector = '.tags a';
const optActiveSelector = 'a.active[href^="#tag-"]';

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
};

function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);

  /* [ DONE ] remove contents of titleList */

  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  //console.log(customSelector);
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
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){

  /* [ DONE ] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for(let article of articles){

    /* [ DONE ] find tags wrapper */

    const titleList = article.querySelector(optArticleTagsSelector);
    //console.log(titleList);

    /* [ DONE ] make html variable with empty string */

    let html = '';

    /* [ DONE ] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);

    /* [ DONE ] split tags into array */

    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);

    /* [ DONE ] START LOOP: for each tag */

    for(let tag of articleTagsArray){

      /* [ DONE ] generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' +  tag + '"><span>' +  tag  + '</span></a></li>';
      //console.log(linkHTML);

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

  /* [ IN PROGRESS ] make a new constant "tag" and extract tag from the "href" constant */

  //const tag = document.querySelectorAll(href);to moja próba ogarnięcia tego samemu
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* [ IN PROGRESS ] find all tag links with class active */

  const activeTags = document.querySelector(optActiveSelector);

  /* [ IN PROGRESS ] START LOOP: for each active tag link */
  /* [ IN PROGRESS ] remove class active */

  //const tagLinks = document.querySelectorAll(activeTags);

  for(let activeTag of activeTags){
    activeTag.classList.remove('active');

    /* [ IN PROGRESS ] END LOOP: for each active tag link */
  }
  //console.log(activeTags);
  /* [ IN PROGRESS ] find all tag links with "href" attribute equal to the "href" constant */

  const linksHref = document.querySelectorAll('href');
  //console.log(linksHref);

  /* [ IN PROGRESS ] START LOOP: for each found tag link */
  /* [ IN PROGRESS ] add class active */

  for(let href of linksHref){
    href.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  /* [ IN PROGRESS ] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){
  /* find all links to tags */
  const tagLink = document.querySelectorAll(optTagLinkSelector);
  console.log(tagLink);
  /* START LOOP: for each link */
  for(let href of tagLink){
    /* add tagClickHandler as event listener for that link */
    href.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }

}

addClickListenersToTags();
