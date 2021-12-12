//navbar部分
//分类渲染
//获取rawdata的所有对象的category name，然后去重
function unique(arr) {
  return Array.from(new Set(arr));
}
let categoryNameArray = [];

for (let i = 0; i < rawdata.length; i++) {
  for (let k in rawdata[i].category) {
    if (k == "categoryName") {
      categoryNameArray.push(rawdata[i].category.categoryName);
    }
  }
}
//去重
let newCategoryName = unique(categoryNameArray).sort();

//获取select 生成对应的option，获取select category后并插入到里面
let categorySelect = document.querySelector("#category");
for (let aNewCategoryName of newCategoryName) {
  let categoryOption = document.createElement("option");
  categoryOption.innerHTML = aNewCategoryName;
  categoryOption.value = aNewCategoryName;
  categorySelect.appendChild(categoryOption);
}

//产品列表部分
//获取外层wrap元素，以及rawdata数据
let wrap = document.querySelector(".wrap");
let product = rawdata;
let priceUnder100 = [];
let priceBetween = [];
let priceAbove200 = [];
let priceCompare = null; //要声明一个暂时先不赋值的变量时最好将其先设置为null
//将所有产品的价格范围分类，并存入对应数组
for (let eachProduct of product) {
  if (eachProduct.price < 100) {
    priceUnder100.push(eachProduct);
  } else if (eachProduct.price >= 100 && eachProduct.price <= 200) {
    priceBetween.push(eachProduct);
  } else if (eachProduct.price > 200) {
    priceAbove200.push(eachProduct);
  }
}

//创建产品列表
//const creatProductList = () => {
//创建要列出的product
const creatProductList = function (product) {
  let productWithPic = [];
  let printProduct = "";
  for (let i of product) {
    //获取产品的图片讯息

    if (i.productMedia[0] && i.productMedia[0].url) {
      productWithPic.push(i);
      let product_pic =
        "https://storage.googleapis.com/luxe_media/wwwroot/" +
        i.productMedia[0].url;

      let product_url =
        "./detail.html?prodId=" +
        i.prodId +
        "&prodTitle=" +
        i.title;
      printProduct += `
      <div class="col-12 col-md-2">
      <a href="${product_url}">
        <img src = "${product_pic}"> 
        <p> ${i.title}  </p>
        <p class="p_price">$ ${i.price}</p>
        </a>
      </div>`;
    }
  }
  wrap.innerHTML = "";
  wrap.innerHTML = printProduct;
};
//创建产品页面
creatProductList(product);

//根据当前选项创建产品列表
let creatProductArr =  (crt_opt, price_opt) =>{
  let newProductList = [];
  if (crt_opt == "All Hire" && price_opt == 0) {
    wrap.innerHTML = "";
    product = rawdata;
  }
  //如果当前category为all hire price option又不等于all，则将所有的product按照价格区间分类
  else if (crt_opt == "All Hire") {
    if (price_opt == 1) {
      product = priceUnder100;
      priceCompare = product;
    }
    if (price_opt == 2) {
      product = priceBetween;
    }
    if (price_opt == 3) {
      product = priceAbove200;
    }
    priceCompare = product;
  }
  //如果不是all hire price也不是all，根据当前选中的option的categoryName的对应categoryID，选出复合条件的产品
  else {
    //将当前option的value catgoryname转换成对应的categoryID
    //从所有产品ID里，选出match当前option categoryID，且价格区间也正确的元素，添加到product列表
    if (price_opt == 0) {
      for (let i of rawdata) {
        if (
          i.category &&
          crt_opt == i.category.categoryName
        ) {
          newProductList.push(i);
        }
      }
    } else if (price_opt == 1) {
      for (let i of priceUnder100) {
        if (
          i.category &&
          crt_opt == i.category.categoryName
        ) {
          newProductList.push(i);
        }
      }
    } else if (price_opt == 2) {
      for (let i of priceBetween) {
        if (
          i.category &&
          crt_opt == i.category.categoryName
        ) {
          newProductList.push(i);
        }
      }
    } else if (price_opt == 3) {
      for (let i of priceAbove200) {
        if (
          i.category &&
          crt_opt == i.category.categoryName
        ) {
          newProductList.push(i);
        }
      }
    }
    priceCompare = newProductList;
    product = newProductList;
  }
};
//获取当前选中的option
const getOption = (option) => {
  let index = document.querySelector(option).selectedIndex;
  return document.querySelector(option).options[index].value;
};

//点击事件函数
const creatProductPage = () =>  {
  let cat_opt = getOption("#category");
  let price_opt = getOption("#Price");

  creatProductArr(cat_opt, price_opt);
  creatProductList(product);
}

//核心逻辑，将所有产品对象根据价格事先分类好
//根据当前的价格获取当前价格对应的产品对象数组，然后在里面对比当前选择的cate的值，创建新数组，然后调出创建产品列表函数即可
//因为要实现交互功能，所以他们可以公用一个函数
//获取show按钮
let show = document.querySelector("#show");
//给show注册点击事件，当点击时
show.onclick = function () {
  //获取当前option的value
  creatProductPage();
};
//获取filter按钮
let filter = document.querySelector("#filter");
filter.onclick = function () {
  creatProductPage();
};

//排序，将上方的product数组重新，清空productlist后显示
let asc = document.querySelector("#ascend");
let dec = document.querySelector("#decend");
asc.onclick = function () {
  let cat_opt = getOption("#category");
  let price_opt = getOption("#Price");

  creatProductArr(cat_opt, price_opt);

  //当priceCompare不存在时，将priceCompare的值为rawdata，
  if (!priceCompare) {
    priceCompare = rawdata;
  }
  for (let i = 0; i < priceCompare.length - 1; i++) {
    for (let j = 0; j < priceCompare.length - i - 1; j++) {
      if (priceCompare[j].price > priceCompare[j + 1].price) {
        let temp = priceCompare[j];
        priceCompare[j] = priceCompare[j + 1];
        priceCompare[j + 1] = temp;
      }
    }
  }
  creatProductList(priceCompare);
};

dec.onclick = function () {
  let cat_opt = getOption("#category");
  let price_opt = getOption("#Price");

  creatProductArr(cat_opt, price_opt);
  
  if (!priceCompare) {
    priceCompare = rawdata;
  }
  for (let i = 0; i < priceCompare.length - 1; i++) {
    for (let j = 0; j < priceCompare.length - i - 1; j++) {
      if (priceCompare[j].price < priceCompare[j + 1].price) {
        let temp = priceCompare[j];
        priceCompare[j] = priceCompare[j + 1];
        priceCompare[j + 1] = temp;
      }
    }
  }
  creatProductList(priceCompare);
};