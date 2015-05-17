/**
 * OTB - functions 
 */

(function(document) {

    window.OTB = window.OTB || {};


    


   //$('html').addClass('touch').removeClass('no-touch');
	 //$('html').addClass('no-touch').removeClass('touch');

   var orgContainers    = $('.header-org,.content-org,.footer-org');
   var orgHeader        = $('.header-org');
   var orgContent       = $('.content-org');
   var orgFooter        = $('.footer-org');

   var addedRow         = $('.added-row');
   var addedModule      = $('.added-module');


     $('nav li ul').parent().addClass('sub');
     $('.sub').append('<span></span>');


        $('.touch nav .sub > span').on("click", function(event){
			
            var elParent = $(this).parent();
            var el       = $(this);
	
            if (elParent.hasClass("show")) {
                elParent.removeClass('show').find('li.sub').removeClass('show');
            }
            else {
                elParent.addClass('show');
            }
            return false;
        });



        $('.bth-edit').on("click", function(event){
        
            var el              = $(this);
            var elParent        = $('body');
            
            if (elParent.hasClass("edit-layout")) {

                elParent.removeClass('edit-layout');
                OTB.removeDropAreas();

            }
            else {
                
                elParent.addClass('edit-layout');
                OTB.addDropAreas();
                OTB.initDnD();

            }
            return false;
        });



    OTB.addDropAreas = function() {
      
        
        orgContainers.addClass('drop-here');
        orgContainers.find('.big').text('Drop area');


        OTB.initDnD();

    };


    OTB.removeDropAreas = function() {
      
        orgContainers.removeClass('addStuff');
        orgContainers.parent().removeClass('drop-here');
        orgHeader.find('.big').text('Header');
        orgContent.find('.big').text('Content');
        orgFooter.find('.big').text('Footer');

        $('.ghost-row').remove();
          $('.ghost-module').remove();


    };


///////////////////////////////////////////////////

    OTB.initDnD = function() {

        
          $('.ghost-row').remove();
          $('.ghost-module').remove();

          // Row - Added
          $('.added-row').parent().removeClass('drop-here');
          $('.added-row').before('<div class="ghost-row drop-here">Drop area</div>');

          // Module - Added
          $('.added-module').addClass('drop-here');
          $('.added-module').before('<div class="ghost-module drop-here">Drop area</div>');

      

        ////////////////////////////////////
        // VARIABLES 
        ////////////////////////////////////

        var dragSrcEl = null;
        var dragEnterOnce = false;


        ////////////////////////////////////
        // DRAG START
        ////////////////////////////////////

        function handleDragStart(e) {
          // Target (this) element is the source node.

          dragSrcEl = this;

          e.dataTransfer.effectAllowed = 'copy';
          e.dataTransfer.setData('text/html', this.innerHTML);

        }

        ////////////////////////////////////
        // DRAG END
        ////////////////////////////////////

        function handleDragEnd(e) {
          // this/e.target is the source node.

          [].forEach.call(drops, function (dro) {

            dro.classList.remove('dragOVER');
            dro.classList.remove('dragLEAVE'); 

          });
        }





        ////////////////////////////////////
        // DRAG OVER
        ////////////////////////////////////

        function handleDragOver(e) {
          if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
          }

          e.dataTransfer.dropEffect = 'copy';  // See the section on the DataTransfer object.
          this.classList.add('dragOVER');
          this.classList.remove('dragLEAVE'); 

          return false;

        }

        ////////////////////////////////////
        // DRAG ENTER
        ////////////////////////////////////

        function handleDragEnter(e) {
          
          // this / e.target is the current hover target.
          this.classList.add('dragENTER');
          this.classList.remove('dragLEAVE'); 

        }

        ////////////////////////////////////
        // DRAG LEAVE
        ////////////////////////////////////

        function handleDragLeave(e) {
          
          // this / e.target is previous target element.
          this.classList.add('dragLEAVE'); 
          this.classList.remove('dragENTER'); 
          this.classList.remove('dragOVER');
          
        }


        ////////////////////////////////////
        // DROP
        ////////////////////////////////////

        function handleDrop(e) {
          // this/e.target is current target element.

          if (e.stopPropagation) {
            e.stopPropagation(); // Stops some browsers from redirecting.
          }

            this.classList.remove('over');
            this.classList.remove('dragOVER'); 
            this.classList.remove('dragENTER');
            this.classList.remove('dragLEAVE'); 
            //this.innerHTML = e.dataTransfer.getData('text/html');

            var htmlCode = e.dataTransfer.getData('text/html');

            $(this).replaceWith(htmlCode);

            OTB.initDnD();


          return false;
        }


        ////////////////////////////////////
        ////////////////////////////////////
        ////////////////////////////////////
        // Elm - Drag
        ////////////////////////////////////

        var drags = document.querySelectorAll('.drag-me');

        [].forEach.call(drags, function(el) {

          el.setAttribute('draggable', 'true');
          el.addEventListener('dragstart', handleDragStart, false);
          el.addEventListener('dragend', handleDragEnd, false);

        });

        ////////////////////////////////////
        ////////////////////////////////////
        ////////////////////////////////////
        // Elm - Drop
        ////////////////////////////////////

        var drops = document.querySelectorAll('.drop-here');

        [].forEach.call(drops, function(el) {
         
          el.addEventListener('dragenter', handleDragEnter, false);
          el.addEventListener('dragover', handleDragOver, false);
          el.addEventListener('drop', handleDrop, false);
          el.addEventListener('dragleave', handleDragLeave, false);
          
        });




        ////////////////////////////////////
        ////////////////////////////////////





    };


    


})(document);