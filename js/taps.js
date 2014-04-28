/**********************************************
 Blackbaud Design Custom JavaScript
***********************************************
 Client: Mobile Taps
 Author(s): Ben Worley
 Product(s): BBNC/BBIS
 Created: Feb 2, 2014
 Updated: April 8, 2014
***********************************************

***********************************************

**********************************************/

BBI_TAPS = {

	taps: {

		bbnc: {

			pageLoad: function(){
			
				BBI_TAPS.taps.bbnc.tapsForm();
			},
			
			paneRefresh: function(){
				BBI_TAPS.taps.bbnc.newFormValidation();
				BBI_TAPS.taps.bbnc.oldFormValidation();
			},
			
			// Mobile Taps Donation Form
			tapsForm: function() {
			
				// Define all vars
				var rdoGiveAmt, clearFieldBtn, existingCardYearExpList;
				
				// Set all vars
				
				rdoGiveAmt = 'dl#givingRdoList input[type="radio"]';
				//
				clearFieldBtn = '<i class="iconClearField">&#xf057;</i>';
				
				//
				existingCardYearExpList = $('select[id*="cboYear"]').children().clone();			
				
				// Get Giving Amount Selected
					$(rdoGiveAmt).on('click' , function () {
						var rdoAmtChk = $('dl#givingRdoList input[type="radio"]:checked').val();
						$('input[id*="txtAmount"]').val(rdoAmtChk);
					});
			
			// Insert Clear Button Icon
						
				$('#optimizedDonateForm input[type="text"], #optimizedDonateForm input[type="tel"], #optimizedDonateForm input[type="email"]').each(function(){
					$(clearFieldBtn).insertBefore(this);
				});
				
			// Clear field and Add/Remove Class
			
				$('.iconClearField').click(function(){
					$(this).next().val('').removeClass().focus();
					if($(this).next().val('')){
						$(this).hide();
					}
					if($('.userFirstLastNameOption').hasClass('on')) {
						$('.userFirstLastNameOption').removeClass('on');
					}
				});
				
			// Show/Hide Clear Field Icon
			
				$('#optimizedDonateForm input[type="text"], #optimizedDonateForm input[type="tel"], #optimizedDonateForm input[type="email"]').keyup(function(){
					if($(this).val() > '') {
						$(this).prev('.iconClearField').show();
					}
					else {
						$(this).prev('.iconClearField').hide();
					}
				});
				
				// Build Card Year Exp
				$(existingCardYearExpList).appendTo('select#cardExpYear');
				$('<option selected value="">Year</option>').prependTo('select#cardExpYear');
				
				// Move Old Donation form Submit Button
				$('table.DonationFormTable input[id*="btnNext"].DonationSubmitButton').clone().insertAfter('ol#optimizedDonateForm');

	
			},
			
			newFormValidation: function() {
				
				// Define all vars here
				var cardholderName, mailingName, cardNumber, cardExpMnth, cardExpYr, cardSecCode, zipCode, addNameTxt, alphaOnlyValidator, zipCodeValidator, emailValidator, creditCardValidator, csvValidator, cardTypeVisa, cardTypeMasterCard, cardTypeAmEx, cardTypeDiscover, cardTypeIvalid, cardType,oldBillingFirstName, oldBillingLastName, oldBillingZip, oldCardholderName, oldCardNumber, oldCardExpMonth, oldCardExpYear;
				
				// Set all vars here
				// New Form variables
				emailAdd = 'input#email[type="email"]';
				//
				cardholderName = 'input#cardholder[type="text"]';
				//
				mailingName = 'input#mailingName[type="text"]';
				//
				cardNumber = 'input#cardNumber[type="tel"]';
				//
				cardExpMnth = 'select#cardExpMonth';
				//
				cardExpYr = 'select#cardExpYear';
				//
				cardSecCode = 'input#cscCode';
				//
				zipCode = $('input#zip[type="tel"]');
				//
				addNameTxt = $('.iconAddName').text();
				// Reg Ex Form Validation
				alphaOnlyValidator = new RegExp(/^[a-zA-Z ]+$/);
				zipCodeValidator = new RegExp(/^\d{5}$|^\d{5}-\d{4}$/);
				emailValidator = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
				creditCardValidator = new RegExp(/^\d{4}-?\d{4}-?\d{4}-?\d{3,4}$/);
				csvValidator = new RegExp(/^\d{3,4}$/);
				// Credit card type Reg Ex
				cardTypeVisa = new RegExp(/^4$/);
				cardTypeMasterCard = new RegExp(/^5$/);
				cardTypeAmEx = new RegExp(/^3$/);
				cardTypeDiscover = new RegExp(/^6$/);
				cardTypeIvalid = new RegExp(/^(0|1|2|7|8|9)$/);
				cardType = '.cardTypeEnt';
				
				// Old Form variables
				oldBillingEmail = 'table.DonationFormTable input[id*="txtEmailAddress"]';
				oldBillingFirstName = 'table.DonationFormTable input[id*="txtFirstName"]';
				oldBillingLastName = 'table.DonationFormTable input[id*="txtLastName"]';
				oldBillingZip = 'table.DonationFormTable input[id*="ZipUS"]';
				oldCardholderName = 'table.DonationFormTable input[id*="txtCardholder"]';
				oldCardNumber = 'table.DonationFormTable input[id*="txtCardNumber"]';
				oldCardExpMonth = 'table.DonationFormTable select[id*="cboMonth"]';
				oldCardExpYear = 'table.DonationFormTable select[id*="cboYear"]';
				oldCardSecurityCode = 'table.DonationFormTable input[id*="txtCSC"]';
												
				// Get Email Address Entered
					$(emailAdd).keyup(function(){
						var emailAddEnt = $(emailAdd).val();
						if (!$(this).val().match(emailValidator))
						{
							$(this).addClass('invalid');
							
						}
						else
						{
							$(this).removeClass('invalid').addClass('valid');
							$(oldBillingEmail).val(emailAddEnt);
						}
						
					});
					
					$(emailAdd).blur(function(){
						var emailAddEnt = $(emailAdd).val();
						if (!$(this).val().match(emailValidator))
						{
							$(this).addClass('invalid');
						}
						else
						{
							$(this).removeClass('invalid').addClass('valid');
							$(oldBillingEmail).val(emailAddEnt);
						}
						
					});
									
				
				// Get Cardholder Entered
					$(cardholderName).keyup(function (){
						
						var cardHolderEnt = $(cardholderName).val();
						
						if (!$(this).val().match(alphaOnlyValidator))
						{
							$(this).addClass('invalid');
							$('.userFirstLastNameOption').removeClass('on');
						}
						else
						{
							$(this).removeClass('invalid').addClass('valid');
							$('.userFirstLastNameOption').addClass('on');
							$(oldCardholderName).val(cardHolderEnt);
						}
					});
					
					$(cardholderName).blur(function (){
						var cardHolderEnt = $(cardholderName).val();
						//
						var billingFirstName = $(cardholderName).val().split(' ').slice(0, -1).join(' ');
						//
						var billingLastName = $(cardholderName).val().split(' ').slice(-1).join(' ');
						
						if (!$(this).val().match(alphaOnlyValidator))
						{
							$(this).addClass('invalid');
							$('.userFirstLastNameOption').removeClass('on');
						}
						else
						{
							$(this).removeClass('invalid').addClass('valid');
							$('.userFirstLastNameOption').addClass('on');
							$(oldCardholderName).val(cardHolderEnt);
							$(oldBillingFirstName).val(billingFirstName);
							$(oldBillingLastName).val(billingLastName);
						}
					});

				// Different Mailing First and Last Name
					$('.iconAddName').on('click' , function() {
						$('li.mailingName').slideToggle('fast');
						$(this).toggleClass('active');
						if($(this).hasClass('active')) {
							$(this).text('close');
						}
						else {
							$(this).text(addNameTxt);
						}
					});
				
				// Get Mailing Name Entered
				
					$(mailingName).keyup(function (){
						var mailingNameEnt = $(mailingName).val();
						if (!$(this).val().match(alphaOnlyValidator))
						{
							$(this).addClass('invalid');
						}
						else
						{
							$(this).removeClass('invalid').addClass('valid');
						}
					});
					
									
				// Add Card type class and text based on Card Number entered
				
					$(cardNumber).keyup(function ()
					{
						if ($(this).val().match(cardTypeVisa))
						{
							$(this).removeClass().addClass('cardTypeVisa');
							$(cardType).html('Visa');
							$('table.DonationFormTable select[id*="cboCardType"]').find('option:contains(Visa)').attr('selected','selected');
						}
						else if ($(this).val().match(cardTypeMasterCard))
						{
							$(this).removeClass().addClass('cardTypeMastercard');
							$(cardType).html('Mastercard');
							$('table.DonationFormTable select[id*="cboCardType"]').find('option:contains(Mastercard)').attr('selected','selected');
						}
						else if ($(this).val().match(cardTypeAmEx))
						{
							$(this).removeClass().addClass('cardTypeAmEx');
							$(cardType).html('American Express');
							$('table.DonationFormTable select[id*="cboCardType"]').find('option:contains(American)').attr('selected','selected');
						}
						else if ($(this).val().match(cardTypeDiscover))
						{
							$(this).removeClass().addClass('cardTypeDiscover');
							$(cardType).html('Discover');
							$('table.DonationFormTable select[id*="cboCardType"]').find('option:contains(Discover)').attr('selected','selected');
						}
						else if ($(this).val().match(cardTypeIvalid))
						{
							$(this).removeClass().addClass('cardTypeInvalid');
							$(cardType).html('');
						}
					});
					
					// Get Card Type Based on Card Number
						var cardTypeEnt = $(cardType).text();
						$('aside ol li .cardTypeEnt').text(cardTypeEnt);

				
				// Get Credit Card Number Entered
					
					$(cardNumber).keyup(function (){
						var cardNumEnt = $(cardNumber).val();
						if($(this).val().match(creditCardValidator)) {
							$(this).removeClass('invalid').addClass('valid');
							$('input[id*="DonationCapture1_txtCardNumber"]').val(cardNumEnt);
						}
						else {
							$(this).removeClass('valid').addClass('invalid');
						}
					});
					
					$(cardNumber).blur(function (){
						var cardNumEnt = $(cardNumber).val();
						if($(this).val().match(creditCardValidator)) {
							$(this).removeClass('invalid').addClass('valid');
							$('input[id*="DonationCapture1_txtCardNumber"]').val(cardNumEnt);
						}
						else {
							$(this).removeClass('valid').addClass('invalid');
						}
					});
						
				// Get Card Exp Month
				
					$(cardExpMnth).change(function (){
						var cardExpMnthSel = $('select#cardExpMonth :selected').val();
						//
						$(oldCardExpMonth).find('option:contains("' + cardExpMnthSel + '")').attr('selected','selected');
					});
					
				
				// Get Card Exp Month
				
					$(cardExpYr).change(function (){
						var cardExpYrSel = $('select#cardExpYear :selected').val();
						$(oldCardExpYear).find('option:contains("' + cardExpYrSel + '")').attr('selected','selected');
					});
					
				
				// Get CSC Entered
				
					$(cardSecCode).keyup(function (){
						var cscEnt = $(cardSecCode).val();
						if (!$(this).val().match(csvValidator))
						{
							$(this).addClass('invalid');
						}
						else
						{
							$(this).removeClass('invalid').addClass('valid');
							$(oldCardSecurityCode).val(cscEnt);
						}
					});
					
					$(cardSecCode).blur(function (){
						var cscEnt = $(cardSecCode).val();
						if (!$(this).val().match(csvValidator))
						{
							$(this).addClass('invalid');
						}
						else
						{
							$(this).removeClass('invalid').addClass('valid');
							$(oldCardSecurityCode).val(cscEnt);
						}
					});

				// Get ZIP Entered
				
					$(zipCode).keyup(function () {
						var zipCodeEnt = $(zipCode).val();
						if (!$(this).val().match(zipCodeValidator))
						{
							$(this).addClass('invalid');
						}
						else
						{
							$(this).removeClass('invalid').addClass('valid');
							$(oldBillingZip).val(zipCodeEnt);
						}
						if(($('#optimizedDonateForm li .invalid').length === 0) && ($('#optimizedDonateForm li input[type="text"]').val() !== '')  && ($('#optimizedDonateForm li input[type="email"]').val() !== '') && ($('dl#givingRdoList input[type="radio"]').is(':checked'))) {
							$('ol#optimizedDonateForm + input[id*="btnNext"].DonationSubmitButton').removeAttr('disabled','disabled').attr('enabled','enabled');
						}
					});
					
					$(zipCode).blur(function () {
						var zipCodeEnt = $(zipCode).val();
						if (!$(this).val().match(zipCodeValidator))
						{
							$(this).addClass('invalid');
						}
						else
						{
							$(this).removeClass('invalid').addClass('valid');
							$(oldBillingZip).val(zipCodeEnt);
						}
						if(($('#optimizedDonateForm li .invalid').length === 0) && ($('#optimizedDonateForm li input[type="text"]').val() !== '')  && ($('#optimizedDonateForm li input[type="email"]').val() !== '')) {
							$('ol#optimizedDonateForm + input[id*="btnNext"].DonationSubmitButton').removeAttr('disabled','disabled').attr('enabled','enabled');
						}
					});
					
					
				},
				// end newFormValidation
				
				oldFormValidation: function() {
				
									//
				$('ol#optimizedDonateForm + input[id*="btnNext"].DonationSubmitButton').removeAttr('enabled' , 'enabled').attr('disabled' , 'disabled');
				
				
					
					$('[id*="tblAmount"] input[id*="rdoOther"][type="radio"]').trigger('click' , function () {
						$(this).attr('checked','checked');
					});
					// Placeholder for required Address
					$('textarea[id*="tb_AddressLine"]').val('123 Abc Lane');
					
					// Placeholder for required City
					$('input[id*="CityUS"]').val('Charleston');
					
					// Placeholder for required State
					$('select[id*="dd_StateUS"] option:contains(SC)').attr('selected','selected');
					
					// Clone Old Form Error Div 
					//var oldFormErrorDiv = $('table.DonationFormTable .DonationValidationSummary').html();
					//
					$('.DonationValidationSummary ul li').each(function(){
						$(this).replaceWith("<div class='serverSideErrorMsg'>" + $(this).text() + "</div>")
					});
					
					if($('table.DonationFormTable .DonationValidationSummary ul').length > 0) {
						//
						$('table.DonationFormTable .DonationValidationSummary').clone().insertBefore('ol#optimizedDonateForm').hide();
						//
						$('table.DonationFormTable .DonationValidationSummary div:contains(Amount)').text('Amount' + ':' + ' Required').insertAfter('dl#givingRdoList');
						//
						$('table.DonationFormTable .DonationValidationSummary div:contains(Credit Card Number)').insertAfter('input#cardNumber');
						//
						$('table.DonationFormTable .DonationValidationSummary div:contains(Cardholder)').insertAfter('input#cardholder');
						//
						$('table.DonationFormTable .DonationValidationSummary div:contains(Last Name)').insertAfter('input#cardholder');
						//
						$('table.DonationFormTable .DonationValidationSummary div:contains(Month Required)').insertAfter('select#cardExpYear');
						//
						$('table.DonationFormTable .DonationValidationSummary div:contains(Year Required)').insertAfter('select#cardExpYear');
						//
						$('table.DonationFormTable .DonationValidationSummary div:contains(ZIP)').text('ZIP' +':'+' Required').insertAfter('input#zip');
						//
						$('table.DonationFormTable .DonationValidationSummary div:contains(Email)').insertAfter('input#email');
					}
						
				} //end oldFormValidation

			
				
		} // end bbnc

	} // end taps

}; // end BBI

/*
===================================================
 Run Global Functions 
---------------------------------------------------
 Default load methods to be used inside BBNC:
 * Sys.WebForms
 Event raised after all content on the page is 
 refreshed or loaded after postback. Can be 
 add_pageLoaded () or remove_pageLoade();

 Alternative load methods to be used outside BBNC:
 * $(window).load();
 Triggered after the window is loaded

 * $(document).ready();  
 Triggered after all assets completely received.	
---------------------------------------------------
*/

// Functions to run each time the page loads
$(document).ready( function(){
	BBI_TAPS.taps.bbnc.pageLoad();
});

// Functions to run each time the pane is refreshed
try {
     Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function() {
           BBI_TAPS.taps.bbnc.paneRefresh();
     });
}
catch(err) {
     console.log('Sys is probably undefined');
     $(document).ready( function(){
           BBI_TAPS.taps.bbnc.paneRefresh();
     });
}



