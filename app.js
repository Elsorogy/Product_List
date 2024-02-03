//#region region Intial Data Source
let productList = [
    {
        "id": 1,
        "name":" LD01 LOUNGE ",
        "price": 200,
        "image": "./images/1.png"
    },
    {
        "id": 2,
        "name":" LD02 LOUNGE",
        "price": 250,
        "image": "./images/2.png"
    },
    {
        "id": 3,
        "name":" LD03 LOUNGE  ",
        "price": 290,
        "image": "./images/3.png"
    },
    {
        "id": 4,
        "name":" LD04 LOUNGE ",
        "price": 200,
        "image": "./images/4.png"
    },
    {
        "id": 5,
        "name":" LD05 LOUNGE  ",
        "price": 300,
        "image": "./images/5.png"
    },
    {
        "id": 6,
        "name":" LD06 LOUNGE ",
        "price": 200,
        "image": "./images/6.png"
    },
    {
        "id": 7,
        "name":" LD07 LOUNGE",
        "price": 200,
        "image": "./images/7.png"
    },
    {
        "id": 8,
        "name":" LD08 LOUNGE ",
        "price": 200,
        "image": "./images/8.png"
    }

];
//#endregion

//#region catch Element html
const basket = document.getElementById("basket");
const body = document.getElementById("mainbody");
const listProducthtml = document.getElementById("listProduct");
const carditem = document.getElementById("idcard");
const patchId = document.getElementById("patchId");
const listCarts = document.getElementById("listCarts");
//#endregion

//#region  product basket
basket.addEventListener("click",() => {
    body.classList.toggle("pop");
   
});

closebtn.addEventListener("click",() =>{
    body.classList.toggle("pop");
    
});
//#endregion


//#region show product on Dom and call fun   // first thing
let creatOneProduct = () =>{
    listProducthtml.innerHTML = "";
    if (productList.length > 0){
        productList.forEach((prod) => {
            let newproduct =document.createElement("div");
            newproduct.classList.add("card");
            newproduct.dataset.id = prod.id;
            newproduct.innerHTML = 
           ` <div class="image">
            <img src="${prod. image}" alt="">
            </div>
            <div class="cardtitle">
            ${prod.name} 
            <span>CHAIR</span>
            </div>
            <div class="price">$ ${prod.price}</div>
            <div class="btn"><button class = "btnCart" id="addcart">Add To Cart</button></div>`;
            listProducthtml.appendChild(newproduct);  
        })
    }   
    
}
creatOneProduct();
//#endregion

//#region function for  i know product exisited in cart or no   // four thing and third thing
// third thing array for product where we put in cart  
var carts = JSON.parse(localStorage.getItem('carts')) || [] ; 

let toCart = (idProduct) => {
    let positionThisProductInCart = carts? carts.findIndex((value) => value.productID == idProduct ):-1;
    if (carts.length <= 0){
        carts = [{
            productID : idProduct,
            quantity : 1 
        }]
    }else if (positionThisProductInCart < 0){
        carts.push({
            productID : idProduct,
            quantity : 1 
        })
    }else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1 ;
    }
    // Update localStorage
   localStorage.setItem('carts', JSON.stringify(carts));
    bindProductSelected();
   
}
//#endregion


//#region function for bind product which i bought in tabcart  //five thing
let bindProductSelected = () => {
    listCarts.innerHTML = '';
    let totalquantity = 0;
    if (carts.length > 0) {
        carts.forEach((cart) => {
            totalquantity = totalquantity + cart.quantity;
            // عشان اجيب كل المعلومات بتاع الاتنين array
            let positionProduct = productList.findIndex((value) => value.id == cart.productID);
            let allInformation = productList[positionProduct];
            let newCart = document.createElement("div");
            newCart.classList.add("listcart1");
            newCart.dataset.id = cart.productID;
            newCart.innerHTML = `
            <div class="imagecart"> 
                <img src="${allInformation.image}" alt="">
            </div>
            <div class="nameproduct">
                ${allInformation.name}
            </div>
            <div class="totalsalary">
                $ ${allInformation.price * cart.quantity}
            </div>
            <div class="quantity">
                <span class="minus"><</span>
                <span class="num">${cart.quantity}</span>
                <span class="plus">></span>
            </div>
            `;
            listCarts.appendChild(newCart);

        });
    }
    
    patchId.innerHTML = totalquantity;
  
    
}
//#endregion

//#region catck button's add to cart and know id for product    // second thing
listProducthtml.addEventListener("click" , (e) => {
    let addProductToCart = e.target;
    if (addProductToCart.classList.contains("btnCart")){
        let productID = addProductToCart.parentElement.parentNode.dataset.id;
        toCart(productID);   
    }
});
//#endregion

//#region plus and minus in Shopping Cart 
listCarts.addEventListener("click", (e) => {
    let positionClick = e.target;
    if (positionClick.classList.contains("minus") || positionClick.classList.contains("plus") ){
        let productCartID = positionClick.parentElement.parentElement.dataset.id;
        let type = "minus";
        if(positionClick.classList.contains("plus")){
            type = "plus"
        }
        changeQuantity(productCartID,type);
    }
});

let changeQuantity = (prodid ,tYpe)=> {
    let positionItemInCart = carts.findIndex((value) => value.productID == prodid);
    if(positionItemInCart >= 0){
        switch (tYpe) {
            case "plus":
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;
        
            default:
                let valueChange = carts[positionItemInCart].quantity - 1 ;
                if (valueChange > 0){
                    carts[positionItemInCart].quantity = valueChange;
                }else{
                    carts.splice(positionItemInCart,1);
                }
                break;
        }
    }
    // Update localStorage
   localStorage.setItem('carts', JSON.stringify(carts));
    bindProductSelected();
    
};
//#endregion


window.addEventListener("load",bindProductSelected() );