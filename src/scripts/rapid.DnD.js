

/////////////////////////////////////////////////
///// RAPID - Drag and drop
/////////////////////////////////////////////////


// OLD

/*

$.getScript('http://clients.ottoboni.se/Frontend/tsr-inject.js');
1. gå in på dn.se
2. kör dessa i consolen. en efter en.
$.getScript('http://clients.ottoboni.se/Frontend/tsr-inject.js'); 
$.getScript('http://clients.ottoboni.se/Frontend/rapid.js');
3. skriv sedan i consolen
window.inject.toggleDnD
4. nere i höger hörn på dn.se får du nu toggle knapp. klicka på den och en alert kommer up.



// NEW


  $.getScript('http://clients.ottoboni.se/Frontend/rapid/_assets/rapid.DnD.js'); 

window.rapid.start();
window.rapid.load(prefix);


*/









//////////////////////////////////
///// TOAST 
//////////////////////////////////

///// 1. rapid - for "app" ui
///// 2. PROJECT uijquery-2.1.3.min.jsjquery-2.1.3.min.js
/////   2.1 ex. tsr-core.css
/////   2.2 ex. tsr-fonts.css (base 64 css / woff2?)
/////   2.3 ex. tsr.js
///// 3. UX theme styles (Unique projekt or default)
///// 4. SEO theme styles (Unique projekt or default)
///// 5. WCAG 2.0 theme styles (Unique projekt or default)




;(function(document,$) {

    // For safty, rapid.js should be loaded before to scope rapid.
    window.rapid = window.rapid || {};
    window.rapid.DnD = window.rapid.DnD || {};
    window.rapid.inject = window.rapid.inject || {};


// VARIABLES
 
   var orgContainers    = $('.ra-layout-default'); // Temp, make sexy!
   var orgHeader        = $('.header-org');
   var orgContent       = $('.content-org');
   var orgFooter        = $('.footer-org');

   var addedRow         = $('.added-row');
   var addedModule      = $('.added-module');

   var dragSrcEl        = null;




/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// rapid - INIT
/////////////////////////////////////////////////////////////////////////////////////////////////////////


    rapid.DnD.init = function() {
       
      console.log ('rapid.DnD.init');

          rapid.inject.controls();
          rapid.inject.modular();  

          rapid.DnD.btnEdit();
          rapid.DnD.btnUx();
          rapid.DnD.btnSeo();
          rapid.DnD.btnWcag();
          rapid.DnD.btnLoad();
          rapid.DnD.btnsRapidLoad(); 
          rapid.DnD.btnAddBodyClass('ra-behavior','First'); 

             

         setTimeout(function(){
              $('body').addClass('rapid-active');
          }, 450);

    };


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// LOAD LIBRARY
/////////////////////////////////////////////////////////////////////////////////////////////////////////


    rapid.injectLibrary = function(pre) {

              var prefix = pre.toLowerCase();
            
                  toast(

                    'http://clients.ottoboni.se/Frontend/Rapid/' + prefix + '/' + prefix + '--all.css', 
                    'http://clients.ottoboni.se/Frontend/Rapid/' + prefix + '/' + prefix + '.min.js',
                  
                      function () {
                          console.log('rapid.load.library -> ' + prefix);
                                   
                      }
                  );

              

    };



    rapid.injectDropZone= function(pre) {

          console.log('rapid.add.dropZones -> ' + pre);

          $(pre).before('<article class="ra-ghost-row -ra-size-s ra-drop-here"> <div class="ra-body"> <div class="ra-header"> <div class="ra-big">Drop zone</div> </div> </div> </article>');   
          $(pre).after('<article class="ra-ghost-row -ra-size-s ra-drop-here"> <div class="ra-body"> <div class="ra-header"> <div class="ra-big">Drop zone</div> </div> </div> </article>');   
      
          rapid.DnD.drop.dropAreas();
            

    };



/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// INJECT CONTROLS
/////////////////////////////////////////////////////////////////////////////////////////////////////////


    rapid.inject.controls = function() {
      console.log('rapid.DnD.inject.controls');       
      $('body').append(' <header class="ra-top-menu"> <div class="ra-behavior -ra-ani-2"> <div class="ra-behavior-header">Grid behavior:</div> <div class="ra-btn -class-to-body" data-class="ra-g-fi">Fixed</div> <!-- ra-behavior-fixed --> <div class="ra-btn -class-to-body" data-class="ra-g-hy">Hybrid</div> <div class="ra-btn -class-to-body" data-class="ra-g-fl">Fluid</div> </div> <div class="ra-layouts -ra-ani-1"> <div class="ra-behavior-header">Layouts:</div> <div class="ra-btn ra-layouts-1of1 "> <span class="-ra-l-100"></span> </div> <div class="ra-btn ra-layouts-1of1 "> <span class="-ra-l-50"></span> <span class="-ra-l-50"></span> </div> <div class="ra-btn ra-layouts-1of1 "> <span class="-ra-l-33"></span> <span class="-ra-l-66"></span> </div> <div class="ra-btn ra-layouts-1of1 "> <span class="-ra-l-66"></span> <span class="-ra-l-33"></span> </div> <div class="ra-btn ra-layouts-1of1 "> <span class="-ra-l-33"></span> <span class="-ra-l-33"></span> <span class="-ra-l-33"></span> </div> <div class="ra-btn ra-layouts-1of1 "> <span class="-ra-l-20"></span> <span class="-ra-l-20"></span> <span class="-ra-l-20"></span> <span class="-ra-l-20"></span> <span class="-ra-l-20"></span> </div> </div> </header>');   
      $('body').append('<div class="ra-buttons"><div class="ra-brand -ra-ani-5"><svg height="53" version="1.1" width="213" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative; display: block;"><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Rapha�l 2.1.0</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><path fill="#000000" stroke="none" d="M309.926,-57.223C317.695,-57.223,323.907,-51.01,323.907,-43.245999999999995C323.907,-35.477,317.69399999999996,-29.265999999999995,309.926,-29.265999999999995C302.161,-29.265999999999995,295.949,-35.477999999999994,295.949,-43.245999999999995C295.949,-51.01,302.161,-57.223,309.926,-57.223ZM194.507,74.197L194.511,-14.052999999999997L222.469,-20.302999999999997V1.38H222.874C228.347,-10.372,241.718,-17.465,255.298,-17.465C274.547,-17.465,283.87,-7.939,283.87,13.946000000000002V74.186H255.916L255.904,6.4480000000000075C255.904,-7.736999999999993,249.826,-10.167999999999992,243.94899999999998,-10.167999999999992C232.599,-10.167999999999992,222.469,4.623000000000008,222.469,14.955000000000009L222.482,74.20200000000001L194.507,74.197ZM323.908,74.201H295.949V-13.667000000000002L323.908,-19.877000000000002V74.201ZM165.653,-9.168C164.009,-10.206,159.833,-12.501999999999999,156.30599999999998,-10.75C154.17899999999997,-9.693,152.64999999999998,-7.12,153.88299999999998,-2.8099999999999996C155.28199999999998,2.0840000000000005,155.23899999999998,6.5889999999999995,155.23899999999998,6.5889999999999995L155.27599999999998,52.91C155.27599999999998,52.91,156.57,73.068,138.659,73.068C120.752,73.068,122.1,52.81,122.1,52.81V8.628C122.1,8.628,134.061,8.263,142.843,-1.3490000000000002C147.771,-6.744,149.879,-17.508,138.016,-17.508C125.327,-17.508,109.332,-11.318999999999999,99.51299999999999,1.5340000000000025C99.50299999999999,1.5460000000000025,99.47099999999999,1.5890000000000024,99.47099999999999,1.5890000000000024H73.807C73.807,1.5890000000000024,73.776,1.5760000000000025,73.767,1.5640000000000025C65.229,-9.608,52.649,-15.139,41.104,-17.185C17.899,-21.294,17.438,-4.313,26.836,2.423C35.573,8.684999999999999,45.120999999999995,8.664,50.942,8.664C51.097,8.664,51.178,8.657,51.178,8.657V52.84C51.178,52.84,51.074999999999996,62.697,47.495,67.055C44.004999999999995,71.305,41.120999999999995,73.09800000000001,32.595,73.09800000000001C14.108,73.09800000000001,14.375,52.94000000000001,14.375,52.94000000000001V-76.96999999999998L-13.594000000000001,-70.75199999999998L-13.594000000000001,29.740000000000023C-13.594000000000001,62.502000000000024,13.803999999999998,76.74400000000003,32.595,76.74400000000003C59.787,76.74400000000003,82.791,59.69500000000003,82.791,29.33100000000003C82.791,21.65300000000003,81.17399999999999,14.95400000000003,78.438,9.209000000000032C78.434,9.199000000000032,78.416,9.134000000000032,78.416,9.134000000000032H94.84C92.10600000000001,14.880000000000033,90.486,21.62400000000003,90.486,29.30200000000003C90.486,60.63500000000003,115.31200000000001,76.71500000000003,138.659,76.71500000000003C160.628,76.71500000000003,186.873,61.93200000000003,186.873,29.711000000000034C186.874,9.498,175.537,-2.927,165.653,-9.168ZM137.861,-13.768C146.14999999999998,-14.065000000000001,144.087,-3.793000000000001,134.55499999999998,-0.9240000000000013C127.80299999999998,1.1069999999999989,122.54999999999998,1.2849999999999988,122.54999999999998,1.2849999999999988S124.075,-13.275,137.861,-13.768ZM33.328,-0.241C20.233000000000004,-4.203,23.478,-13.995,33.283,-13.633C49.926,-13.019,51.179,1.34,51.179,1.34S40.647,1.974,33.328,-0.241ZM-42.017,-9.168C-43.661,-10.206,-47.838,-12.501999999999999,-51.364000000000004,-10.75C-53.49,-9.693,-55.021,-7.12,-53.787000000000006,-2.8099999999999996C-52.38700000000001,2.0840000000000005,-52.431000000000004,6.5889999999999995,-52.431000000000004,6.5889999999999995L-52.394000000000005,52.91C-52.394000000000005,52.91,-51.10000000000001,73.068,-69.01100000000001,73.068C-86.918,73.068,-85.57000000000001,52.81,-85.57000000000001,52.81V8.628C-85.57000000000001,8.628,-73.60900000000001,8.263,-64.82700000000001,-1.3490000000000002C-59.89800000000001,-6.744,-57.789000000000016,-17.508,-69.65400000000001,-17.508C-82.34300000000002,-17.508,-98.33700000000002,-11.318999999999999,-108.15700000000001,1.5340000000000025C-108.16600000000001,1.5460000000000025,-108.19800000000001,1.5890000000000024,-108.19800000000001,1.5890000000000024L-133.321,1.6480000000000024V-43.915L-161.281,-37.679V1.645L-186.787,1.648V-43.945L-214.745,-37.735V1.589H-236.50900000000001C-236.50900000000001,1.589,-236.54100000000003,1.546,-236.55,1.534C-246.371,-11.318999999999999,-262.365,-17.508000000000003,-275.053,-17.508000000000003C-286.917,-17.508000000000003,-284.80899999999997,-6.743000000000002,-279.88,-1.3490000000000038C-271.098,8.261999999999997,-259.137,8.627999999999997,-259.137,8.627999999999997V52.81C-259.137,52.81,-257.789,73.068,-275.696,73.068C-293.607,73.068,-292.31300000000005,52.91,-292.31300000000005,52.91L-292.27500000000003,6.588999999999999C-292.27500000000003,6.588999999999999,-292.319,2.0829999999999984,-290.91900000000004,-2.8100000000000005C-289.68600000000004,-7.12,-291.21600000000007,-9.693000000000001,-293.34200000000004,-10.75C-296.86800000000005,-12.502,-301.045,-10.206,-302.689,-9.168C-312.572,-2.9269999999999996,-323.909,9.498000000000001,-323.909,29.71C-323.909,61.931,-297.664,76.714,-275.69599999999997,76.714C-252.34899999999996,76.714,-227.52299999999997,60.634,-227.52299999999997,29.301000000000002C-227.52299999999997,21.623,-229.14199999999997,14.879000000000001,-231.87599999999998,9.133000000000003H-214.74599999999998V53.842000000000006C-214.74599999999998,73.08800000000001,-198.134,76.938,-192.46099999999998,76.938C-181.16699999999997,76.938,-173.259,72.709,-167.18699999999998,63.938C-167.09699999999998,63.811,-166.921,63.551,-166.921,63.551L-169.44,61.817C-169.44,61.817,-169.594,62.04,-169.677,62.151C-171.915,65.28,-174.815,68.43,-178.888,68.43C-184.155,68.43,-186.788,64.578,-186.788,57.89500000000001V9.134H-161.281V53.875C-161.281,73.121,-144.668,76.971,-138.996,76.971C-127.70100000000001,76.971,-119.793,72.742,-113.72200000000001,63.971000000000004C-113.632,63.842000000000006,-113.456,63.584,-113.456,63.584L-115.97500000000001,61.848000000000006C-115.97500000000001,61.848000000000006,-116.129,62.071000000000005,-116.212,62.18200000000001C-118.449,65.311,-121.35000000000001,68.46100000000001,-125.423,68.46100000000001C-130.69,68.46100000000001,-133.322,64.60900000000001,-133.322,57.92800000000001V9.134H-112.83200000000001C-115.566,14.88,-117.185,21.624000000000002,-117.185,29.302C-117.185,60.635,-92.35900000000001,76.715,-69.012,76.715C-47.043,76.715,-20.799,61.932,-20.799,29.711000000000006C-20.797,9.498,-32.134,-2.927,-42.017,-9.168ZM-69.809,-13.768C-61.519999999999996,-14.065000000000001,-63.583,-3.793000000000001,-73.115,-0.9240000000000013C-79.867,1.107,-85.12,1.285,-85.12,1.285S-83.595,-13.275,-69.809,-13.768ZM-271.59,-0.924C-281.121,-3.793,-283.185,-14.065,-274.89599999999996,-13.767999999999999C-261.10999999999996,-13.274999999999999,-259.585,1.285000000000002,-259.585,1.285000000000002S-264.838,1.107,-271.59,-0.924Z" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" transform="matrix(0.3288,0,0,0.3288,106.4997,26.5003)" stroke-width="3.041394366197183"></path></svg></div> <div class="ra-rapid-btns -ra-ani"> <div class="ra-btn-small"> <a href="#" class="ra-btn-library"></a> <a href="#" class="ra-btn-selector"></a> </div><a class="ra-btn-otb" href="#"><div>OTB<br/>LOAD</div></a><input class="ra-prefix-value" disabled placeholder="RAPID" type="text"></div><div class="ra-btn-holder-right"><a class="ra-btn-wcag -ra-ani-4" href="#">WCAG</a><a class="ra-btn-seo -ra-ani-3" href="#">SEO</a><a class="ra-btn-ux -ra-ani-2" href="#">UX</a><a class="ra-btn-edit -ra-ani-1" href="#">RAPID</a></div></div> ');   
          
    };


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// INJECT MODULAR
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    rapid.inject.modular = function() {
      console.log('rapid.DnD.inject.modular');       
     

      /// Toast modular here!!!

    };



/////////////////////////////////////////////////////////////////////////////////////////////////////////
// BUTTONS - ADD CLASS TO BODY
/////////////////////////////////////////////////////////////////////////////////////////////////////////


    rapid.DnD.btnAddBodyClass = function(parentClass,active) {

            var classParent = '.' + parentClass;
            var classButton = '.' + parentClass + ' .ra-btn';
            var classArray = [];
         
            // STORE ALL BUTTONS
            var elements = document.querySelectorAll(classButton);

            // STORE CLASS NAMES
            Array.prototype.forEach.call(elements, function(el, i){
                var attr = el.getAttribute('data-class');
                classArray.push(attr);  
            }); 


           // CLICK EVENT FOR EACH BUTTON
           $(classButton).on("click", function(event){
          
                var el              = $(this);
                var elData          = el.attr('data-class');
                var elBody          = $('body');

               // IF BODY HAS THE ELEMENTS "DATA-CLASS"
               if (elBody.hasClass(elData)) {

                    // REMOVE THIS "DATA-CLASS" TO BODY 
                    elBody.removeClass(elData);
                    // REMOVE ACTIVE CLASS FOR THIS BUTTON/ELEMENT
                    el.removeClass('-ra-active');
                  
                }
                else {
                    // LOOP THE ARRAY WITH THE DATA-CLASS NAMES
                    Array.prototype.forEach.call(classArray, function(el, i){               
                        // REMOVE ALL "DATA-CLASSES" FROM BODY
                        elBody.removeClass(el);
                    }); 

                    // ADD THIS "DATA-CLASS" TO BODY 
                    elBody.addClass(elData);
                    // REMOVE ACTIVE CLASS FROM ALL BUTTONS/ELEMENTS
                    $(classParent).find('.-ra-active').removeClass('-ra-active');
                    // ADD ACTIVE CLASS FOR THIS BUTTON/ELEMENT
                    el.addClass('-ra-active');
           
                } 
                return false;
          });


          // SET ACTIVE BUTTON FIRST or LAST, DEFAULT IS NONE ACTIVE
          if(active.toLowerCase() === 'first'){
                $(classButton+':first').trigger('click');
          } else if (active.toLowerCase() === 'last'){
                $(classButton+':last').addClass('click').trigger('click');
          }

    };



/////////////////////////////////////////////////////////////////////////////////////////////////////////
// BUTTONS 
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    rapid.DnD.btnsRapidLoad = function() {

      console.log ('rapid.DnD.btns.RapidLoad');


          $('.ra-btn-selector').on("click", function(event){
        
              var el              = $(this);
              var elParent        = $('.ra-buttons');
              var elInput         = $('.ra-prefix-value');

              if (el.hasClass("-ra-active")) {
   
                  //elParent.removeClass('-ra-ux');
                  el.removeClass('-ra-active');
                  elParent.removeClass('-ra-load-selectors');
                  elInput.attr('placeholder','RAPID').val('');
                  elInput.attr('disabled', true);  
                
              }
              else {
                  
                  //elParent.addClass('-ra-ux');
                  //$('.ra-btn-holder-right').find('.-ra-active').trigger('click');
                  $('.ra-btn-library').removeClass('-ra-active');
                  el.addClass('-ra-active');
                  
                  elInput.attr('placeholder','DROP ZONES').val('');
                  elInput.removeAttr('disabled').focus(); 
                  elParent.addClass('-ra-load-selectors').removeClass('-ra-load-library').removeClass('-ra-show-load');  

         
              }
              return false;

          });   

      
          $('.ra-btn-library').on("click", function(event){
        
              var el              = $(this);
              var elParent        = $('.ra-buttons');
              var elInput         = $('.ra-prefix-value');

              if (el.hasClass("-ra-active")) {
   
                  //elParent.removeClass('-ra-ux');
                  el.removeClass('-ra-active');
                  elParent.removeClass('-ra-load-library');
                  elInput.attr('placeholder','RAPID').val('');
                  elInput.attr('disabled', true);    
                  
              }
              else {
                  
                  //elParent.addClass('-ra-ux');
                  //$('.ra-btn-holder-right').find('.-ra-active').trigger('click');
                  $('.ra-btn-selector').removeClass('-ra-active');
                  el.addClass('-ra-active');
                  
                  elInput.attr('placeholder','BLOCKS').val(''); 
                  elInput.removeAttr('disabled').focus(); 
                  elParent.addClass('-ra-load-library').removeClass('-ra-show-load');
         
              }
              return false;

          });

    };


    rapid.DnD.btnWcag= function() {

      console.log ('rapid.DnD.btn.Wcag');

         $('.ra-btn-wcag').on("click", function(event){
        
            var el              = $(this);
            var elParent        = $('body');
            
            if (elParent.hasClass("-ra-wcag")) {
 
                elParent.removeClass('-ra-wcag');
                el.removeClass('-ra-active');
              
            }
            else {
                
                elParent.addClass('-ra-wcag');
                $('.ra-btn-holder-right').find('.-ra-active').trigger('click');
                el.addClass('-ra-active');

            }
            return false;
        });

    };



    rapid.DnD.btnEdit = function() {

      console.log ('rapid.DnD.btn.Edit');

     
      
         $('.ra-btn-edit').on("click", function(event){
        
            var el              = $(this);
            var elParent        = $('body');
            var elGhost        = $('.ra-ghost-row');
            
            if (elParent.hasClass("ra-edit-mode")) {

                elParent.removeClass('ra-edit-mode');
                el.removeClass('-ra-active');
                elGhost.css('display','none');
                rapid.DnD.removeDropAreas();

            }

            else {
                
                elParent.addClass('ra-edit-mode');
                $('.ra-btn-holder-right').find('.-ra-active').trigger('click');
                el.addClass('-ra-active');
                elGhost.css('display','block');
                rapid.DnD.addDropAreas();
                rapid.DnD.drop.init();

            }
            return false;
        });

    };



    rapid.DnD.btnLoad = function() {

      console.log ('rapid.DnD.btn.load');

     
         $('.ra-btn-otb').on("click", function(event){
        
           var  getPrefix       = $('.ra-prefix-value').val();
                console.log('pre 13: ' +  getPrefix +  getPrefix.length);

                if( getPrefix.length !== 0){
                   rapid.injectLibrary(getPrefix);   
                }
            
            return false;
        });


         $('.ra-prefix-value').keyup(function(e) {
           
            var code = e.keyCode || e.which;
            var getPrefix       = $('.ra-prefix-value').val();
            var state           = $('.ra-buttons');
           
            console.log('pre: ' +  getPrefix + ', ' + code);

            if(code == 13) { 
                
                 getPrefix       = $('.ra-prefix-value').val().toLowerCase();
                 console.log('pre 13: ' +  getPrefix +  getPrefix.length);

                if( getPrefix.length !== 0){

                    
                  if(state.hasClass('-ra-load-selectors')){
                      rapid.injectDropZone(getPrefix);   
                  } else if(state.hasClass('-ra-load-library')){
                      rapid.injectLibrary(getPrefix);   
                  }

                   
                }

               

           } else if (getPrefix === 'rapid' || getPrefix === ''){
                
                $(this).parent().parent().removeClass('-ra-show-load');

           } else {
                $(this).parent().parent().addClass('-ra-show-load');
           }

        });
    };




    rapid.DnD.btnUx = function() {

      console.log ('rapid.DnD.btn.Ux');

     
      
         $('.ra-btn-ux').on("click", function(event){
        
            var el              = $(this);
            var elParent        = $('body');

            if (elParent.hasClass("-ra-ux")) {
 
                elParent.removeClass('-ra-ux');
                el.removeClass('-ra-active');
              
            }
            else {
                
                elParent.addClass('-ra-ux');
                $('.ra-btn-holder-right').find('.-ra-active').trigger('click');
                el.addClass('-ra-active');
       

            }
            return false;
        });

    };


    rapid.DnD.btnSeo = function() {

      console.log ('rapid.DnD.btn.Seo');

     
      
         $('.ra-btn-seo').on("click", function(event){
        
            var el              = $(this);
            var elParent        = $('body');
            
            if (elParent.hasClass("-ra-seo")) {

               
                elParent.removeClass('-ra-seo');
                el.removeClass('-ra-active');
              

            }
            else {
                
                elParent.addClass('-ra-seo');
                $('.ra-btn-holder-right').find('.-ra-active').trigger('click');
                el.addClass('-ra-active');
       

            }
            return false;
        });

    };



///// DROP AREAS ADD+REMOVE (Used above in rapid.DnD.btn.Edit) 


// ADD - DROP AREAS

    rapid.DnD.addDropAreas = function() {
      
        console.log ('rapid.DnD.addDropAreas');
        
        orgContainers.addClass('drop-here');
        orgContainers.find('.ra-big').text('Drop here');

    };

// REMOVE - DROP AREAS

    rapid.DnD.removeDropAreas = function() {

      console.log ('rapid.DnD.removeDropAreas');
      
        orgContainers.parent().removeClass('drop-here');
        orgContainers.find('.ra-big').text('Drop area - Disabled');


        $('.ghost-row').remove();
        $('.ghost-module').remove();

    };


///// DARG AREAS ADD (Used above in rapid.DnD.btn.Edit) 

    rapid.DnD.addDrag = function() {

      console.log ('rapid.DnD.addDrag');
    
        $("[class*='tsr-section']").addClass('drag-me').attr('draggable','true');
        

    };



////////////////////////////////////
////////////////////////////////////
// DnD- FUNCTIONS
////////////////////////////////////  
////////////////////////////////////

////////////////////////////////////
// DnD - DRAG - OBJECT
//////////////////////////////////// 


      rapid.DnD.drag =  {


      /* - INIT - - - */  

            init: function() {
                  
                  console.log ('rapid.DnD.drag.init();');
                  rapid.DnD.drag.addListners();

            }, // init


      /* - Drag START - - - */ 

            handleDragStart: function(e) {
                    
              console.log ('rapid.DnD.drag.handleDragStart();');

              // this/e.target is the source node.
              dragSrcEl = this;
              e.dataTransfer.effectAllowed = 'copy';
              e.dataTransfer.setData('text/html', this.outerHTML);

            }, // handleDragStart


      /* - Drag END - - - */ 

            handleDragEnd: function(e) {

              console.log ('rapid.DnD.drag.handleDragEnd();');

              var drops = document.querySelectorAll('.drop-here');
              //var drops = document.querySelectorAll('.ra-drop-here');
             
              // this/e.target is the source node.
              [].forEach.call(drops, function (dro) {
                dro.classList.remove('dragOVER');
                dro.classList.remove('dragLEAVE'); 
              });

            }, // handleDragEnd


      /* - ADD LISTNERS - - - */ 

            addListners: function() {

              console.log ('rapid.DnD.drag.addListners();');
              
              var drags = document.querySelectorAll('.drag-me');
              //var drags = document.querySelectorAll('.ra-drag-me');

              [].forEach.call(drags, function(el) {

                el.setAttribute('draggable', 'true');
                el.addEventListener('dragstart', rapid.DnD.drag.handleDragStart, false);
                el.addEventListener('dragend', rapid.DnD.drag.handleDragEnd, false);

              });

            }, // addListners


      }; // rapid.DnD.drag END




////////////////////////////////////
// DnD - DROP - OBJECT
//////////////////////////////////// 


      rapid.DnD.drop =  {


      /* - INIT - - - */

            init: function() {
                  
                  console.log ('rapid.DnD.drop.init();');

                  rapid.DnD.drop.dropAreas();

            }, // init


      /* - DROP AREAS - - - */

            dropAreas: function(e) {

              $('.ghost-row').remove();
              $('.ghost-module').remove();

              // Row - Added
              $('.added-row').parent().removeClass('drop-here');
              $('.added-row').before('<div class="ghost-row drop-here">Drop area</div>');
              $('.added-row').after('<div class="ghost-row drop-here">Drop area</div>');
                //$('.added-row').after('<div class="ghost-row drop-here after">Drop area</div>');

              // Module - Added
              $('.added-module').addClass('drop-here');
              $('.added-module').before('<div class="ghost-row drop-here">Drop area</div>');
              $('.added-module').after('<div class="ghost-row drop-here">Drop area</div>');
              //$('.added-module').after('<div class="ghost-module drop-here after">Drop area</div>');

              rapid.DnD.drop.addListners();
     

            }, // dropAreas


      /* - Drag ENTER - - - */

            handleDragEnter: function(e) {

          
                // this / e.target is the current hover target.
                this.classList.add('dragENTER');
                this.classList.remove('dragLEAVE'); 

            }, // handleDragEnter


      /* - Drag OVER - - - */

            handleDragOver: function(e) {

              if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
              }

              e.dataTransfer.dropEffect = 'copy';  // See the section on the DataTransfer object.
              this.classList.add('dragOVER');
              this.classList.remove('dragLEAVE'); 

              return false;

            }, // handleDragOver


      /* - DROP - - - */

            handleDrop: function(e) {

                 
              // this/e.target is current target element.

              if (e.stopPropagation) {
                e.stopPropagation(); // Stops some browsers from redirecting.
              }

              this.classList.remove('over');
              this.classList.remove('dragOVER'); 
              this.classList.remove('dragENTER');
              this.classList.remove('dragLEAVE'); 

              var htmlCode = e.dataTransfer.getData('text/html');

              $(this).replaceWith(htmlCode);

              // After drop, make new areas dropable
              rapid.DnD.drop.dropAreas(); 


              return false;
     

            }, // handleDrop


      /* - Drag LEAVE - - - */

            handleDragLeave: function(e) {

              // this / e.target is previous target element.
              this.classList.add('dragLEAVE'); 
              this.classList.remove('dragENTER'); 
              this.classList.remove('dragOVER');
          
            }, // handleDragLeave


      /* - ADD LISTNERS - - - */ 

            addListners: function() {

              console.log ('rapid.DnD.drop.addListners();');
              
              var drops = document.querySelectorAll('.ra-drop-here');


              [].forEach.call(drops, function(el) {
               
                el.addEventListener('dragenter', rapid.DnD.drop.handleDragEnter, false);
                el.addEventListener('dragover', rapid.DnD.drop.handleDragOver, false);
                el.addEventListener('drop', rapid.DnD.drop.handleDrop, false);
                el.addEventListener('dragleave', rapid.DnD.drop.handleDragLeave, false);
                
              });

            }, // addListners



     }; // rapid.DnD.drag END
     


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

})(document,jQuery);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// END
/////////////////////////////////////////////////////////////////////////////////////////////////////////

rapid.DnD.init();
