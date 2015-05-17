
/*
RAPID - Drag and drop
*/ 


;(function(document,$) {

    // For safty, RAPID.js should be loaded before to scope RAPID.
    window.RAPID = window.RAPID || {};
    window.RAPID.DnD = window.RAPID.DnD || {};


// VARIABLES
 
   var orgContainers    = $('.header-org,.content-org,.footer-org'); // Temp, make sexy!
   var orgHeader        = $('.header-org');
   var orgContent       = $('.content-org');
   var orgFooter        = $('.footer-org');

   var addedRow         = $('.added-row');
   var addedModule      = $('.added-module');

   var dragSrcEl        = null;


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// RAPID - Init
/////////////////////////////////////////////////////////////////////////////////////////////////////////


    RAPID.DnD.init = function() {
       
      console.log ('RAPID.DnD.init');

      // Not in use DRAG and DROP initiates seperatly
      // RAPID.DnD.drag.init();
      // RAPID.DnD.drop.init(); 
         
    };



////////////////////////////////////  
// BUTTON EDIT (ON/OFF)
////////////////////////////////////  

    RAPID.DnD.bthEdit = function() {

      console.log ('RAPID.DnD.bthEdit');

     
      
         $('.bth-edit').on("click", function(event){
        
            var el              = $(this);
            var elParent        = $('body');
            
            if (elParent.hasClass("edit-layout")) {

                elParent.removeClass('edit-layout');
                RAPID.DnD.removeDropAreas();

            }
            else {
                
                elParent.addClass('edit-layout');
                RAPID.DnD.addDropAreas();
                RAPID.DnD.drop.init();

            }
            return false;
        });

    };


///// DROP AREAS ADD+REMOVE (Used above in RAPID.DnD.bthEdit) 


// ADD - DROP AREAS

    RAPID.DnD.addDropAreas = function() {
      
        console.log ('RAPID.DnD.addDropAreas');
        
        orgContainers.addClass('drop-here');
        orgContainers.find('.big').text('Drop area');

    };

// REMOVE - DROP AREAS

    RAPID.DnD.removeDropAreas = function() {

      console.log ('RAPID.DnD.removeDropAreas');
      
        orgContainers.parent().removeClass('drop-here');
        orgHeader.find('.big').text('Header');
        orgContent.find('.big').text('Content');
        orgFooter.find('.big').text('Footer');

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
      
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Ready
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(document).on('ready', function(){
   
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

