//下方代码是旧版本
// for (let i = 0; i < dataList.length; i++) {
//   //item_title.push(dataList[i].title);
//   // item_price.push(dataList[i].price);
//   let div = document.createElement('div');
//   wrap.appendChild(div);
//   let inner_div = document.createElement('div');
//   inner_div.innerHTML = "123";
//   wrap.children[i].appendChild(inner_div);

//   let prod_Id = dataList[i].prodId;
//   let prod_title = dataList[i].title;

//   let product_url = "./detail.html?prodId=" + prod_Id + "&prodTitle=" + prod_title;

//   //创建a链接 并给每个a标签的链接里放入productID和title，在detail页面里再获取
//   let as = document.createElement('a');
//   div.innerHTML += '<a href = "'+product_url+'">click</a>';

//   let p_description = document.createElement('p');
//   p_description.innerHTML = prod_title;
//   div.appendChild(p_description);

//   let p_price = document.createElement('p');
//   p_price.innerHTML = "$" + dataList[i].price;
//   div.appendChild(p_price);
// }

// let click = document.querySelectorAll('a');

// let index = 0;
// for (let i = 0; i < click.length; i++) {
//   click[i].setAttribute('index',i);
//   click[i].onclick = function getClick() {
//     index = this.getAttribute('index');
//     alert(index);
//     return index;
//   }
// }