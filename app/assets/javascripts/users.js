$(document).ready(function(){
    Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
    // Watch for a form submission:
    $("#form-submit-btn").click(function(event){
        event.preventDefault();                          // prevent forms default behavior so it doesn't yet submit 
        $('input[type=submit]').prop('disabled', true);   // this line disables the button to prevent additional clicks
        var error = false;                         //this variable in case we want to use any kind of error notifications
        var ccNum = $('#card_number').val(),       //grabbing those cc details and storing them in these var's
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
        
        if (!error) {                              // if there are no errors...
            //get the stripe token
            Stripe.createToken({                  //send these data/variables to stripe
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            }, stripeResponseHandler);         // once stripe comes back with token, lets run func called stripeResponseHandler
        }
        return false;
    }); // form submission
    
});   //document ready
    
    function stripeResponseHandler (status, response) {        // status and response coming from stripe
        
        if (response.error) {
            // Show the errors on the form
            $form.find('.payment-errors').text(response.error.message);
            $form.find('button').prop('disabled', false); // Re-enable submission
        } else {
        // Get a reference to the form:
        var f = $("#new_user");                             //the entire form is called new_user 
        
        // Get the token from the response:
        var token = response.id;
        
        // Add the token to the form:
        f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
        
        // Submit the form:
        f.get(0).submit();            // in case of multiple forms, get(0) makes sure to grab the first one 
        }
    }
