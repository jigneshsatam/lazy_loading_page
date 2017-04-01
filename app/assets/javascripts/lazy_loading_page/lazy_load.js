("turbolinks:load DOMContentLoaded ready".split(" ")).forEach(function(e){
  if (window.lazyLoaderInitialize === undefined) {
    document.addEventListener(e, function() {
      lazyLoad();
    })
    window.lazyLoaderInitialize = true
  }
});

function lazyLoad(){
  var $lazy_loaders = document.querySelectorAll(".lazy_load:not([data-later='true']):not([data-loading='started'])");
  for (var i = 0; i < $lazy_loaders.length; i++) {
    (function(i){
      $lazy_loader = $lazy_loaders[i];
      loadElement($lazy_loader);
    })(i);
  };
}

function loadElement(ele){
  if ((window.jQuery !== undefined || window.$ !== undefined) && ele instanceof jQuery)
    ele = ele[0];
  var id = ele.getAttribute("data-id");
  var url = ele.getAttribute("data-url");
  if (ele.getAttribute("data-loader")
    != "false")
    addLoader(ele);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){ajaxCallback(xhttp, id);};
  xhttp.open("GET", url, true);
  if (ele.getAttribute("data-type") == "script")
    xhttp.setRequestHeader('Accept', 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*');
  // xhttp.setRequestHeader("X-CSRF-Token", document.querySelector("[name='csrf-token']").content);
  xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhttp.send();
  ele.setAttribute("data-loading", "started");
}

function addLoader(ele){
  var loader_img = document.createElement("div");
  loader_img.setAttribute("class", "loading-container")
  loader_img.setAttribute("data-id", ele.getAttribute("data-id"));
  if (["script", "json"].indexOf(ele.getAttribute("data-type")) >= 0)
    loader_img.setAttribute("data-type", ele.getAttribute("data-type"));

  var span = document.createElement("span");
  span.setAttribute("class", "loading-indicator")
  for(var j=0; j<3; j++){
    var i = document.createElement("i");
    span.appendChild(i);
  }
  loader_img.appendChild(span)
  ele.parentElement.replaceChild(loader_img, ele);
  loader_img.appendChild(ele);
}

function ajaxCallback(xhttp, id) {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    var elementToReplace = document.querySelectorAll("[data-id='"+id+"']")[0];
    var parentElement = elementToReplace.parentNode;
    if (elementToReplace.getAttribute("data-type") == "script"){
    // if(true){
      newScript = document.createElement("script");
      newScript.innerHTML = xhttp.responseText;
      parentElement.insertBefore(newScript, elementToReplace);
      parentElement.removeChild(elementToReplace);
    }
    else{
      var parser = new DOMParser();
      var doc = parser.parseFromString(xhttp.responseText, "text/html");
      var newElements = doc.querySelector("body");
      if (window.$ !== undefined){
      // if (false){
        new_ele = $(xhttp.responseText);
        if (newElements !== null){
          new_ele = $(newElements.innerHTML);
        }
        $(elementToReplace).replaceWith(new_ele);
        $("."+ id).remove();
      }
      else{
        var template = document.createElement("template");
        if (newElements !== null){
          template.innerHTML = newElements.innerHTML;
        }
        else{
          template.innerHTML = xhttp.responseText;
        }
        var childNodes = template.content.childNodes
        var newElement = elementToReplace
        var scriptTags = [];
        for(var i= childNodes.length-1; i>=0 ; i--){
          newPreviousElement = childNodes[i];
          parentElement.insertBefore(newPreviousElement, newElement);
          if(newPreviousElement.nodeName == "SCRIPT"){
            scriptTags.push(newPreviousElement.textContent);
            eval();
          }
          newElement = newPreviousElement;
        }
        runScripts(scriptTags);
        parentElement.removeChild(elementToReplace);
      }
    }
    lazyLoad();
  }
}

function runScripts(scriptTags){
  scriptTags.forEach( function(scriptTag){
    eval(scriptTag)
  });
}
