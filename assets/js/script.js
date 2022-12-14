// Daily-Planner-App Code


$(document).ready(function(){
    //Declared variable for the current moment
    var currentMoment = moment().format('dddd, MMMM Do');
    // Variable for the different time blocks.
    const WORKING_HOURS = ['9AM', '10AM', '11AM', '12PM','1PM','2PM','3PM','4PM','5PM']

    $('#currentDay').text(currentMoment); //

    function getScheduledItemByHour(hour){
        return localStorage.getItem(hour)
    }

    function storeScheduledItem(hour, scheduledItem){
        localStorage.setItem(hour, scheduledItem)
    }

    function createTimeDataEl(hour){
        var timeDataEl = $('<td>').addClass('hour').css({width: '5%'});
        return timeDataEl.text(hour);
    }
    
    function createTextDataEl(colorClass){
        var textDataEl = $('<textarea col-10>').attr('style','width:80%');
        return textDataEl.addClass(colorClass);
    }
    
    function createSaveBtnEl(hour){
        var btnContainer = $('<td>').addClass('saveBtn');
        var btn = $('<button><i class="fas fa-save"></i></button>');
        
        btn.click(function(){
            // when user clicks save the item is stored on the local storage
            // we intend to save the item as a value in local storage using the hour as the key
            var scheduledItem = $(this).parent().siblings('textarea').val()
            storeScheduledItem(hour, scheduledItem)
        });
    
        return btnContainer.append(btn)
    }
    
    function createRowEl(hour, colorClass){
        var rowEl = $('<tr>').addClass('row');
        var timeDataEl = createTimeDataEl(hour);
        var textDataEl = createTextDataEl(colorClass);
        var saveBtnEl = createSaveBtnEl(hour);
        
        //Here we retrieve the value of the scheduled item from the local storage and display it.
        textDataEl.val(getScheduledItemByHour(hour))

        rowEl.append(timeDataEl);
        rowEl.append(textDataEl);
        rowEl.append(saveBtnEl);
    
        return rowEl;
    }
    
    function convertStringHourToMoment(hour){
        return moment(hour, "HA")
    }
    
    function getColorClass(hour){
        var currentHour = convertStringHourToMoment(moment().format('HA'));
        var hour = convertStringHourToMoment(hour); //"1PM" -> {date: ...13:00:00, ..., ..}

        if (hour.isBefore(currentHour)){
            // if hour passed to function is before the current hour
            return "past"
        }
        
        if (hour.isAfter(currentHour)){
            // if the hour passed to function is ahead of the current hour
            return "future"
        } 

        // if the hour passed to the function is the same as current hour
        return "present"
    }
    
    function createTable(){
        var tableEl = $('<table>').addClass('table col-12');
    
        for (let hour of WORKING_HOURS) {
            var colorClass = getColorClass(hour)
            var rowEl = createRowEl(hour, colorClass);
            tableEl.append(rowEl);  
        }
    
        return tableEl;
    }
    
    // Calling and appening the function that creates the table.
    $('.container').append(createTable());

})






