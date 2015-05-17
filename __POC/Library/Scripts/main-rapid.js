////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
// RAPID - functions 
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
 

(function(document) {

    window.RAPID = window.RAPID || {};


// VARIABLES
 
   var orgContainers    = $('.header-org,.content-org,.footer-org'); // Temp, make sexy!
   var orgHeader        = $('.header-org');
   var orgContent       = $('.content-org');
   var orgFooter        = $('.footer-org');

   var addedRow         = $('.added-row');
   var addedModule      = $('.added-module');

   var dragSrcEl = null;



////////////////////////////////////  
// INITIATE
////////////////////////////////////    

    RAPID.init = function() {

      console.log ('RAPID.init');

      // Not in use DRAG and DROP initiates seperatly
      // RAPID.drag.init();
      // RAPID.drop.init(); 
      
    };



////////////////////////////////////  
// BUTTON EDIT (ON/OFF)
////////////////////////////////////  

    RAPID.bthEdit = function() {

      console.log ('RAPID.bthEdit');
      
         $('.bth-edit').on("click", function(event){
        
            var el              = $(this);
            var elParent        = $('body');
            
            if (elParent.hasClass("edit-layout")) {

                elParent.removeClass('edit-layout');
                RAPID.removeDropAreas();

            }
            else {
                
                elParent.addClass('edit-layout');
                RAPID.addDropAreas();
                RAPID.drop.init();

            }
            return false;
        });

    };


///// DROP AREAS ADD+REMOVE (Used above in RAPID.bthEdit) 


// ADD - DROP AREAS

    RAPID.addDropAreas = function() {
      
        console.log ('RAPID.addDropAreas');
        
        orgContainers.addClass('drop-here');
        orgContainers.find('.big').text('Drop area');

    };

// REMOVE - DROP AREAS

    RAPID.removeDropAreas = function() {

      console.log ('RAPID.removeDropAreas');
      
        orgContainers.parent().removeClass('drop-here');
        orgHeader.find('.big').text('Header');
        orgContent.find('.big').text('Content');
        orgFooter.find('.big').text('Footer');

        $('.ghost-row').remove();
        $('.ghost-module').remove();

    };


////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
// DnD- FUNCTIONS
////////////////////////////////////  
////////////////////////////////////
//////////////////////////////////// 

////////////////////////////////////
// DnD - DRAG - OBJECT
//////////////////////////////////// 




     RAPID.drag =  {


            init: function() {
                  
                  console.log ('RAPID.drag.init();');
                  RAPID.drag.addListners();

            }, // init



            handleDragStart: function(e) {
                    
              console.log ('RAPID.drag.handleDragStart();');

              // this/e.target is the source node.
              dragSrcEl = this;
              e.dataTransfer.effectAllowed = 'copy';
              e.dataTransfer.setData('text/html', this.innerHTML);

            }, // handleDragStart



            handleDragEnd: function(e) {

              console.log ('RAPID.drag.handleDragEnd();');

              var drops = document.querySelectorAll('.drop-here');
             
              // this/e.target is the source node.
              [].forEach.call(drops, function (dro) {
                dro.classList.remove('dragOVER');
                dro.classList.remove('dragLEAVE'); 
              });

            }, // handleDragEnd



            addListners: function() {

              console.log ('RAPID.drag.addListners();');
              
              var drags = document.querySelectorAll('.drag-me');

              [].forEach.call(drags, function(el) {

                el.setAttribute('draggable', 'true');
                el.addEventListener('dragstart', RAPID.drag.handleDragStart, false);
                el.addEventListener('dragend', RAPID.drag.handleDragEnd, false);

              });

            }, // addListners



     }; // RAPID.drag END




////////////////////////////////////
// DnD - DROP - OBJECT
//////////////////////////////////// 


 RAPID.drop =  {


            init: function() {
                  
                  console.log ('init -> RAPID.drop.init();');

                  RAPID.drop.dropAreas();

            }, // init


            dropAreas: function(e) {

              $('.ghost-row').remove();
              $('.ghost-module').remove();

              // Row - Added
              $('.added-row').parent().removeClass('drop-here');
              $('.added-row').before('<div class="ghost-row drop-here before">Drop area</div>');
                //$('.added-row').after('<div class="ghost-row drop-here after">Drop area</div>');

              // Module - Added
              $('.added-module').addClass('drop-here');
              $('.added-module').before('<div class="ghost-module drop-here before">Drop area</div>');
              //$('.added-module').after('<div class="ghost-module drop-here after">Drop area</div>');

              // Add lisners again for elements
              RAPID.drop.addListners();
     

            }, // dropAreas


            handleDragEnter: function(e) {

          
                // this / e.target is the current hover target.
                this.classList.add('dragENTER');
                this.classList.remove('dragLEAVE'); 

            }, // handleDragEnter


            handleDragOver: function(e) {

              if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
              }

              e.dataTransfer.dropEffect = 'copy';  // See the section on the DataTransfer object.
              this.classList.add('dragOVER');
              this.classList.remove('dragLEAVE'); 

              return false;

            }, // handleDragOver



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

              // After drop make new areas dropable, lift out fn(), Elm - Drop;
              RAPID.drop.dropAreas(); 


              return false;
     

            }, // handleDrop



            handleDragLeave: function(e) {

              // this / e.target is previous target element.
              this.classList.add('dragLEAVE'); 
              this.classList.remove('dragENTER'); 
              this.classList.remove('dragOVER');
          
            }, // handleDragLeave


            addListners: function() {

              console.log ('RAPID.drop.addListners();');
              
              var drops = document.querySelectorAll('.drop-here');


              [].forEach.call(drops, function(el) {
               
                el.addEventListener('dragenter', RAPID.drop.handleDragEnter, false);
                el.addEventListener('dragover', RAPID.drop.handleDragOver, false);
                el.addEventListener('drop', RAPID.drop.handleDrop, false);
                el.addEventListener('dragleave', RAPID.drop.handleDragLeave, false);
                
              });

            }, // addListners



     }; // RAPID.drag END


})(document);