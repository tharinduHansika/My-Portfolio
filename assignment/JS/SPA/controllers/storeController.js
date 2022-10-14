//customer save button event
$("#itemSave-btn").click(function (){
    saveItem();

    loadAllItem();

    bindRowClickEvents();

    clear();

    alert("Item Successfully Saved!")

});

//item save function
function saveItem(){
    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemPrice = $("#txtItemPrice").val();
    let itemQTY = $("#txtItemQTY").val();

    var itemObj = {
        id: itemCode,
        name: itemName,
        price: itemPrice,
        QTY: itemQTY
    }

    itemArray.push(itemObj);
    console.log(itemObj);
}

//customer clear function
function clear(){
    $('#txtItemCode').val('')
    $('#txtItemName').val('')
    $('#txtItemPrice').val('')
    $('#txtItemQty').val('')
}

//customer get all button event
$("#itemGetAll-btn").click(function (){
    loadAllItem();
    clear();
})

//customer load all button event
function loadAllItem(){

    //remove all the table body content before adding data
    $("#tblItem").empty();

    for (var item of itemArray){

        // Using String Literals to do the same thing as above
        var row = `<tr><td>${item.code}</td><td>${item.Name}</td><td>${item.price}</td><td>${item.QTY}</td></tr>`;

        //then add it to the table body of customer table
        $("#tblItem").append(row);
    }
}

//customer table row click event and load to text field
function bindRowClickEvents() {
    $("#tblItem>tr").click(function () {
        let code = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let price = $(this).children(":eq(2)").text();
        let QTY = $(this).children(":eq(3)").text();
        // console.log(id, name, address, salary);

        //setting table details values to text fields
        $('#txtItemCode').val(code);
        $('#txtItemName').val(name);
        $('#txtItemPrice').val(price);
        $('#txtItemQty').val(QTY);

    });
}

//item search button event
$('#itemSearch-btn').click(function(){
    let typedId = $("#itemSearchTxt").val();
    let item = searchItem(typedCode);
    if (item != null) {
        $('#txtItemCode').val(item.itemCode)
        $('#txtItemName').val(item.itemName)
        $('#txtItemPrice').val(item.itemPrice)
        $('#txtItemQty').val(item.itemQTY)
    } else {
        Swal.fire("Not Available Item for " + typedId)
        setTextfieldValues("", "", "", "");
    }
})

//item search function
function searchItem(itemCode) {
    for (let item of itemArray) {
        if (item.itemCode == itemCode) {
            return item;
            console.log(item)
        }
    }
    return null;
}

//item delete button event
$('#itemDelete-btn').click(function (){
    let itmCode=$("#txtItemCode").val();
    let option=confirm('Do you want to delete this Item'+itmCode)
    if(option){
        if(deleteItem(itmCode)){
            Swal.fire({
                icon: 'delete',
                title: 'Deleted...',
                text: 'Item Successfully Deleted!',
            })
            $('#txtItemCode').val('')
            $('#txtItemName').val('')
            $('#txtItemPrice').val('')
            $('#txtItemQty').val('')
        }
        else{
            Swal.fire("No such item to delete. please check the code" )
        }
    }
})

//item delete function
function deleteItem(itemCode){
    let item= searchItem(itemCode)
    if(item!=null){
        let indexNo= itemArray.indexOf(item);
        itemArray.splice(indexNo,1);
        loadAllItem();
        return true;
    }else{
        return false;
    }
}

//item update button event
$('#itemUpdated-btn').click(function(){
    let itemCode=$('#txtItemCode').val()
    let response=updateItem(itemCode)
    if(response){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Item Updated Successfully',
            showConfirmButton: false,
            timer: 1500
        })
        /*$('#txtCustId').val('')
        $('#txtCustName').val('')
        $('#txtCustAddress').val('')
        $('#txtCustSalary').val('')*/

        clear();
    }
    else{
        Swal.fire("Update Failed..!" )
    }
})

//item update function
function updateItem(itemCode){
    let item= searchCustomer(itemCode)
    if(item !=null){
        item.itemCode=$('#txtItemCode').val()
        item.itemName= $('#txtItemName').val()
        item.itemPrice= $('#txtItemPrice').val()
        item.itemQTY= $('#txtItemQty').val()
        loadAllItem();
        return true
    }
    else{
        return false
    }
}

//enter key focus event and validations
$('#txtItemCode').focus()
$('#txtItemCode').on('keydown',function(event){
    if(event.key=='Enter'){
        var code = /^(I)[0-9]{3}$/;
        var result = code.test($("#txtItemCode").val());
        if (result) {
            $("#txtItemCode").css({
                'border': '2px solid green'
            })
            $('#txtItemName').focus();
        } else {
            $("#txtItemCode").css({
                'border-color': 'red'
            })

            $('#txtItemCode').error='Item Code Pattern is Wrong : C00-001'
        }
    }
})
$('#txtItemName').on('keydown',function(event){
    if(event.key=='Enter'){
        var Name = /^[A-z ]{3,15}$/;
        var result = Name.test($("#txtItemName").val());
        console.log(result);

        if (result) {
            $("#txtItemName").css({
                'border-color': 'green'
            })
            $('#txtItemPrice').focus();
        } else {
            $("#txtItemCode").css({
                'border-color': 'red'
            })
        }
    }
})
$('#txtItemPrice').on('keydown',function(event){
    if(event.key=='Enter'){
        var price=/^[1-9][0-9]*(.[0-9]{2})?$/;
        var result=price.test($('#txtItemPrice').val())
        if(result){
            $('#txtItemPrice').css({
                'border-color': 'green'
            })
            $('#txtItemQty').focus();
        }
        else{
            $('#txtItemPrice').css({
                'border-color': 'red'
            })
        }
    }
})
$('#txtItemQty').on('keydown',function(event){
    if(event.key=='Enter'){
        var QTY=/^[1-9][0-9]*(.[0-9]{2})?$/;
        var result=QTY.test($("#txtItemQty").val())
        if (result){
            $('#txtItemQty').css({
                'border-color': 'green'
            })
            confirm('Do you want to save this Item')
            saveItem();
            loadAllItem();
            clear();
        }
        else{
            $('#txtItemQty').css({
                'border-color': 'red'
            })
        }
    }
})

////disable tab key of all  text fields
$('#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQty').on('keydown',function(event){
    if(event.key=='Tab'){
        event.preventDefault();
    }
})