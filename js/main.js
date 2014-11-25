$(function() {
    var $document         = $(document),
        selector          = '[data-rangeslider]',
        $inputRange       = $(selector);

//Handles value bubbles over rangesliders

    var valueBubble = '<output class="rangeslider__value-bubble" />',
    tempPosition, position;

    $inputRange.rangeslider({
      polyfill: false,
      onInit: function() {
          this.$range.append($(valueBubble));
          this.update();
      },
      onSlide: function(pos, value) {



        var $valueBubble = $('.rangeslider__value-bubble', this.$range);
        tempPosition = pos + this.grabX;
        position = (tempPosition <= this.handleWidth) ? this.handleWidth : (tempPosition >= this.maxHandleX) ? this.maxHandleX : tempPosition;
        
        if ($valueBubble.length) {
          $valueBubble[0].style.left = Math.ceil(position) + 'px';
          $valueBubble[0].innerHTML = value+"%";
        }


      },

//Handles slider value changes based on slider positions
        onSlideEnd: function(position, value ) {
        
          sliding_input = this.$range.parent().attr('id');
          control_value = $(this)[0].value;

          function controlSliders(a,b){

            //theRanges = ['#range_1 [data-rangeslider]','#range_2 [data-rangeslider]','#range_3 [data-rangeslider]','#range_4 [data-rangeslider]'];
            // ^ Simplified below!
            var theRanges = []
            $('.ranges').each(function(){
              theRanges.push('#' + $(this).attr('id') + ' [data-rangeslider]'); 
            });
            //theRangesValues = [$(range_1 [data-rangeslider]).value, $(range_2 [data-rangeslider]).value, $(range_3 [data-rangeslider]).value, $(range_4 [data-rangeslider]).value];  

            switch(a) {

                case 'range_1':
                    theRanges.splice(0, 1);
                    break;
                case 'range_2': 
                    theRanges.splice(1, 1);
                    break;
                case 'range_3':
                    theRanges.splice(2, 1);
                    break;
                case 'range_4':
                    theRanges.splice(3, 1);
                    break;    
            }          
           
              //console.log(theRangesValues);
              target_inputs = $(theRanges[0] + ', ' + theRanges[1] + ', ' + theRanges[2] + ', ' + theRanges[3]);
              
              target_values = (100 - b)/3;
              
              //Change the value of the other sliders when the user adjusts a slider
              $(target_inputs).val(target_values).change();

               console.log('sliding input' + ' ' + a);
               console.log('control value' + ' ' + b); 
               console.log('target inputs' + ' ' + target_inputs); 
               console.log(theRanges);

          }

          controlSliders(sliding_input,control_value);

       }
    });


});