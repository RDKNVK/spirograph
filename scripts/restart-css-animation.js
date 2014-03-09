// http://css-tricks.com/restart-css-animation/

function resetElem(sel) {
 var el = $(sel),  
 newone = el.clone(true);
 el.before(newone);
 $("." + el.attr("class") + ":last").remove();
}