//function for load customer ids for combo box
function loadAllCustomerOption(){
    $('#custIDCMB').empty();
    for(let cus of customerArray){
        $('#custIDCMB').append(`<option>${cus.id}</option>`);
    }
}

//function for load item codes for combo box
function loadAllItemOption(){
    $('#itemCodeCMB').empty();
    for(let item of itemArray){
        $('#itemCodeCMB').append(`<option>${item.code}</option>`);
    }
}

//customer combobox click and set value textfeild
$('#custIDCMB').click(function(){
    let val= $('#custIDCMB').val()
    //    $('#cusid').val(val)
    let cus=searchCustomer(val);
    if (cus != null) {
        $('#cusid').val(cus.id)
        $('#txtcusName').val(cus.name)
        $('#txtcusAddress').val(cus.address)
        $('#txtcusSalary').val(cus.salary)
    }
})


//item combobox click and set value textfeild
$('#itemCodeCMB').click(function(){
    let itemVal= $('#itemCodeCMB').val()
    let items=searchItem(itemVal)
    if(items != null){
        $('#itCode').val(items.code)
        $('#itName').val(items.name)
        $('#itPrice').val(items.price)
        $('#itQty').val(items.QTY)
    }
})

//genrate order id
$('#orderId').val(calculateNextId())

//function for generate next order id
function calculateNextId() {
    console.log("calc id")
    if (ordersArray.length > 0) {
        let id = ordersArray[ordersArray.length - 1].orderId;
        let [pre, frag] = id.split("-");
        let num = parseInt(frag) + 1;
        let count = num.toString().length;
        if (count == 1) {
            return pre + "-00" + num;
        } else if (count == 2) {
            return pre + "-0" + num;
        } else {
            return pre + "-" + num;
        }
    } else {
        return "O-001";
    }
}

//calculate total
$('#txtDiscount').on('keyup',function(event) {
    if (event.which == 13) {
        let finalTot = 0;
        let subTot = $('#subtotal').val();
        let disc = $('#txtDiscount').val();
        finalTot = subTot - disc;
        $('#total').val(finalTot);
        console.log(finalTot);
    }
});

//calculate balance
$('#txtCash').on('keyup',function(event) {
    if (event.which == 13) {
        let balance = 0;
        let cash = $('#txtCash').val();
        let total = $('#total').val();
        balance = cash - total;
        $('#balance').val(balance);
        console.log(balance);
    }
});


//event for place order button
$('#btnPlaceOrder').click(function(){
    saveOrder();
    $('#tblCart').empty();
    console.log("this runs")
    clear()
    $('#orderId').val(calculateNextId())
    alert('order has been saved!')


})

//funtion for save order
function saveOrder(){
    let orderId=$('#orderId').val();
    let cusIds= $('#custIDCMB').val();
    let date=$('#txtDate').val();
    let subtotal=$('#subtotal').val();
    let discount = $('#txtDiscount').val();
    let fTotal = $('#total').val();
    let cash = $('#txtCash').val();
    let balance = $('#balance').val();
    let items=cart;

    var orderObj={
        orderId,
        cusIds,
        date,
        subtotal,
        discount,
        fTotal,
        cash,
        balance,
        items

    }
    ordersArray.push(orderObj);
}

//find order id
$('#orderId').on('keyup',function(event){
    if(event.which==13){

        let order = ordersArray.find((order) => {
            return order.orderId ==  $('#orderId').val()
        })
        console.log(order)

        $('#custIDCMB').val(order.orderId);
        $('#txtDate').val(order.date);
        $('#subtotal').val(order.subtotal);
        $('#txtDiscount').val(order.discount);
        $('#total').val(order.fTotal);
        $('#txtCash').val(order.cash);
        $('#balance').val(order.balance);

        // $('#order-tabelbody').empty();
        order.items.forEach(i => {
            var TableRow=`<tr><td>${i.itemCode}</td><td>${i.itemName}</td><td>${i.itemPrice}</td><td>${i.itemsBuyQty}</td><td>${i.itemTotal}</td></tr>`;
                $('#tblCart').append(TableRow);
            }
        )
    }
})


//clear text fields
function clear(){
    $('#custIDCMB').val('');
    $('#txtDate').val('');
    $('#txtcusName').val('');
    $('#txtCusAddress').val('');
    $('#txtCusSalary').val('');
    $('#itemCodeCMB').val('');
    $('#itName').val('');
    $('#itPrice').val('');
    $('#itQty').val('');
    $('#itBuyQty').val('');
    $('#total').val('');
    $('#balance').val('');
    $('#txtCash').val('');
    $('#txtDiscount').val('');
    $('#subtotal').val('');
}
