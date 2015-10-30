var apiUrl = 'https://api-test.powerdd.com';
//var apiUrl = 'https://api.powerdd.com';
var apiKey = 'TEST-0002';
//var apiKey = 'BE12B369-0963-40AD-AA40-D68A7516A37B';
var shop = '09A3C5B1-EBF7-443E-B620-48D3B648294E';
//var shop = 'POWERDDH-8888-8888-B620-48D3B6489999';

$(function() {
	$(document).on('change','#password',function(){
		if($('#password').val().length > 0 && $('#username').val().length > 0){
			$('#btn-login').removeClass('disabled');
		}
	})
	$(document).on('click', '#btn-login', function(){
		if ( !$(this).hasClass('disabled') ) {
			$('#message').show();
			if ( $.trim($('#username').val()) == '' ) {
				$('#message').html( '<i class="fa fa-warning"></i> กรุณากรอกชื่อผู้ใช้ด้วยค่ะ' ).addClass('text-danger').removeClass('text-primary');
			}
			else if ( $('#password').val() == '' ) {
				$('#message').html( '<i class="fa fa-warning"></i> กรุณากรอกรหัสผ่านด้วยค่ะ' ).addClass('text-danger').removeClass('text-primary');
			}
			else {
				$('#message').html( '<i class="fa fa-spinner fa-pulse"></i> กำลังตรวจสอบข้อมูล กรุณารอสักครู่ค่ะ' ).addClass('text-primary').removeClass('text-danger');
				$('#btn-login').addClass('disabled');
				$('#username, #password').attr('disabled', 'disabled');
				login();
			}
		}
	});

	$(document).on('keydown', '#username, #password', function(e){
		var key = e.charCode || e.keyCode || 0;
		if (key == 13) {
			$('#btn-login').click();
		}
	});
});
function login(){
	$.post(apiUrl+'/member/login', {
		apiKey: apiKey
		username: $('#username').val(),
		password: $('#password').val(),
		remember: $('#remember').val() ? 1 : 0
	}, function(data){
		if(data.success){
			Console.log(data.result);
		}
	}, 'json').fail( function(xhr, textStatus, errorThrown) { console.log(xhr.statusText); });
};