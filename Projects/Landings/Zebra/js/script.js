const drop = document.getElementById('drop');
const item = document.getElementById("product");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const first = document.getElementById("frst");
const second = document.getElementById("scnd");



item.addEventListener("mouseover", hover, false);
item.addEventListener("mouseout", out, false);
drop.addEventListener("mouseover", hover, false);
drop.addEventListener("mouseout", out, false);
previous.addEventListener("click", back);
next.addEventListener("click", go);



function hover(){
    drop.setAttribute("style", "display:flex; cursor: pointer;")
    item.setAttribute("style", "background: #06b5a9;; color: white; cursor: pointer; border-bottom: 1.5px solid #7ebeba; ")
}
function out(){
   drop.setAttribute("style", "display: none;")
   item.setAttribute("style", "color: #626262; cursor: default; border-bottom: 0; ")
}


function back(){
    first.style.display = 'none';
    second.style.display = 'flex';

};
function go(){
    second.style.display = 'none';
    first.style.display = 'flex';
};




function openLevis(cityName,elmnt,color) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(cityName).style.display = "block";
    elmnt.style.backgroundColor = color;
  
  }

  document.getElementById("defaultOpen").click();