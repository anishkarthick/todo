$(document).ready(function () {
    var methodName = ""
    var dynamicUrl = ""

    getdata();
    $('#reset').click(function () {
        $('#id').val('')
        $('#description').val('')
        $('#status').val('')
    })

    $('#add').click(function (event) {
        event.preventDefault();
        var description = $("#description").val();
        var status = $("#status").val();
        var id = $("#id").val();
        if (id) {
            methodName = 'put';
            dynamicUrl = '/updateTask/' + id;
        } else {
            methodName = 'post';
            dynamicUrl = '/addTask';
        }
        $.ajax({
            url: dynamicUrl,
            method: methodName,
            dataType: 'json',
            data: {
                'description': description,
                'status': status
            },
            success: function (response) {
                if (response.msg == 'success') {
                    alert('task saved successfully');
                    getdata();
                    $('#id').val('')
                    $('#description').val('')
                    $('#status').val('')
                } else {
                    alert('Please enter all fields correctly');
                }
            },
            error: function (response) {
                alert('server error occured')
            }
        });
    });

    $(document).on('click', 'button.del', function () {
        var id = $(this).parent().find('button.del').val();
        $.ajax({
            url: '/deleteTask/:id',                       //web
            //  url: '/deleteTask'+id,                 //api
            method: 'delete',
            dataType: 'json',
            data: { 'id': id },
            success: function (response) {
                if (response.msg == 'success') {
                    alert('data deleted');
                    getdata();
                } else {
                    alert('data not get deleted');
                }
            },
            error: function (response) {
                alert('delete server error')
            }
        });
    });

    $(document).on('click', 'button.update', function () {
        var id = $(this).parent().find('button.update').val();
        $.ajax({
            url: '/getTask/' + id,
            method: 'get',
            dataType: 'json',
            success: function (response) {
                if (response.msg == 'success') {
                    $('#id').val(response.data._id)
                    $('#description').val(response.data.description),
                        $('#status').val(response.data.status)
                    getdata();
                }
            },
            error: function (response) {
                console.log(response)
                alert('update server error')
            }
        });
    })

    function getdata() {
        $.ajax({
            url: '/getTasks',
            method: 'get',
            dataType: 'json',
            success: function (response) {
                if (response.msg == 'success') {
                    $('tr.taskrow').remove()
                    if (response.data == undefined || response.data == null || response.data == '') {
                        $('.tblData').hide();
                    } else {
                        $('.tblData').show();
                        $.each(response.data, function (index, data) {
                            var url = url + data._id;
                            index += 1;
                            $('tbody')
                                .append("<tr class='taskrow'><td>" + index + "</td><td>" + data.description + "</td><td>" + data.status + "</td><td>" + "<button style=' border-radius: 8px;border: none;color: white;background-color: #4CAF50;padding: 7px 10px;text-align: center;text-decoration: none;display: inline-block;font-size: 12px;margin: 4px 2px;cursor: pointer;' class='update' value='" + data._id + "'>update</button>" + "</td><td>" + "<button style=' border-radius: 8px;border: none;color: white;background-color: #ee3131;padding: 7px 10px;text-align: center;text-decoration: none;display: inline-block;font-size: 12px;margin: 4px 2px;cursor: pointer;' class='del' value='" + data._id + "'>delete</button>" + "</td></tr>");
                        });
                    }
                }
            },
            error: function (response) {
                alert('get server error');
            }
        });
    }

    $(function () {
        $('#logout').click(function (event) {
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "/logout",
                success: function (response) {
                    alert("Logged out successfully!");
                    window.location.href = "/login";

                }
            });
        });
    });

}); 
