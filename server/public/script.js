$('#input_form').submit(function() {
    const val = $('#input_link').val();
    $.get('/new/'+val,function(data) {
        $('#output_link').val(data.short_url);
        $('#input_div > h2').val("Try for another URL")
        $('#output').show();
    })
    return false;
})
$(function() {
    $('#output').hide();
});
new Clipboard('#clipboard_share');