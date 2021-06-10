


function ShoppingCart(id) {
    this.Items = new Array();
    this.totalPrice = 0;
    this.id = id;
}

ShoppingCart.prototype.AddItem = function(item){
    this.Items[item.id] = item;
    this.totalPrice += item.totalCost;
}


function Item(image, name, price, qty, id) {
    this.image = image;
    this.name = name;
    this.price = price;
    this.quantity = qty;
    this.totalCost = price * qty;
    this.id = id;
}


ShoppingCart.prototype.render = function (divId) {
    var html = this.getProductsHtml(divId);
    document.getElementById(divId).innerHTML = html;
}

ShoppingCart.prototype.getProductsHtml = function (divId) {
    var html = "";
    html += "<div id=\"header\">";
    html += " <i class=\"fa fa-cart-plus\"></i>";
    html += "<span id=\"closeHeader\">x</span>";
    html += "<span id=\"myCart\" >My Cart</span>";
   
    html += "</div>";
    for (i in this.Items) {
        html += "<div class = \"products\" id = \"" + this.Items[i].id + "\">";
        html += "<img src=\"" + this.Items[i].image + "\"></img>";
        html += "<span>" + this.Items[i].name + "</span>";
        html += "<span class=\"item_price\">$" + this.Items[i].price + "</span>";
        html += "<input type=\"text\" class =\"qty\" id = \"" + this.id+ "_" + this.Items[i].id + "_quantity\" onchange='updateQuantity(\"" + this.id +"\",\""+this.Items[i].id + "\",\"" + divId  +"\")' value =" + this.Items[i].quantity + ">";
        html += "<span class=\"t_price\">$" + this.Items[i].totalCost + "</span>";
        html += "<button id=\"close\" onclick='removeItem(\""  + this.id + "\",\"" + this.Items[i].id + "\",\"" + divId + "\")'>x</button>";
        html += "</div>";
    }
    html += "<div class = \"total_price\">Total: ";
    html += "<span id=\"tPrice\">$" + this.totalPrice + "</span>";
    html += "</div>";
    html += "<div id=\"buttons\">";
    html += "<button id =\"close_button\" onclick='Close(\"" + divId + "\")'>Close</button>";
    html += "<button id =\"checkout_button\" onclick='Checkout(\""+ this.totalPrice+"\")'>Checkout</button></div>";
    return html
}

function Checkout(price) {
    if (price > 0) {
        alert("Checkout Successful. Your total bill is " + price);
    }
    else {
        alert("Cart is Empty");
    }
}

function Close(id) {
    document.getElementById(id).innerHTML = "";
}

function updateQuantity(cartid, id, divId) {
    var qty = document.getElementById(cartid + "_" + id + "_quantity").value;
    if (qty < 0 ) {
        alert("Quantity cannot be negative");
        document.getElementById(cartid + "_" + id + "_quantity").value = cartPool[cartid].Items[id].quantity;
    }
    else if(isNaN(qty)){
        alert("Quantity has to be an integer");
        document.getElementById(cartid + "_" + id + "_quantity").value = cartPool[cartid].Items[id].quantity;
    }
    else {
        cartPool[cartid].Items[id].quantity = qty;
        cartPool[cartid].Items[id].totalCost = qty * cartPool[cartid].Items[id].price;
        cartPool[cartid].totalPrice = 0;
        for (i in cartPool[cartid].Items) {
            cartPool[cartid].totalPrice += cartPool[cartid].Items[i].totalCost;
        }
        cartPool[cartid].render(divId);
    }
}

function removeItem(cartid, id, divId) {
   
    var newCart = new ShoppingCart("temp");
    for (i in cartPool[cartid].Items) {
        if (i != id) {
            newCart.Items[i] = cartPool[cartid].Items[i];
            newCart.totalPrice += cartPool[cartid].Items[i].totalCost;
        }
    }

    newCart.id = cartid;
    cartPool[cartid] = newCart;

    cartPool[cartid].render(divId);
}