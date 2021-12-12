//获取url参数函数
function getQueryVariable(variable) {
  let query = window.location.search.substring(1);
  console.log(query);
  let str = query.split("&");
  console.log(str);
  for (i of str) {
    let pair = i.split("=");
    console.log(pair);
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

//获取url里的product ID
let id = getQueryVariable("prodId");
console.log(id);
//创建一个P标签
let div = document.createElement('div');
document.body.appendChild(div);

//外循环遍历数组 内循环遍历对象找到prodID这个key，然后比对value，如果value等于获得的URL链接里的ID，则代表当前对象为点击的那个对象
for (let i = 0; i < rawdata.length; i++) {
  for (let k in rawdata[i]) {
    if (k == "prodId") {
      if(rawdata[i][k] ==id )
      {
        // console.log(k);
        // console.log(rawdata[i][k]);
        // console.log(rawdata[i].description);
        div.setAttribute('class', 'wrap')
        div.innerHTML = `
        <div class="col-3"><img src = "https://storage.googleapis.com/luxe_media/wwwroot/${rawdata[i].productMedia[0].url}"></div>
        <div class="col-3">
          <div class = "row"><p class = "col-4">Product Title:</p> <p class = "col-8">${rawdata[i].title}</p></div>
          <div class = "row"><p class = "col-4">Price:</p> <p class = "col-8">$${rawdata[i].price}</p></div>
          <div class = "row"><p class = "col-4">Description: </p> <p class = "col-8">${rawdata[i].description}</p></div>
          <div class = "row"><p class = "col-4">Available Stock:</p> <p class = "col-8">${rawdata[i].availableStock}</p></div> 
        </div>    
        `;
        break;
      }
    }
  }
}


