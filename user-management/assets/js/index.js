$("#add_user").submit(function(event){
    alert("user Created Successfully")
})

$("#update_user").submit(function(event){
    event.preventDefault()

    let unindexed_array = $(this).serializeArray()
    let data = {}

    $.map(unindexed_array, function(n, i){
        data[n["name"]] = n["value"]
    })

    console.log(data)

    let request = {
        "url" : `https://crud-user-management.onrender.com/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Succesfully")
    })
})

if (window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete")
    $ondelete.click(function(){
        let id = $(this).attr("data-id")

        let request = {
            "url" : `https://crud-user-management.onrender.com/api/users/${id}`,
            "method" : "DELETE"
        }

        if (confirm("Do you want to delete this user?")) {
            $.ajax(request).done(function(response){
                alert("Data Deleted Succesfully")
                location.reload()
            })
        }
    })
}