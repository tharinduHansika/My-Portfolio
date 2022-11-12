var queData = {
    persons:[
        {name:"A"},
        {name:"B"},
        {name:"C"},
        {name:"D"},
        {name:"E"},
        {name:"F"}
    ],
    nextPerson:function (){
        var lastPerson=this.persons.pop();
        this.persons.unshift(lastPerson);
    }
}

personQue();

function personQue(){
    $(`#container`).empty();
    for (let i = 0; i < queData.persons.length; i++) {
        $(`#container`).append(`<div><h5>${queData.persons[i].name}</h5></div>`);
    }
    queData.nextPerson();
}

setInterval(personQue,1000);