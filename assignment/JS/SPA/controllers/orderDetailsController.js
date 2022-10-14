// save details cart
function saveCart(){
    let cusId= $('#cusid').val();
    let itemCode= $('#itCode').val();
    let itemName= $('#itName').val();
    let itemPrice=$('#itPrice').val();
    let itemsqty=$('#itemsqty').val();
    let balance=$('#balance').val();

    var cartobj={

        cusId,
        itemCode,
        itemName,
        itemPrice,
        itemsqty,
        balance
    }
    cart.push(cartobj)
    console.log(cart)


}
//loas data to table
function loadAllOrders(){
    $('#order-tabelbody').empty();
    for (var i of cart){
        var TbaleRow=`<tr ><td>${i.cusId}</td><td>${i.itemCode}</td><td>${i.itemName}</td><td>${i.itemPrice}</td><td>${i.itemsqty}</td><td>${i.balance}</td><td><button class="btn btn-outline-danger btnRemove" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" onclick="removeFromCart()">remove</button></td></tr>`
        $('#order-tabelbody').append(TbaleRow)
    }
}
//add to cart event
$('#addCart').click(function(){
    $('#order-tabelbody').empty();
    saveCart();
    loadAllOrders();
    // genarateOrderId()
})


//caluclate
$('#itemsqty').keyup(function(){
    let price=$('#itPrice').val()
    let itqty=$('#itemsqty').val();
    let total=price*itqty;
    $('#total').val(total);
    // let subtotal=total+$('#subtotal').val()
    // $('#subtotal').val(subtotal ) ;
})
$('#customerpayment').keyup(function(){
    let tot=  $('#total').val();
    let cash=$('#customerpayment').val()
    let balance=cash-tot;
    $('#balance').val(balance);
})

//function for remove from cart
function removeFromCart(){
    alert('remove')
}