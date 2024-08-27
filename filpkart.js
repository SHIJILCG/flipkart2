var minprice = "MIN";
var maxprice = "MAX";
var dataarry = [];
var filteredArray = [];
const myset = new Set();
const myset1 = new Set();
const myset2 = new Set();
const result = new Set();
var Array2 = [];
var numberoffilters = [];
var funcnamearray = [];
var therealresult = [];
numberoffilters.length = 0;
let flag = 0;
let flag1 = 0;
let flag2=0;
let counter = 0;
let counter1 = 0;
let counter2 = 0;
let toalnumberofpagination = 0;
let reminder = 0;
let pagenumbervalue=1;
var sorttextvalue = "Relevance";
const originalMinOptions = Array.from(
  document.getElementById("select-price-1").options
);
const originalMaxOptions = Array.from(
  document.getElementById("select-price").options
);
const minSelect = document.getElementById("select-price-1");
const maxSelect = document.getElementById("select-price");
var themainarrayforsorting = [];
let filterbybrandnamefun;
function fetchingdata() {
  fetch("allproducts.json")
    .then((response) => response.json())
    .then((apiData) => {
      mainone(apiData);
    })
    .catch((err) => {
      console.log("ERRPR:", err);
    });

  fetch("jsonsscript.json")
    .then((response) => response.json())
    .then((data) => {
      maintwo(data);
    })
    .catch((err) => {
      console.log("ERRPR:", err);
    });
}
fetchingdata();
/**/ ////////////////////////////////////////////////////////////////// */
function mainone(data) {
  for (let item of data) {
    dataarry.push(item);
    Array2.push(item);
  }
  filteredArray.length = 0;
  sortOptionClickeddisplayed("Relevance");
}
/**/ ////////////////////////////////////////////////////////////////// */
function maintwo(data) {
  headerparts(data.headeritems);
  headerparts2(data.headeritems2);
  createbrandname(data.brandname);
  creatingratingssort(data.sortingrationg);
  creatingsotingnames(data.sortingNames);
  creatingramsort(data.sortingbyram);
}
/**/ ////////////////////////////////////////////////////////////////// */
function headerparts(data) {
  var item1 = document.getElementById("flipcart-becomeSeller-butt-a");
  var item2 = document.getElementById("flipcart-text-img");
  var item3 = document.getElementById("input-1");
  var item4 = document.getElementById("search-img-tag");
  var item5 = document.getElementById("flipcart-login-butt-a");
  var item6 = document.getElementById("flipcart-More-butt-text");
  var item7 = document.getElementById("flipcart-More-butt-img");
  var item8 = document.getElementById("flipcart-Cart-butt-img");
  var item9 = document.getElementById("flipcart-Cart-butt-text");
  item1.innerText = data.loginSellername;
  item2.src = data.Flipcartimg;
  item3.placeholder = data.placeholdertext;
  item4.src = data.Sarchimgheader;
  item5.innerText = data.loginbuttname;
  item6.innerText = data.loginMorename;
  item7.src = data.Moreimg;
  item8.src = data.Cartimg;
  item9.innerText = data.Carttext;
}
/**/ ////////////////////////////////////////////////////////////////// */
function headerparts2(data) {
  const container = document.querySelector(".header-2-inner");
  container.innerHTML = "";
  createlistdownbutt(data.listscrolldownbutt, container);
  createAbutt(data.abutt, container);
}
/**/ ////////////////////////////////////////////////////////////////// */
function createlistdownbutt(data, container) {
  let output = "";
  for (let item of data) {
    output += `
                 <span class="listscrolldownbutt-item">
                          ${item.listscrolldownbuttText}
                          <img src="img/svgexport-4 (3).svg" alt="${item.listscrolldownbuttText}">
                      </span>
          `;
  }
  container.insertAdjacentHTML("beforeend", output);
}
/**/ ////////////////////////////////////////////////////////////////// */
function createbrandname(data) {
  let output = "";
  for (let item of data.brand1) {
    output += `
            <div class="select-butt">
                   <div class="select-butt-inner">
                     <label">
                          <input type="checkbox" id="option-1" onchange="filterbybrandname('${item}',this,event)">
                          <div class="select-butt-inner-text">${item}</div>
                     </label>
                </div>
               </div>
          `;
  }

  document.querySelector(".brand-search-section-inner-1").innerHTML += output;

  document.querySelector(
    ".brand-search-section-inner-2"
  ).innerHTML += `<span>${findnumberofbrand(data.brand1)}</span>`;
}
/**/ ////////////////////////////////////////////////////////////////// */

function creatingratingssort(data) {
  for (let item of data.ratingsorting) {
    document.querySelector(".userratingsection-body-section-1").innerHTML += `
           <div class="select-butt">
                   <div class="select-butt-inner">
                     <label">
                          <input type="checkbox" id="option-2" onchange="filterbyuserrating('${item}',this,event)">
                          <div class="select-butt-inner-text">${item} & above</div>
                     </label>
                </div>
               </div>
       `;
  }
}
/**/ ////////////////////////////////////////////////////////////////// */
function creatingramsort(data) {
  for (let item of data.ramdata) {
    document.querySelector(".ramsection-body-section-1").innerHTML += `
        <div class="select-butt">
                <div class="select-butt-inner">
                  <label">
                       <input type="checkbox" id="option-3" onchange="filterbyram('${item}',this,event)">
                       <div class="select-butt-inner-text">${item} GB</div>
                  </label>
             </div>
            </div>
    `;
  }
}
/**/ ////////////////////////////////////////////////////////////////// */
function findnumberofbrand(data) {
  let value = data.length;
  let result = value - 6;
  if (result === 0) {
    return "";
  } else {
    return result + "More";
  }
}
/**/ ////////////////////////////////////////////////////////////////// */
function createAbutt(data, container) {
  let output = "";
  for (let item of data) {
    output += `
              <a  href="" id="AbuttText-id">${item.AbuttText}</a>
          `;
  }
  container.insertAdjacentHTML("beforeend", output);
}
/**/ ////////////////////////////////////////////////////////////////// */
function creatingsotingnames(data) {
  let output = "";
  for (let item of data.sorting) {
    output += `
             <div class="Sort-option" onclick="sortOptionClicked( event,'${item}')">${item}</div>
          `;
  }
  document.querySelector(
    ".main-body-inner-right-side-header-inner-content-3"
  ).innerHTML += output;
  const value1 = document.getElementsByClassName("Sort-option");
  value1[0].classList.add("active");
}
/**/ ////////////////////////////////////////////////////////////////// */
function filtering(event) {
  const selectedvalue = event.target.value;
  const currentselectedmin = minSelect.value;
  const currentselectedmax = maxSelect.value;
  resetoption(minSelect, originalMinOptions, currentselectedmin);
  resetoption(maxSelect, originalMaxOptions, currentselectedmax);
  if (event.target.id === "select-price-1") {
    minprice = selectedvalue;
    priceadjuster();
    Array.from(maxSelect.options).forEach((option) => {
      if (
        option.value !== "MAX" &&
        option.value <= minprice &&
        minprice !== "MIN"
      ) {
        option.remove();
      }
    });
  } else if (event.target.id === "select-price") {
    maxprice = selectedvalue;
    priceadjuster();
    Array.from(minSelect.options).forEach((option) => {
      if (
        option.value !== "MIN" &&
        option.value >= maxprice &&
        maxprice !== "MAX"
      ) {
        option.remove();
      }
    });
  }

  filteraddding(minprice, maxprice);
  minmaxpricefiltering();
}
/*/////////////////////////////////////////////////////////////////// */
function resetoption(a, b, c) {
  /**readdingngminmax and selected*/
  a.innerHTML = "";
  b.forEach((option) => {
    const newoption = option.cloneNode(true);
    a.add(newoption);
    if (newoption.value === c) {
      newoption.selected = true;
    }
  });
}

function resetoption2(a, b) {
  a.innerHTML = "";
  b.forEach((option) => {
    const newoption = option.cloneNode(true);
    a.add(newoption);
  });
}
/*/////////////////////////////////////////////////////////////////// */
function minmaxpricefiltering() {
  if (funcnamearray.length !== 0) {
    callallthefilterinthearry();
  }

  /**all the item are going through here */
  numberoffilters = document.querySelectorAll(".otherfilters");
  /**find the numbers of filters */
  if (numberoffilters.length == 0) {
    flag = 0;
    filteredArray.length = 0;
    if (!isNaN(minprice) && !isNaN(maxprice)) {
      filteredArray.push(
        ...dataarry.filter(
          (item) => item.price >= minprice && item.price <= maxprice
        )
      );
      sortOptionClickeddisplayed(sorttextvalue);
    } else if (!isNaN(maxprice)) {
      filteredArray.push(...dataarry.filter((item) => item.price <= maxprice));
      sortOptionClickeddisplayed(sorttextvalue);
    } else if (!isNaN(minprice)) {
      filteredArray.push(...dataarry.filter((item) => item.price >= minprice));
      sortOptionClickeddisplayed(sorttextvalue);
    } else if (isNaN(minprice) && isNaN(maxprice)) {
      filteredArray = [...dataarry];
      sortOptionClickeddisplayed(sorttextvalue);
    }
  } else {
    flag = 1;
    if (!isNaN(minprice) && !isNaN(maxprice)) {
      let filterdarray22 = [];
      filterdarray22.push(
        ...filteredArray.filter(
          (item) => item.price >= minprice && item.price <= maxprice
        )
      );
      filteredArray = filterdarray22;
      sortOptionClickeddisplayed(sorttextvalue);
    } else if (!isNaN(maxprice)) {
      let filterdarray22 = [];
      filterdarray22.push(
        ...filteredArray.filter((item) => item.price <= maxprice)
      );
      filteredArray = filterdarray22;
      sortOptionClickeddisplayed(sorttextvalue);
    } else if (!isNaN(minprice)) {
      let filterdarray22 = [];
      filterdarray22.push(
        ...filteredArray.filter((item) => item.price >= minprice)
      );
      filteredArray = filterdarray22;
      sortOptionClickeddisplayed(sorttextvalue);
    } else {
      sortOptionClickeddisplayed(sorttextvalue);
    }
  }
}
/**/ ////////////////////////////////////////////////////////////////// */
function sortOptionClicked(event, text) {
  const sortingopion = document.getElementsByClassName("Sort-option");
  for (let option of sortingopion) {
    option.classList.remove("active");
  }
  event.target.classList.add("active");
  sorttextvalue = text;
  sortOptionClickeddisplayed(text);
}
/**/ ////////////////////////////////////////////////////////////////// */
function sortOptionClickeddisplayed(text) {
  console.log(maxprice, minprice, numberoffilters.length, sorttextvalue);
  /**the products are showing through this function */
  numberoffilters =
    document.querySelectorAll(
      "#fitters-item"
    ); /**find the numbers of filters */

  if (text == "Relevance") {
    if (filteredArray.length == 0 && numberoffilters.length == 0) {
      console.log("filters not applyed");
      Array2.sort((a, b) => a.relevance - b.relevance);
      makingpagination(Array2);
    } else {
      console.log("filters are applyed");
      filteredArray.sort((a, b) => a.relevance - b.relevance);
      makingpagination(filteredArray);
      if (filteredArray.length === 0) {
        makenoitempage();
        return;
      }
    }
  } else if (text == "Popularity") {
    if (filteredArray.length == 0 && numberoffilters.length == 0) {
      console.log("filters not applyed");
      Array2.sort((a, b) => a.rating.average - b.rating.average);
      makingpagination(Array2);
    } else {
      console.log("filters are applyed");
      filteredArray.sort((a, b) => a.rating.average - b.rating.average);
      makingpagination(filteredArray);
      if (filteredArray.length === 0) {
        makenoitempage();
        return;
      }
    }
  } else if (text == "Price -- Low to High") {
    if (filteredArray.length == 0 && numberoffilters.length == 0) {
      console.log("filters not applyed");
      Array2.sort((a, b) => b.price - a.price);
      makingpagination(Array2);
    } else {
      console.log("filters are applyed");
      filteredArray.sort((a, b) => b.price - a.price);
      makingpagination(filteredArray);
      if (filteredArray.length === 0) {
        makenoitempage();
        return;
      }
    }
  } else if (text == "Price -- High to Low") {
    if (filteredArray.length == 0 && numberoffilters.length == 0) {
      Array2.sort((a, b) => a.price - b.price);
      makingpagination(Array2);
    } else {
      filteredArray.sort((a, b) => a.price - b.price);
      makingpagination(filteredArray);
      if (filteredArray.length === 0) {
        makenoitempage();
        return;
      }
    }
  } else {
    if (filteredArray.length == 0 && numberoffilters.length == 0) {
      Array2.sort(
        (a, b) => new Date(b.newLaunchDate) - new Date(a.newLaunchDate)
      );
      makingpagination(Array2);
    } else {
      filteredArray.sort(
        (a, b) => new Date(b.newLaunchDate) - new Date(a.newLaunchDate)
      );
      makingpagination(filteredArray);
      if (filteredArray.length === 0) {
        makenoitempage();
        return;
      }
    }
  }
}
/**/ ////////////////////////////////////////////////////////////////// */
function createpriducts(data) {
  console.log(data);
  const productContainer = document.querySelector(".productsshowHere");
  productContainer.innerHTML = "";
  let output = "";
  for (let item of data) {
    output = `
             <div class="product-item">
                  <div class="product-inner-item">
                        <div class="product-inner-item-condent">
                              <div class="product-inner-item-condent-inner">
                                   <a href="${item.url}">
  
                                       <div class="product-left-side">
                                            <div class="product-img">
                                                 <div class="product-img-inner">
                                                      <img src="${
                                                        item.images[0]
                                                      }"> 
                                                 </div>
                                            </div>
                                            <div class="addtocompare">
                                               <div class="select-butt-inner">
                                                    <label">
                                                         <input type="checkbox" id="option-1" onchange="">
                                                         <div class="select-butt-inner-text-type-two">Add to Compare</div>
                                                    </label">
                                               </div>
                                            </div>
                                            <div class="addtowish">
                                              <div class="addtowish-inner">
                                                  <img src="img/svgexport-13 (1).svg">
                                              </div>
                                            </div>
                                       </div>
                                        <div class="product-right-side">
                                            <div class="product-details">
                                               <div class="product-details-title">${
                                                 item.title
                                               }</div>
                                               <div class="product-rating-details">
                                                    <span id="rating-value">
                                                       <div class="rating-value-inner">
                                                         ${item.rating.average}
                                                         <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==">
                                                       </div>
                                                    </span>
                                                    <span id="rating-details">
                                                         <span>
                                                            <span>${
                                                              item.rating.count
                                                            } Rating</span>
                                                            <span id="and">&</span>
                                                            <span>${
                                                              item.rating
                                                                .reviewCount
                                                            } Reviews</span>
                                                         </span>
                                                    </span>
                                               </div>
                                               <div class="product-main-details">
                                                   <ul id="highlights">
                                                      ${listcreating(
                                                        item.highlights
                                                      )}
                                                   </ul>
                                               </div>
                                            </div>
                                            <div class="product-buying-details">
                                               <div class="price-details">
                                                    <div class="price">
                                                       <div class="price-text">₹${addcommainprice(
                                                         item.price
                                                       )}</div>
                                                       <div class="old-price-text">₹${
                                                        addcommainprice(
                                                          item.price
                                                        )
                                                       }</div>
                                                        <div class="off-percentage"><span>${finddiscount(
                                                          item.price,
                                                          item.mrp
                                                        )} off</span></div>
                                                    </div>
                                                    <div class="free-delivery">
                                                      <div>
                                                          <div class="free-delivery-text">Free delivery</div>
                                                      </div>
                                                  </div>
                                               </div>
                                               <div class="flipcart-assure">
                                               <img src="img/fa_62673a.png" alt="">
                                            </div>
                                          </div>
                                        </div>
                                  </a>
                              </div>
                        </div>
                   </div>
             </div>
  
           `;

    productContainer.insertAdjacentHTML("afterbegin", output);
  }
  if(flag2 === 1){
    makingthepagaforpagination(toalnumberofpagination);
  }
}
/**/ ////////////////////////////////////////////////////////////////// */
function listcreating(data) {
  let output = "";
  for (let item of data) {
    output += `
           <li id="product-list-details">${item}</li>
         `;
  }
  return output;
}
/**/ ////////////////////////////////////////////////////////////////// */
function addcommainprice(num) {
  let numberOfDigits = num.toString().length;
  let brakingpoint = numberOfDigits - 3;
  let val = num.toString();
  let val1 = val.slice(0, brakingpoint);
  let val2 = val.slice(brakingpoint);
  let result = val1 + "," + val2;
  return result;
}
/**/ ////////////////////////////////////////////////////////////////// */
function finddiscount(a, b) {
  return (((b - a) / b) * 100).toFixed(0) + "%";
}
/**/ ////////////////////////////////////////////////////////////////// */allthesortingareshowhere
function filterbybrandname(item, checkbox, event) {
  filterbybrandnamefun = filterbybrandname;
  if (flag === 0) {
    filteredArray.length = 0;
  }
  if (checkbox.checked) {
    filteraddding2(item, "");
    counter++;
    filterbyarryconteny(finditembybrandname, item);
  } else {
    counter--;
    removeunckeckedfromfilters(item, event);
    removefilterbyarryconteny(finditembybrandname, item);
  }
}
/**/ ////////////////////////////////////////////////////////////////// */

function filterbyuserrating(item, checkbox, event) {
  if (flag === 0) {
    filteredArray.length = 0;
  }
  if (checkbox.checked) {
    counter1++;
    filteraddding2(item, "& above");
    filterbyarryconteny(filterbyuserratingitem, item);
  } else {
    counter1--;
    removeunckeckedfromfilters(item, event);
    removefilterbyarryconteny(filterbyuserratingitem, item);
  }
}
/**/ ////////////////////////////////////////////////////////////////// */

function filterbyram(item, checkbox, event) {
  if (flag === 0) {
    filteredArray.length = 0;
  }
  if (checkbox.checked) {
    counter2++;
    filteraddding2(item, "GB");
    filterbyarryconteny(filterbyramitem, item);
  } else {
    counter2--;
    removeunckeckedfromfilters(item, event);
    removefilterbyarryconteny(filterbyramitem, item);
  }
}
/**/ ////////////////////////////////////////////////////////////////// */
function finditembybrandname(item) {
  for (let data of dataarry) {
    if (data.brand == item) {
      myset.add(data);
    }
  }
}
/**/ ////////////////////////////////////////////////////////////////// */
function filterbyuserratingitem(item) {
  let newStr = item.slice(0, -1);
  for (let data of dataarry) {
    if (data.rating.average >= newStr) {
      myset1.add(data);
    }
  }
}
/**/ ////////////////////////////////////////////////////////////////// */
function filterbyramitem(item) {
  for (let data of dataarry) {
    if (data.RAM == item) {
      myset2.add(data);
    }
  }
}
/**/ ////////////////////////////////////////////////////////////////// */
function cimbinigarray() {
  flag1 = 0;
  if (counter === 0 && counter1 === 0 && counter2 === 0) {
    return;
  } else if (counter1 === 0 && counter2 === 0) {
    for (let item of myset) {
      result.add(item);
    }
    filteredArray = [...result];
  } else if (counter === 0 && counter2 === 0) {
    for (let item of myset1) {
      result.add(item);
    }
    filteredArray = [...result];
  } else if (counter === 0 && counter1 === 0) {
    for (let item of myset2) {
      result.add(item);
    }
    filteredArray = [...result];
  } else {
    const allItems = [];

    if (myset.size > 0) {
      allItems.push(...myset);
    } else if (counter > 0) {
      flag1++;
    }
    if (myset1.size > 0) {
      allItems.push(...myset1);
    } else if (counter1 > 0) {
      flag1++;
    }
    if (myset2.size > 0) {
      allItems.push(...myset2);
    } else if (counter2 > 0) {
      flag1++;
    }
    if (flag1 > 0) {
      console.log("some set is an empty");
      filteredArray = [];
      return;
    }
    const itemCount = new Map();
    allItems.forEach((item) => {
      itemCount.set(
        item,
        (itemCount.get(item) || 0) + 1
      ); /* get an  a map of with item and count */
    });
    const totalSets = [myset, myset1, myset2].filter(
      (set) => set.size > 0
    ).length; /*  get an number of nonempty set */
    const commonItems = [...itemCount]
      .filter(([item, count]) => count === totalSets)
      .map(([item]) => item); /* to get item that present all sets*/
    filteredArray = commonItems;
  }
}
/**/ ////////////////////////////////////////////////////////////////// */
function filteraddding2(item1, item2) {
  const filteringspace = document.getElementById("Filters-id");
  let output = "";
  output += `
                  <div id="fitters-item" class="otherfilters">
                       <div class="crossxbutt"  onclick="removefilter(event)">✕</div>
                       <div id="itters-item-value">${item1} ${item2}</div>
                  </div>
      `;
  filteringspace.innerHTML += output;
  numberoffilters =
    document.querySelectorAll(
      "#fitters-item"
    ); /**find the numbers of filters */
  addfilterreomovebutt();
}
/**/ ////////////////////////////////////////////////////////////////// */
function filteraddding(item1, item2) {
  const filteringspace = document.getElementById("Filters-id");
  const minmaxfilterpresentornot = document.getElementsByClassName("minmaxdiv");
  if (minmaxfilterpresentornot.length == 0) {
    let output = "";
    output += `
                    <div id="fitters-item" class="minmaxdiv">
                         <div class="crossxbutt" onclick="removefilter(event)">✕</div>
                         <div id="itters-item-value">₹${item1} - ₹${item2}</div>
                    </div>
        `;
    filteringspace.innerHTML += output;
    numberoffilters =
      document.querySelectorAll(
        "#fitters-item"
      ); /**find the numbers of filters */
    addfilterreomovebutt();
  } else {
    document.querySelector(".minmaxdiv").innerHTML = `
                         <div class="crossxbutt" onclick="removefilter(event)">✕</div>
                         <div id="itters-item-value">₹${item1} - ₹${item2}</div>
        `;
  }
  numberoffilters =
    document.querySelectorAll(
      "#fitters-item"
    ); /**find the numbers of filters */
}
/**/ ////////////////////////////////////////////////////////////////// */
function addfilterreomovebutt() {
  const filterclearallbutt = document.getElementById("claearall");
  filterclearallbutt.innerHTML = `<span id="clearallthing-child">Clear all</span>`;
}
/**/ ////////////////////////////////////////////////////////////////// */
function removeunckeckedfromfilters(item) {
  console.log(item);
  let allfilters = document.querySelectorAll(".crossxbutt");
  allfilters.forEach((data) => {
    let siblingText = data.nextElementSibling.textContent.trim();
    let firstValue = siblingText.split(" ")[0];
    if (firstValue == item) {
      data.parentElement.remove();
    }
  });
  let collection = document.querySelectorAll("#fitters-item");
  if (collection.length == 0) {
    clearallthefilters();
  }
  numberoffilters = document.querySelectorAll("#fitters-item");
}

/**/ ////////////////////////////////////////////////////////////////// */
function clearallthefilters() {
  const filteringspace = document.getElementById("Filters-id");
  const item2 = document.getElementById("claearall");
  const item3 = document.getElementById("clearallthing-child");
  filteringspace.innerHTML = "";
  funcnamearray.length=0;
  item2.removeChild(item3);
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkboxe) => {
    if (checkboxe.checked) {
      checkboxe.checked = false;
    }
  });
  filteredArray.length = 0;
  minprice = "MIN";
  maxprice = "MAX";
  sortOptionClickeddisplayed(sorttextvalue);
  priceadjuster();
  resetoption2(minSelect, originalMinOptions);
  resetoption2(maxSelect, originalMaxOptions);
  numberoffilters =
    document.querySelectorAll(
      "#fitters-item"
    ); /**find the numbers of filters */
}
/**/ ////////////////////////////////////////////////////////////////// */
function removefilter(event) {
  /**single filtes removerd here..... */
  let parentdiv = event.target.parentElement;
  parentdiv.remove();
  let collection = document.querySelectorAll("#fitters-item");
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let checkedval = event.target.nextElementSibling.textContent.trim();
  let firstValue = checkedval.split(" ")[0];
  checkboxes.forEach((checkboxe) => {
    let val = checkboxe.nextElementSibling.textContent;
    let checkedval2 = checkboxe.nextElementSibling.textContent.trim();
    let firstValue2 = checkedval2.split(" ")[0];
    if (firstValue2 === firstValue && checkboxe.checked) {
      checkboxe.checked = false;
      let inputid = checkboxe.id;
      removebuttandremovefunction(val, inputid);
    }
  });
  if (collection.length == 0) {
    const item2 = document.getElementById("claearall");
    item2.innerHTML = "";
    filteredArray.length = 0;
    numberoffilters.length = 0; /**numberof flters is zero */
    minmaxpricefiltering();
  }
  if (parentdiv.className == "minmaxdiv") {
    minprice = "MIN";
    maxprice = "MAX";
    priceadjuster();
    resetoption2(minSelect, originalMinOptions);
    resetoption2(maxSelect, originalMaxOptions);
    minmaxpricefiltering();
  }
  numberoffilters =
    document.querySelectorAll(
      "#fitters-item"
    ); /**find the numbers of filters */
}
/**/ ////////////////////////////////////////////////////////////////// */

function removebuttandremovefunction(data, idvalue) {
  if (idvalue == "option-1") {
    console.log("Removing filter by brand name");
    counter--;
    removefilterbyarryconteny(finditembybrandname, data);
  } else if (idvalue === "option-2") {
    console.log("Removing filter by user rating");
    counter1--;
    let data1 = data.slice(0, -8);
    removefilterbyarryconteny(filterbyuserratingitem, data1);
  } else if (idvalue === "option-3") {
    console.log("Removing filter by RAM");
    counter2--;
    let data1 = data.slice(0, -3);
    removefilterbyarryconteny(filterbyramitem, data1);
  }
}
/**/ ////////////////////////////////////////////////////////////////// */
function priceadjuster() {
  const rightbutt1 = document.getElementsByClassName("right-butt")[0];
  const line1 = document.getElementsByClassName("the-line-2")[0];
  const leftbutt1 = document.getElementsByClassName("left-butt")[0];
  if (minprice == "MIN" && maxprice == "MAX") {
    rightbutt1.style.transform = "translateX(-1.19px)";
    leftbutt1.style.transform = "translateX(-7px)";
    line1.style.transform = "translate(0px) scaleX(0.995)";
  } else if (minprice == "MIN") {
    leftbutt1.style.transform = "translateX(-7px)";

    if (maxprice == 10000) {
      rightbutt1.style.transform = "translateX(-190.638px)";
      line1.style.transform = "translate(0px) scaleX(0.199)";
    } else if (maxprice == 15000) {
      rightbutt1.style.transform = "translateX(-143.276px)";
      line1.style.transform = "translate(0px) scaleX(0.398)";
    } else if (maxprice == 20000) {
      rightbutt1.style.transform = "translateX(-95.914px)";
      line1.style.transform = "translate(0px) scaleX(0.597)";
    } else if (maxprice == 30000) {
      rightbutt1.style.transform = "translateX(-48.552px)";
      line1.style.transform = "translate(0px) scaleX(0.777)";
    }
  } else if (maxprice == "MAX") {
    rightbutt1.style.transform = "translateX(-1.19px)";

    if (minprice == 10000) {
      leftbutt1.style.transform = "translateX(47.362px)";
      line1.style.transform = "translate(47.362px) scaleX(0.769)";
    } else if (minprice == 15000) {
      leftbutt1.style.transform = "translateX(94.724px)";
      line1.style.transform = "translate(94.724px) scaleX(0.597)";
    } else if (minprice == 20000) {
      leftbutt1.style.transform = "translateX(142.086px)";
      line1.style.transform = "translate(142.086px) scaleX(0.398)";
    } else if (minprice == 30000) {
      leftbutt1.style.transform = "translateX(189.448px)";
      line1.style.transform = "translate(189.448px) scaleX(0.199)";
    } else {
      leftbutt1.style.transform = "translateX(0px)";
      line1.style.transform = "translate(0px) scaleX(0.995)";
    }
  } else {
    if (minprice == 10000 && maxprice == 30000) {
      leftbutt1.style.transform = "translateX(47.362px)";
      rightbutt1.style.transform = "translateX(-48.552px)";
      line1.style.transform = "translate(47.362px) scaleX(0.597)";
    } else if (minprice == 10000 && maxprice == 20000) {
      leftbutt1.style.transform = "translateX(47.362px)";
      rightbutt1.style.transform = "translateX(-95.914px)";
      line1.style.transform = "translate(47.362px) scaleX(0.398)";
    } else if (minprice == 10000 && maxprice == 15000) {
      leftbutt1.style.transform = "translateX(47.362px)";
      rightbutt1.style.transform = "translateX(-143.276px)";
      line1.style.transform = "translate(47.362px) scaleX(0.199)";
    } else if (minprice == 15000 && maxprice == 20000) {
      leftbutt1.style.transform = "translateX(94.724px)";
      line1.style.transform = "translate(94.724px) scaleX(0.199)";
      rightbutt1.style.transform = "translateX(-95.914px)";
    } else if (minprice == 15000 && maxprice == 30000) {
      leftbutt1.style.transform = "translateX(94.724px)";
      line1.style.transform = "translate(94.724px) scaleX(0.398)";
      rightbutt1.style.transform = "translateX(-48.552px)";
    } else if (minprice == 20000 && maxprice == 30000) {
      leftbutt1.style.transform = "translateX(142.086px)";
      line1.style.transform = "translate(142.086px) scaleX(0.199)";
      rightbutt1.style.transform = "translateX(-48.552px)";
    } else if (minprice == 30000 && maxprice == "MAX") {
      leftbutt1.style.transform = "translateX(142.086px)";
      line1.style.transform = "translate(142.086px) scaleX(0.199)";
      rightbutt1.style.transform = "translateX(-48.552px)";
    }
  }
}
/**/ ////////////////////////////////////////////////////////////////// */
function filterbyarryconteny(func, item) {
  funcnamearray.push([func, item]);
  minmaxpricefiltering();
}
function callallthefilterinthearry() {
  console.log("///////////////////////////////////////////////////////////");
  console.log(funcnamearray);
  filteredArray.length = 0;
  myset.clear();
  myset1.clear();
  myset2.clear();
  result.clear();
  funcnamearray.forEach((data) => {
    let fun = data[0];
    let value = data[1];
    fun(value);
  });
  cimbinigarray();
}
function removefilterbyarryconteny(func, itemname) {
  funcnamearray = funcnamearray.filter(
    (item) => !(item[0] === func && item[1] === itemname)
  );
  minmaxpricefiltering();
}
function makenoitempage() {
  const productContainer = document.querySelector(".productsshowHere");
  productContainer.innerHTML = "";
  let output = "";
  output = `
      <div class="nothingfound">
         <div class="nothingfound-inner">
            <div class="nothingfound-inner-content">
               <img src="img/error-no-search-results_2353c5.png">
               <div class="nothingfound-text-1">Sorry, no results found!</div>
               <div class="nothingfound-text-2">Please check the spelling or try searching for something else</div>
            </div>
         </div>
      </div>
  `;
  productContainer.insertAdjacentHTML("afterbegin", output);
}
function makingpagination(items) {
  pagenumbervalue=1;
  therealresult.length = 0;
  toalnumberofpagination=0;
  reminder=0;
  for (let item of items) {
    therealresult.push(item);
  }
  let noOfitems = items.length;
  reminder = noOfitems % 24;
  toalnumberofpagination = (noOfitems - reminder) / 24;
  if(reminder !== 0){
     toalnumberofpagination= toalnumberofpagination + 1;
  }
  if (toalnumberofpagination > 1) {
    flag2=1
    if(reminder === 0){
      reminder=24;
    }
    callingmakingproduct(1);
  } else {
    flag2=0;
    let item4 =document.getElementById("numberofresults"); 
    item4.innerHTML = `Showing ${1} – ${items.length} of ${items.length} results for "mobiles"`;
    createpriducts(items);
  }
}
function makingthepagaforpagination(value) {
  const productContainer = document.querySelector(".productsshowHere");
  let output = "";
  output = `
        <div class="pagination">
            <div class="pagination-inner">
                <nav class="navigationpages">
                   ${makingpaginationcircle(value)}
              </nav>
           </div>
        </div>
  `;
  productContainer.insertAdjacentHTML("beforeend", output);
  const allpages = document.getElementsByClassName("page");
  for (let item of allpages) {
    if(item.textContent == pagenumbervalue){
        item.classList.add('pageactive')
    }
  }

}
function makingpaginationcircle(value) {
  let output = "";
  for (let i = 1; i <= value; i++) {
    output += `<a class="page" onclick="changepage(${i},event)">${i}</a>`;
  }
  return output;
}
function changepage(value, event) {
   pagenumbervalue=value;
  callingmakingproduct(value);
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
function callingmakingproduct(pageNumber) {
  let lengthresult=therealresult.length;
  let startIndex = -24;
  const pageSize = 24;
  const allPageparent = document.getElementsByClassName("page");
  let item4 =document.getElementById("numberofresults"); 
  if (pageNumber > 1) {
    startIndex = (pageNumber - 1) * pageSize;
  }

  let itemsToDisplay;

  if (pageNumber === 1) {
    itemsToDisplay = therealresult.slice(-24);
    item4.innerHTML = `Showing 1 – 24 of ${lengthresult} results for "mobiles"`;
  } else if (pageNumber === allPageparent.length) {
    itemsToDisplay = therealresult.slice(0, reminder);
    item4.innerHTML = `Showing ${lengthresult - reminder} – ${lengthresult} of ${lengthresult} results for "mobiles"`;
  } else {
    itemsToDisplay = therealresult.slice(startIndex, startIndex + pageSize);
    item4.innerHTML = `Showing ${startIndex + 1} – ${startIndex + pageSize} of ${lengthresult} results for "mobiles"`;

  }

  createpriducts(itemsToDisplay);
}

