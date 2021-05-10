'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  artLink: Handlebars.compile(document.querySelector('#template-art-link').innerHTML),
}

const optTitleListSelector = '.titles';
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optActive = 'active';
const optHref = 'href';
const optConstActive = '.post.active';
const optTitlesSelector = '.titles a.active';
const optArticleTagsSelector = '.post-tags .list';
const optTagLinkSelector = '.list-horizontal a';
const optActiveSelector = 'a.active[href^="#tag-"]';
const optArticleAuthorSelector = 'data-author';
const optAuthorWrap = '.post-author a';
const optPostAuthor = '.post-author';
const optActiveAutor = 'a.active[href^="#"]';
//const optTagsListSelector = '.tags.list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';
const optAuthorsListSelector = '.list.authors';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll(optTitlesSelector);

  for(let activeLink of activeLinks){

    /* [DONE] remove class 'active' from all article links  */

    activeLink.classList.remove(optActive);
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add(optActive);

  const activeArticles = document.querySelectorAll(optConstActive);

  for(let activeArticle of activeArticles){

    /* [DONE] remove class 'active' from all articles */

    activeArticle.classList.remove(optActive);
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute(optHref);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */
  
  targetArticle.classList.add(optActive);
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

    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    
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

function calculateTagsParams(tags){
  console.log(tags);
  const params = {
    max: 0, 
    min: 9999
  };
  
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }

  }

  return params;
}

function calculateTagClass(count,params){
  
  const normalizedCount = count - params.min;
  //console.log(normalizedCount);
  
  const normalizedMax = params.max - params.min;
  //console.log(normalizedMax);
  
  const percentage = normalizedCount / normalizedMax;
  //console.log(percentage);
  
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
  
}

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  
  let allTags = {};

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
      
      //const linkHTML = '<li><a href="#tag-' + tag + '"><span class="post-tags">' + tag + '</span></a></li>';
      const linkHTML = {id: tag};
      const html = templates.articleTag(linkHTML);
      titleList.insertAdjacentHTML('beforeend', html);
      
      /* [ DONE ] add generated code to html variable */

      //html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      
      if(!allTags[tag]) {
      
        /* [NEW] add tag to allTags object */
      
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* [ DONE ] END LOOP: for each tag */
    }

    /* [ DONE ] insert HTML of all the links into the tags wrapper */

    //titleList.innerHTML = html;

    /* [ DONE ] END LOOP: for every article: */
  } 

  /* [NEW] find list of tags in right column */
  
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */

  const tagsParams = calculateTagsParams(allTags);
  
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */

  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '('+allTags[tag]+')</a></li>';
    
    allTagsHTML += tagLinkHTML;    
    
    /* [NEW] END LOOP: for each tag in allTags: */
  }
  
  /*[NEW] add HTML from allTagsHTML to tagList */
  
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){

  /* [ DONE ] prevent default action for this event */

  event.preventDefault();

  /* [ DONE ] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [ DONE ] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute(optHref);

  /* [ DONE ] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* [ DONE ] find all ta g links with class active */

  const activeTags = document.querySelectorAll(optActiveSelector);
  
  /* [ DONE ] START LOOP: for each active tag link */
  /* [ DONE ] remove class active */

  for(let activeTag of activeTags){
    activeTag.classList.remove(optActive);

    /* [ DONE ] END LOOP: for each active tag link */
  }
 
  /* [ DONE ] find all tag links with "href" attribute equal to the "href" constant */

  const linksHref = document.querySelectorAll(optHref);
  
  /* [ DONE ] START LOOP: for each found tag link */
  
  for(let href of linksHref){

    /* [ DONE ] add class active */

    href.classList.add(optActive);

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

  let allTags = {};

  const authors = document.querySelectorAll(optArticleSelector);

  const authorSideBarWrapper = document.querySelector(optAuthorsListSelector);
  console.log(authorSideBarWrapper);

  for(let author of authors){
    const authorList = author.getAttribute(optArticleAuthorSelector);
    console.log(authorList);

    const articleAttributeBy = authorList.replace('#', '');

    if(!allTags[articleAttributeBy]) {
      allTags[articleAttributeBy] = 1;
    }
    else {
      allTags[articleAttributeBy]++;
    }
    //let authorTag = '<a href="#' + articleAttributeBy + '">' + articleAttributeBy + '</a';
    const linkHTMLData = {id: articleAttributeBy};
    const authorTag = templates.artLink(linkHTMLData);


    const authorWrapper = author.querySelector('.post-author');
    authorWrapper.innerHTML = authorTag;
  }
  for (let authorWrap in allTags) {
    authorSideBarWrapper.innerHTML+= '<li><a href="#' + authorWrap + '">' + authorWrap + '(' + allTags[authorWrap] + ')' + '</a></li>';
  }

  const tagList = document.querySelector('.authors');

  const tagsParams = calculateTagsParams(allTags);
  
  let allTagsHTML = '';
  
  for(let tag in allTags){

    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '('+allTags[tag]+')</a></li>';
    
    allTagsHTML += tagLinkHTML;    
  }
  
  tagList.innerHTML = allTagsHTML;
}

generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const elementClick = clickedElement.getAttribute(optHref);
  const author = elementClick.replace('#', '');
  const activeAutors = document.querySelectorAll(optActiveAutor);
  for(let activeAutror of activeAutors){
    activeAutror.classList.remove(optActive);
  }
  const linksHref = document.querySelectorAll(optHref);
  for(let href of linksHref){
    href.classList.add(optActive);
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const authorLink = document.querySelectorAll(optAuthorWrap);
  for(let link of authorLink){
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
