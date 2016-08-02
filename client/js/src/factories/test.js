var Login = function() {

    var handleLogin = function() {

        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                email: {
                    required: true
                },
                password: {
                    required: true
                }
            },
			
            messages: {
                email: {
                    required: "Username is required."
                },
                password: {
                    required: "Password is required."
                }
            },
            invalidHandler: function(event, validator) { //display error alert on form submit   
                $('.alert-danger', $('.login-form')).show();
            },
            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },
            submitHandler: function(form) {
                form.submit(); // form validation success, call ajax form submit
            }
        });

        $('.forget-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                email: {
                    required: true,
                    email: true,
                }
            },
            invalidHandler: function(event, validator) { //display error alert on form submit   
                $('.alert-danger', $('.forget-form')).show();
            },
            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            submitHandler: function(form) {
              
                var formData = $('.forget-form').serialize();
                
                $.ajax({
                    type     : "POST",       
                    url      : '/password/email', 
                    data : formData,  
                    success  : function(response) { 
                        if(response.error == true){
                            toastr.warning(response.msg, 'Warning');
                        } else {
                            toastr.success(response.msg, 'Success');
                        }

                        $('.forget-form').fadeOut(function(){
                            $('.login-form').fadeIn('slow');
                        });
                        
                    },
                    error : function(){
                        toastr.error('There was a problem, please try again', 'Warning');
                    } 
                });               

            }
        });

        $('.reset-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                email: {
                    required: true,
                    email: true,
                },
                password : {
                    required  : true,
                    minlength : 6
                },
                password_confirmation : {
                    required  : true,
                    equalTo : "#password"
                }
            },
            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.row').addClass('has-error'); // set error class to the control group
            },
            success: function(label) {
                label.closest('.row').removeClass('has-error');
                label.remove();
            },
            submitHandler: function(form) {
                form.submit();
            }
        });

        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    $('.login-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });

        $('.forget-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.forget-form').validate().form()) {
                    $('.forget-form').submit();
                }
                return false;
            }
        });

        $('#forget-password').click(function(){
            $('.login-form').hide();
            $('.forget-form').show();
        });

        $('#back-btn').click(function(){
            $('.login-form').show();
            $('.forget-form').hide();
        });
    }


    return {

        init: function() {

            handleLogin();

            // init background slide images
            $('.login-bg').backstretch([
                "/webz/assets/pages/img/login/1.jpg",
                "/webz/assets/pages/img/login/2.jpg",
                "/webz/assets/pages/img/login/3.jpg",
                "/webz/assets/pages/img/login/4.jpg",
                "/webz/assets/pages/img/login/5.jpg",
                "/webz/assets/pages/img/login/6.jpg",
                "/webz/assets/pages/img/login/7.jpg",
                "/webz/assets/pages/img/login/8.jpg",
                "/webz/assets/pages/img/login/9.jpg",
                "/webz/assets/pages/img/login/10.jpg",
                "/webz/assets/pages/img/login/11.jpg",
                "/webz/assets/pages/img/login/12.jpg",
                ], {
                  fade: 1000,
                  duration: 5000
                }
            );

        }

    };

}();

jQuery(document).ready(function() {
    Login.init();
});