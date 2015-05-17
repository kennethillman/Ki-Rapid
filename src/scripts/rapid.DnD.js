

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




/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// INJECT CONTROLS
/////////////////////////////////////////////////////////////////////////////////////////////////////////


    rapid.inject.controls = function() {
      console.log('rapid.DnD.inject.controls');       
      $('body').append('<div class="ra-buttons"><div class="ra-brand -ra-ani-5"><a class="ra-btn-otb" href="#"><div>OTB<br/>LOAD</div></a><input class="ra-prefix-value" placeholder="Rapid" type="text"></div><div class="ra-btn-holder-right"><a  class="ra-btn-wcag -ra-ani-4" href="#">WCAG</a><a  class="ra-btn-seo -ra-ani-3" href="#">SEO</a><a  class="ra-btn-ux -ra-ani-2" href="#">UX</a><a  class="ra-btn-edit -ra-ani-1" href="#">RAPID</a></div></div>');   
         
    };


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// INJECT MODULAR
/////////////////////////////////////////////////////////////////////////////////////////////////////////


    rapid.inject.modular = function() {
      console.log('rapid.DnD.inject.modular');       
     

      /// Toast modular here!!!

    };

////////////////////////////////////  
// BUTTON EDIT (ON/OFF)
////////////////////////////////////  

    
    /* LATER - KI

    rapid.DnD.btnHelpers =  {

            defineBtn: function(name,className) {

            }, // defineBtn

            cleanAllActive: function() {

            }, // cleanActive

            addClass: function(className) {
                   
            } // addClass


    }; // rapid.DnD.btnHelpers
  
            // MAke button functionality
            rapid.DND.btnHelpers.defineBtn(ra-btn-wcag,-ra-wcag);

    */



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
            
            if (elParent.hasClass("ra-edit-mode")) {

                elParent.removeClass('ra-edit-mode');
                el.removeClass('-ra-active');
                rapid.DnD.removeDropAreas();

            }

            else {
                
                elParent.addClass('ra-edit-mode');
                $('.ra-btn-holder-right').find('.-ra-active').trigger('click');
                el.addClass('-ra-active');
                rapid.DnD.addDropAreas();
                rapid.DnD.drop.init();

            }
            return false;
        });

    };



    rapid.DnD.btnLoad = function() {

      console.log ('rapid.DnD.btn.load');

     
         $('.ra-btn-otb').on("click", function(event){
        
           var                 getPrefix       = $('.ra-prefix-value').val().toLowerCase();
                 console.log('pre 13: ' +  getPrefix +  getPrefix.length);

                if( getPrefix.length !== 0){
                   rapid.injectLibrary(getPrefix);   
                }
            
            return false;
        });


         $('.ra-prefix-value').keyup(function(e) {
           
            var code = e.keyCode || e.which;
            var getPrefix       = $('.ra-prefix-value').val();
           
            console.log('pre: ' +  getPrefix + ', ' + code);

            if(code == 13) { 
                
                 getPrefix       = $('.ra-prefix-value').val().toLowerCase();
                 console.log('pre 13: ' +  getPrefix +  getPrefix.length);

                if( getPrefix.length !== 0){
                   rapid.injectLibrary(getPrefix);   
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
              $('.added-row').before('<div class="ghost-row drop-here before">Drop area</div>');
              $('.added-row').after('<div class="ghost-row drop-here before">Drop area</div>');
                //$('.added-row').after('<div class="ghost-row drop-here after">Drop area</div>');

              // Module - Added
              $('.added-module').addClass('drop-here');
              $('.added-module').before('<div class="ghost-module drop-here before">Drop area</div>');
              $('.added-module').after('<div class="ghost-module drop-here before">Drop area</div>');
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
              
              var drops = document.querySelectorAll('.drop-here');


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
