//@codekit-prepend 'jquery.js';
//@codekit-prepend 'jquery.zclip.min.js';
//@codekit-prepend 'my.js';
//@codekit-prepend 'Packer.js';
//@codekit-prepend 'Words.js';

var input = ace.edit("input_div");
input.setTheme("ace/theme/chrome");
input.getSession().setMode("ace/mode/javascript");
input.getSession().setTabSize(2);
document.getElementById('input_div').style.fontSize='12px';
input.setShowPrintMargin(false);
input.resize();     

var output = ace.edit("output_div");
output.setTheme("ace/theme/chrome");
output.getSession().setMode("ace/mode/javascript");
output.getSession().setTabSize(2);
document.getElementById('output_div').style.fontSize='12px';
output.setShowPrintMargin(false);
output.renderer.setShowGutter(false);
output.session.setUseWrapMode(true);
output.session.setWrapLimitRange();
output.setHighlightActiveLine(false);
output.setReadOnly(true);
output.resize();
      
      
$(function(){
  $('.ace_text-input').eq(0).attr('id', 'input').attr('name', 'input');
  $('.ace_text-input').eq(1).attr('id', 'output').attr('name', 'output').attr('disabled', 'disabled').attr('readonly', 'readonly');
 
  $('#clear-all').click(function(){
    input.getSession().setValue('');
    output.getSession().setValue('');
    $('#message').html('ready');
    $('body').append('<div id="status" class="success">cleared</div>');
    $('#status').fadeOut(800, 'swing', function(){$(this).remove();});
  });
  var packer = new Packer();
  
  input.focus();
       
  $('#pack-script').click(function(){
    if (input.getSession().getValue().length > 0) {
      output.getSession().setValue(packer.pack(input.getSession().getValue(), false, $('#shrink').is(':checked')));
      var length = input.getSession().getValue().length;
      if (!/\r/.test(input.getSession().getValue())) { // mozilla trims carriage returns
      	length += match(input.getSession().getValue(), /\n/g).length;
      }
      var calc = output.getSession().getValue().length + "/" + length;
      var ratio = (output.getSession().getValue().length / length).toFixed(3);
      var percent = (ratio * 100).toFixed(1);
      $('#message').html('compression ratio: '+calc+' = '+percent+'%');
    }        
  });  
  $('#copy').zclip({
    path:'assets/js/ZeroClipboard.swf',
    copy:function(){return output.getSession().getValue();},
    beforeCopy:function(){
        
    },
    afterCopy:function(){
        $('body').append('<div id="status" class="success">copied to clipboard</div>');
        $('#status').fadeOut(800, 'swing', function(){$(this).remove();});
    }
  });
  $('#language').change(function(){
    if ($(this).val() === 'javascript') {
      $('#shrinklabel').css('visibility', 'visible');
    }
    else {
      $('#shrinklabel').css('visibility', 'hidden').find('#shrink').attr('checked', false);
    }
    input.getSession().setMode("ace/mode/"+$(this).val());
    output.getSession().setMode("ace/mode/"+$(this).val());
    input.focus();
  });
});
