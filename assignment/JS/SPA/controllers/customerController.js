//customer save button event
$("#customerSave-btn").click(function (){
    saveCustomer();

    loadAllCustomer();

    bindRowClickEvents();

    clear();

    alert("Customer Successfully Saved!")

});

//customer save function
function saveCustomer(){
    let customerID = $("#txtCustID").val();
    let customerName = $("#txtCustName").val();
    let customerAddress = $("#txtCustAddress").val();
    let customerSalary = $("#txtCustSalary").val();

    var customerObj = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        salary: customerSalary
    }

    customerArray.push(customerObj);
    console.log(customerObj);
}

//customer clear function
function clear(){
    $('#txtCustId').val('')
    $('#txtCustName').val('')
    $('#txtCustAddress').val('')
    $('#txtCustSalary').val('')
}

//customer get all button event
$("#customerGetAll-btn").click(function (){
    loadAllCustomer();
    clear();
})

//customer load all button event
function loadAllCustomer(){

    //remove all the table body content before adding data
    $("#tblCustomer").empty();

    for (var customer of customerArray){

        // Using String Literals to do the same thing as above
        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;

        //then add it to the table body of customer table
        $("#tblCustomer").append(row);
    }
}

//customer table row click event and load to text field
function bindRowClickEvents() {
    $("#tblCustomer>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let salary = $(this).children(":eq(3)").text();
        // console.log(id, name, address, salary);

        //setting table details values to text fields
        $('#txtCustID').val(id);
        $('#txtCustName').val(name);
        $('#txtCustAddress').val(address);
        $('#txtCustSalary').val(salary);

    });
}

//customer search button event
$('#customerSearch-btn').click(function(){
    let typedId = $("#customerSearchTxt").val();
    let customer = searchCustomer(typedId);
    if (customer != null) {
        $('#txtCustId').val(customer.customerId)
        $('#txtCustName').val(customer.custonerName)
        $('#txtCustAddress').val(customer.customerAddress)
        $('#txtCustSalary').val(customer.customerSalary)
    } else {
        Swal.fire("Not Available Customer for " + typedId)
        setTextfieldValues("", "", "", "");
    }
})

//customer search function
function searchCustomer(custID) {
    for (let customer of customers) {
        if (customer.customerId == cusID) {
            return customer;
            console.log(customer)
        }
    }
    return null;
}

//customer delete button event
$('#delete-btn').click(function (){
    let cusId=$("#customer-search").val();
    let option=confirm('Do you want to delete this customer'+cusId)
    if(option){
        if(deleteCustomer(cusId)){
            Swal.fire({
                icon: 'delete',
                title: 'Deleted...',
                text: 'Customer Successfully Deleted!',
            })
            $('#txtCustId').val('')
            $('#txtcustName').val('')
            $('#txtcustAddress').val('')
            $('#txtcustSalary').val('')
        }
        else{
            Swal.fire("No such customer to delete. please check the id" )
        }
    }
})

//customer delete function
function deleteCustomer(customerID){
    let customer= searchCustomer(customerID)
    if(customer!=null){
        let indexNo= customers.indexOf(customer);
        customers.splice(indexNo,1)
        loadAllCustomers()
        return true;
    }else{
        return false;
    }
}

//customer update button event
$('#customerUpdate').click(function(){
    let cutomerId=$('#txtcustomerId').val()
    let response=updateCustomer(cutomerId)
    if(response){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Customer Updated Successfully',
            showConfirmButton: false,
            timer: 1500
        })
        $('#txtcustomerId').val('')
        $('#txtcustomerName').val('')
        $('#txtcustomerAddress').val('')
        $('#txtcustomerSalary').val('')
    }
    else{
        Swal.fire("Update Failed..!" )
    }
})

//customer update function
function updateCustomer(customerID){
    let customer= searchCustomer(customerID)
    if(customer !=null){
        customer.customerID=$('#txtcustomerId').val()
        customer.custonerName= $('#txtcustomerName').val()
        customer.customerAddress= $('#txtcustomerAddress').val()
        customer.customerSalary= $('#txtcustomerSalary').val()
        loadAllCustomers()
        return true
    }
    else{
        return false
    }
}

//enter key focus event and validations
$('#txtcustomerId').focus()
$('#txtcustomerId').on('keydown',function(event){
    if(event.key=='Enter'){
        var id = /^(C)[0-9]{3}$/;
        var result = id.test($("#txtcustomerId").val());
        if (result) {
            $("#txtcustomerId").css({
                'border': '2px solid green'
            })
            $('#txtcustomerName').focus();
        } else {
            $("#txtcustomerId").css({
                'border-color': 'red'
            })

            $('#txtcustomerId').error='Customer ID Pattern is Wrong : C00-001'
        }
    }
})
$('#txtcustomerName').on('keydown',function(event){
    if(event.key=='Enter'){
        var Name = /^[A-z ]{3,15}$/;
        var result = Name.test($("#txtcustomerName").val());
        console.log(result);

        if (result) {
            $("#txtcustomerName").css({
                'border-color': 'green'
            })
            $('#txtcustomerAddress').focus();
        } else {
            $("#txtcustomerName").css({
                'border-color': 'red'
            })
        }
    }
})
$('#txtcustomerAddress').on('keydown',function(event){
    if(event.key=='Enter'){
        var address=/^[A-z0-9 ,/]{4,20}$/
        var result=address.test($('#txtcustomerAddress').val())
        if(result){
            //no3,Galle
            $('#txtcustomerAddress').css({
                'border-color': 'green'
            })
            $('#txtcustomerSalary').focus();
        }
        else{
            $('#txtcustomerAddress').css({
                'border-color': 'red'
            })
        }
    }
})
$('#txtcustomerSalary').on('keydown',function(event){
    if(event.key=='Enter'){
        var salary=/^[1-9][0-9]*(.[0-9]{2})?$/;
        var result=salary.test($("#txtcustomerSalary").val())
        if (result){
            $('#txtcustomerSalary').css({
                'border-color': 'green'
            })
            confirm('Do you want to save this customer')
            saveCustomer();
            loadAllCustomers();
            clear();
        }
        else{
            $('#txtcustomerSalary').css({
                'border-color': 'red'
            })
        }
    }
})

////disable tab key of all  text fields
$('#txtcustomerId,#txtcustomerName,#txtcustomerAddress,#txtcustomerSalary').on('keydown',function(event){
    if(event.key=='Tab'){
        event.preventDefault();
    }
})