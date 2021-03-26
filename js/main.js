 var ParAccEndpoint = "http://nexpay.co/api/v1/parameters/",
        OrdersEndPoint = "http://nexpay.co/api/v1/orders/",
       /* ParAccEndpoint = "http://localhost:8000/api/v1/parameters/",
        OrdersEndPoint = "http://localhost:8000/api/v1/orders/",*/
        paypal_pct = 0.00,
        paypal_fee = 0.00,
        nexpay_fee = 0.00,
        exchange_rate = 0.00

/* ========================================================================= */
/*	Preloader
/* ========================================================================= */

jQuery(window).load(function(){

	$("#preloader").fadeOut("slow");

});

/* ========================================================================= */
/*  Welcome Section Slider
/* ========================================================================= */

$(function() {


    var Page = (function() {

        var $navArrows = $( '#nav-arrows' ),
            $nav = $( '#nav-dots > span' ),
            slitslider = $( '#slider' ).slitslider( {
                onBeforeChange : function( slide, pos ) {

                    $nav.removeClass( 'nav-dot-current' );
                    $nav.eq( pos ).addClass( 'nav-dot-current' );

                }
            } ),

            init = function() {

                initEvents();
                
            },
            initEvents = function() {

                // add navigation events
                $navArrows.children( ':last' ).on( 'click', function() {

                    slitslider.next();
                    return false;

                } );

                $navArrows.children( ':first' ).on( 'click', function() {
                    
                    slitslider.previous();
                    return false;

                } );

                $nav.each( function( i ) {
                
                    $( this ).on( 'click', function( event ) {
                        
                        var $dot = $( this );
                        
                        if( !slitslider.isActive() ) {

                            $nav.removeClass( 'nav-dot-current' );
                            $dot.addClass( 'nav-dot-current' );
                        
                        }
                        
                        slitslider.jump( i + 1 );
                        return false;
                    
                    } );
                    
                } );

            };

            return { init : init };

    })();

    Page.init();

});



$(document).ready(function(){

	/* ========================================================================= */
	/*	Menu item highlighting
	/* ========================================================================= */

	jQuery('#nav').singlePageNav({
		offset: jQuery('#nav').outerHeight(),
		filter: ':not(.external)',
		speed: 2000,
		currentClass: 'current',
		easing: 'easeInOutExpo',
		updateHash: true,
		beforeStart: function() {
			console.log('begin scrolling');
		},
		onComplete: function() {
			console.log('done scrolling');
		}
	});
	
    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $(".navbar-brand a").css("color","#fff");
            $("#navigation").removeClass("animated-header");
        } else {
            $(".navbar-brand a").css("color","inherit");
            $("#navigation").addClass("animated-header");
        }
    });
	
	/* ========================================================================= */
	/*	Fix Slider Height
	/* ========================================================================= */	

    // Slider Height
    var slideHeight = $(window).height();
    
    $('#home-slider, #slider, .sl-slider, .sl-content-wrapper').css('height',slideHeight);

    $(window).resize(function(){'use strict',
        $('#home-slider, #slider, .sl-slider, .sl-content-wrapper').css('height',slideHeight);
    });
	
	
	
	$("#works, #testimonial").owlCarousel({	 
		navigation : true,
		pagination : false,
		slideSpeed : 700,
		paginationSpeed : 400,
		singleItem:true,
		navigationText: ["<i class='fa fa-angle-left fa-lg'></i>","<i class='fa fa-angle-right fa-lg'></i>"]
	});
	
	
	/* ========================================================================= */
	/*	Featured Project Lightbox
	/* ========================================================================= */

	$(".fancybox").fancybox({
		padding: 0,

		openEffect : 'elastic',
		openSpeed  : 650,

		closeEffect : 'elastic',
		closeSpeed  : 550,

		closeClick : true,
			
		beforeShow: function () {
			this.title = $(this.element).attr('title');
			this.title = '<h3>' + this.title + '</h3>' + '<p>' + $(this.element).parents('.portfolio-item').find('img').attr('alt') + '</p>';
		},
		
		helpers : {
			title : { 
				type: 'inside' 
			},
			overlay : {
				css : {
					'background' : 'rgba(0,0,0,0.8)'
				}
			}
		}
	});

    /* ========================================================================= */
    /*  Search parameters in backend
    /* ========================================================================= */


    $.ajax({
        type: 'GET',
        url: ParAccEndpoint,        
        success: function (data) {
            //console.log(data[0])
            data = data[0];
            paypal_pct = data.paypal_pct;
            paypal_fee = data.paypal_fee;
            nexpay_pct = data.nexpay_pct;
            exchange_rate = data.exchange_rate;            
            paypal_fee = parseFloat(Math.round(paypal_fee * 100) / 100); 
            exchange_rate = parseFloat(Math.round(exchange_rate * 100) / 100); 
            $("#feespaypal").attr("placeholder", paypal_pct*100+'% + '+paypal_fee);
        },
        error: function () {
            console.log('No me pude conectar al backend !');
        }
    });

	
});


/* ==========  START GOOGLE MAP ========== */

// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions

	    var myLatLng = new google.maps.LatLng(22.402789, 91.822156);

	    var mapOptions = {
	        zoom: 15,
	        center: myLatLng,
	        disableDefaultUI: true,
	        scrollwheel: false,
	        navigationControl: true,
	        mapTypeControl: false,
	        scaleControl: false,
	        draggable: true,

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{
            featureType: 'water',
            stylers: [{
                color: '#46bcec'
            }, {
                visibility: 'on'
            }]
        }, {
            featureType: 'landscape',
            stylers: [{
                color: '#f2f2f2'
            }]
        }, {
            featureType: 'road',
            stylers: [{
                saturation: -100
            }, {
                lightness: 45
            }]
        }, {
            featureType: 'road.highway',
            stylers: [{
                visibility: 'simplified'
            }]
        }, {
            featureType: 'road.arterial',
            elementType: 'labels.icon',
            stylers: [{
                visibility: 'off'
            }]
        }, {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#444444'
            }]
        }, {
            featureType: 'transit',
            stylers: [{
                visibility: 'off'
            }]
        }, {
            featureType: 'poi',
            stylers: [{
                visibility: 'off'
            }]
        }]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map-canvas');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(22.402789, 91.822156),
        map: map,
		icon: 'img/icons/map-marker.png',
    });
}

// ========== END GOOGLE MAP ========== //


// ========== Form Handling ======== //

function multiplicar(){    

    monto_retirar = document.getElementById("amount_gross").value;
    if (monto_retirar<10) { 
        
        alert('El monto debe ser mayor de 10 dolares...');
        return false;} 
    else { 
        //console.log(paypal_pct , paypal_fee, exchange_rate, nexpay_fee)        
        fees_paypal = monto_retirar * paypal_pct + paypal_fee;
        document.getElementById("feespaypal").value = fees_paypal.toFixed(2);        
        monto_recibir = [(monto_retirar-fees_paypal)*exchange_rate]*nexpay_pct;
        document.getElementById("montorecibir").value = Math.round(monto_recibir);
    }

}

$(function() {
    $('#retirarForm').validate({
        
        rules: {
            amount_gross: {
                required: true,
                number: true
                },
            paypal_email: {
                required: true,
                email: true
                },
            tracking_email:{
                required: true,
                email: true
                },
            cbu_number: {
                required: true,
                     minlength: 22,
                    maxlength:22
                },
            account_number: {
                required: true,
                     minlength: 5,
                    maxlength:20
                },
            account_owner_dni: {
                required: true,
                     minlength: 8,
                    maxlength:8
                },
            account_owner: {
                    required: true,
                    minlength: 5                
                },
            bank: {
                    required: true,             
                }
        },
        messages: {
            amount_gross: {
                required: "Por favor ingrese un monto v&aacute;lido."
            },
            paypal_email: {
                required: "Por favor ingresar su E-Mail.",
                email: "Ingresar un correo valido"
            },
            tracking_email: {
                required: "Por favor ingresar su E-Mail.",
                email: "Ingresar un correo valido"
            },
            cbu_number: {
                required: "Por favor ingresar CBU v&aacute;lido.",
                minlength: "El CBU debe tener 22 digitos.",
                maxlength: "El CBU debe tener 22 digitos."
            },
            account_owner_dni: {
                required: "Por favor ingresar DNI v&aacute;lido.",
                minlength: "El DNI debe tener 8 digitos.",
                maxlength: "El DNI debe tener 8 digitos."
            },
            account_number: {
                required: "Por favor ingresar n&uacute;mero de cuenta v&aacute;lido.",
                minlength: "El n&uacute;mero de cuenta debe tener al menos 5 caracteres.",
                maxlength: "Ingresar un n&uacute;mero de cuenta (No ingrese CBU!!!)"
            },
            account_owner: {
                    required: "Por favor ingresar titular de la cuenta.",
                    minlength: "El titular de la cuenta de tener al menos 5 caracteres."                
                },
            bank: {
                    required: "Por favor seleccione su banco",              
                }
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type:"POST",
                data: $(form).serialize(),                
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                url: OrdersEndPoint,
                success: function() {
                    $('#success').fadeIn();
                },
                error: function() {
                    $('#error').fadeIn();
                }
            });
        }
    });
}); 


var wow = new WOW ({
	offset:       75,          // distance to the element when triggering the animation (default is 0)
	mobile:       false,       // trigger animations on mobile devices (default is true)
});
wow.init();

