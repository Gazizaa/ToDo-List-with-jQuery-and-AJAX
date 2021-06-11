function addTask(){
    let value = $('#input').val()
    let data = {
        task: value
    }
    if(value === '') {
        alert('You must write something!')
    } else {
        $.post("http://localhost:3000/lists", data, response => {
        console.log(response)
    })
    $('#input').val('')
    getList()
    }
}

$(document).on('keypress', function (e) {
    if(e.keyCode === 13){
        addTask()
    }
})

$(function(){
    getList()
})

function getList() {
    $.get("http://localhost:3000/lists", (data) => {
        $('#content').html('')
        let content = ""
        data.map(item => {
            content += "<div class='row'>" + "<p>" + item.task +"</p>" + "<button class='deleteBtn' onclick='deleteTask("+ item.id +")'>" + "<img src='./delete.png' alt='delete-button' >" + "</button>" + "</div>";
        })
        $('#content').append(content) 
    })
}

function deleteTask(id) {
    $.ajax({
     type: 'DELETE',   
     url: "http://localhost:3000/lists/" + id,
     success: function () {
         getList()
     }
 }) 
} 
