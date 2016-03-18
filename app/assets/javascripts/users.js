$(document).ready( function(){
  var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/users';

  if (location.pathname === '/') {
    $.ajax({
      url: baseUrl,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        var tbody = $('#users');
        data.users.forEach( function(user){
          var name = user.first_name + ' ' + user.last_name;
          var phone_number = user.phone_number ? user.phone_number : '(Requires Phone Number)';
          var row = '<tr><td>' + name + '</td>';
              row += '<td>' + phone_number + '</td><';
              row += '<td><button data-id="' + user.id + '"class="btn btn-primary blue">Show</button></td></tr>'
              tbody.append(row);
        });
      },
      error: function(error) {
        console.log(error);
        alert('Nigga, wrong database URL:')
      }
    });

    $(document).on('click', '.btn', function(){
      var id = this.dataset.id;
      location.href = '/users/' + id;
    });

  }

  var re = /\/users\/\d+/;
  if (location.pathname.match(re)) {
    var panel = $('#panel');
    var id = panel.data('id');
    $.ajax({
      url: baseUrl + '/' + id,
      type: 'GET',
      dataType: 'JSON',
      success: function(data){
        var user = data.user;
        $('#heading').html(user.first_name + ' ' + user.last_name);
        var list = $('#users');
        var phone_number = '<li>Phone Number: ' + user.phone_number + '</li><br />';
        var remove = '<li><button class="btn btn-danger blue" id="remove">Delete</button></li>';
        list.append(phone_number);
        list.append(remove);
      }
    });
  
    $(document).on('click', '#remove', function(){
      $.ajax({
        url: baseUrl + '/' + id,
        type: 'DELETE',
        success: function() {
          location.href = '/';
        }
      });
    });

  }

  $('#add_user').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: baseUrl,
      type: 'POST',
      dataType: 'JSON',
      data: $(this).serializeArray(),
      success: function(data) {
        console.log(data.user);
        location.href = '/';
      }
    })
  });

  // $('/#add_user#add_user' || '#add_user').on('submit', function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //     url: baseUrl,
  //     type: 'POST',
  //     dataType: 'JSON',
  //     data: $(this).serializeArray(),
  //     success: function(data) {
  //       console.log(data.user);
  //       location.href = '/';
  //     }
  //   })
  // });

});













