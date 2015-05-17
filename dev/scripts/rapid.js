
/*
RAPID - Drag and drop
*/ 


;(function(document,$) {

    // For safty, RAPID.js should be loaded before to scope RAPID.
    window.RAPID = window.RAPID || {};
    window.RAPID.DnD = window.RAPID.DnD || {};


// VARIABLES
 
   var orgContainers    = $('.ra-layout-default'); // Temp, make sexy!
   var orgHeader        = $('.header-org');
   var orgContent       = $('.content-org');
   var orgFooter        = $('.footer-org');

   var addedRow         = $('.added-row');
   var addedModule      = $('.added-module');

   var dragSrcEl        = null;


    RAPID.controllesInject = function() {
       
    $('body').append('<div class="ra-buttons"><div class="ra-brand -ra-ani-4"><a  class="ra-btn-seo" href="#">OTB</a><i>Rapid</i></div><div class="-ra-right"><a  class="ra-btn-seo -ra-ani-3" href="#">SEO</a><a  class="ra-btn-ux -ra-ani-2" href="#">UX</a><a  class="ra-btn-edit -ra-ani-1" href="#">EDIT</a></div></div>');   
         
    };

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// RAPID - Init
/////////////////////////////////////////////////////////////////////////////////////////////////////////


    RAPID.DnD.init = function() {
       
      console.log ('RAPID.DnD.init');


          RAPID.DnD.btnEdit();
          RAPID.DnD.btnUx();
          RAPID.DnD.btnSeo();


      // Not in use DRAG and DROP initiates seperatly
      // RAPID.DnD.drag.init();
      // RAPID.DnD.drop.init(); 
         
    };



////////////////////////////////////  
// BUTTON EDIT (ON/OFF)
////////////////////////////////////  

    RAPID.DnD.btnEdit = function() {

      console.log ('RAPID.DnD.bthEdit');

     
      
         $('.ra-btn-edit').on("click", function(event){
        
            var el              = $(this);
            var elParent        = $('body');
            
            if (elParent.hasClass("ra-edit-mode")) {

                elParent.removeClass('ra-edit-mode');
                el.removeClass('-ra-active');
                RAPID.DnD.removeDropAreas();

            }
            else {
                
                elParent.addClass('ra-edit-mode');
                el.addClass('-ra-active');
                RAPID.DnD.addDropAreas();
                RAPID.DnD.drop.init();

            }
            return false;
        });

    };


    RAPID.DnD.btnUx = function() {

      console.log ('RAPID.DnD.btnUx');

     
      
         $('.ra-btn-ux').on("click", function(event){
        
            var el              = $(this);
            var elParent        = $('body');

            if (elParent.hasClass("-ra-ux")) {

               
                elParent.removeClass('-ra-ux');
                el.removeClass('-ra-active');
              

            }
            else {
                
                elParent.addClass('-ra-ux');
                el.addClass('-ra-active');
       

            }
            return false;
        });

    };


    RAPID.DnD.btnSeo = function() {

      console.log ('RAPID.DnD.bthSeo');

     
      
         $('.ra-btn-seo').on("click", function(event){
        
            var el              = $(this);
            var elParent        = $('body');
            
            if (elParent.hasClass("-ra-seo")) {

               
                elParent.removeClass('-ra-seo');
                el.removeClass('-ra-active');
              

            }
            else {
                
                elParent.addClass('-ra-seo');
                el.addClass('-ra-active');
       

            }
            return false;
        });

    };

///// DROP AREAS ADD+REMOVE (Used above in RAPID.DnD.bthEdit) 


// ADD - DROP AREAS

    RAPID.DnD.addDropAreas = function() {
      
        console.log ('RAPID.DnD.addDropAreas');
        
        orgContainers.addClass('drop-here');
        orgContainers.find('.ra-big').text('Drop here');

    };

// REMOVE - DROP AREAS

    RAPID.DnD.removeDropAreas = function() {

      console.log ('RAPID.DnD.removeDropAreas');
      
        orgContainers.parent().removeClass('drop-here');
        orgContainers.find('.ra-big').text('Drop area - Disabled');


        $('.ghost-row').remove();
        $('.ghost-module').remove();

    };



////////////////////////////////////
////////////////////////////////////
// DnD- FUNCTIONS
////////////////////////////////////  
////////////////////////////////////

////////////////////////////////////
// DnD - DRAG - OBJECT
//////////////////////////////////// 


      RAPID.DnD.drag =  {


      /* - INIT - - - */  

            init: function() {
                  
                  console.log ('RAPID.DnD.drag.init();');
                  RAPID.DnD.drag.addListners();

            }, // init


      /* - Drag START - - - */ 

            handleDragStart: function(e) {
                    
              console.log ('RAPID.DnD.drag.handleDragStart();');

              // this/e.target is the source node.
              dragSrcEl = this;
              e.dataTransfer.effectAllowed = 'copy';
              e.dataTransfer.setData('text/html', this.innerHTML);

            }, // handleDragStart


      /* - Drag END - - - */ 

            handleDragEnd: function(e) {

              console.log ('RAPID.DnD.drag.handleDragEnd();');

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

              console.log ('RAPID.DnD.drag.addListners();');
              
              var drags = document.querySelectorAll('.drag-me');
              //var drags = document.querySelectorAll('.ra-drag-me');

              [].forEach.call(drags, function(el) {

                el.setAttribute('draggable', 'true');
                el.addEventListener('dragstart', RAPID.DnD.drag.handleDragStart, false);
                el.addEventListener('dragend', RAPID.DnD.drag.handleDragEnd, false);

              });

            }, // addListners


      }; // RAPID.DnD.drag END




////////////////////////////////////
// DnD - DROP - OBJECT
//////////////////////////////////// 


      RAPID.DnD.drop =  {


      /* - INIT - - - */

            init: function() {
                  
                  console.log ('RAPID.DnD.drop.init();');

                  RAPID.DnD.drop.dropAreas();

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

              RAPID.DnD.drop.addListners();
     

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
              RAPID.DnD.drop.dropAreas(); 


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

              console.log ('RAPID.DnD.drop.addListners();');
              
              var drops = document.querySelectorAll('.drop-here');


              [].forEach.call(drops, function(el) {
               
                el.addEventListener('dragenter', RAPID.DnD.drop.handleDragEnter, false);
                el.addEventListener('dragover', RAPID.DnD.drop.handleDragOver, false);
                el.addEventListener('drop', RAPID.DnD.drop.handleDrop, false);
                el.addEventListener('dragleave', RAPID.DnD.drop.handleDragLeave, false);
                
              });

            }, // addListners



     }; // RAPID.DnD.drag END
     


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Load
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(window).on('load', function(){
        setTimeout(function(){
            $('body').addClass('rapid-active');
        }, 1000);
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Ready
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(document).on('ready', function(){
   
      RAPID.controllesInject();
      RAPID.DnD.init();

    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Scroll
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(document).on('scroll', function(){
            
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Resize
/////////////////////////////////////////////////////////////////////////////////////////////////////////


  // jquery.debouncing.js, thanks Paul Irish

    //$(window).smartresize(function(){
      
  //});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

})(document,jQuery);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// END
/////////////////////////////////////////////////////////////////////////////////////////////////////////

