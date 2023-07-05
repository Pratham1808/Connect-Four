var player1 = prompt("Player One: Enter Your Name , You will be Blue");
var player1Color = 'rgb(86, 151, 255)';
var player2 = prompt("Player Two: Enter Your Name , You will be Red");
var player2Color = 'rgb(237, 45, 73)';
var game_on = true;
var table = $('table tr');


function changecolor(rowIn,colIn,color){
    return table.eq(rowIn).find('td').eq(colIn).find('button').css('background-color',color);
}


function reportcolor(rowIn,colIn){
    return table.eq(rowIn).find('td').eq(colIn).find('button').css('background-color');
}


function checkBottom(colIndex){
    var report = reportcolor(5,colIndex)
    for (var row = 5;row>-1;row--){
        report = reportcolor(row,colIndex);
        if(report === 'rgb(128, 128, 128)'){
        return row;
        }
    }
}


function colorMatchCheck(one,two,three,four){
    return (one === two && one === three && one === four && one !=='rgb(128, 128, 128)' && one !==undefined)
}


function horizontalCheck(){
    for(var row=0;row<6;row++){
        for(var col =0; col<4;col++){
            if(colorMatchCheck(reportcolor(row,col),reportcolor(row,col+1),reportcolor(row,col+2),reportcolor(row,col+3))){
                console.log('Horizontal Win');
                return true;
            }else{
                continue;
            }
        }
    }
}



function verticalCheck(){
    for(var col=0;col<7;col++){
        for(var row =0; row<3;row++){
            if(colorMatchCheck(reportcolor(row,col),reportcolor(row+1,col),reportcolor(row+2,col),reportcolor(row+3,col))){
                console.log('Vertical Win');
                return true;
            }else{
                continue;
            }
        }
    }
}


function diagonalCheck(){
    for(var col=0;col<5;col++){
        for(var row =0; row<7;row++){
            if(colorMatchCheck(reportcolor(row,col),reportcolor(row+1,col+1),reportcolor(row+2,col+2),reportcolor(row+3,col+3))){
                console.log('Diagonal Win');
                return true;
            }else if(colorMatchCheck(reportcolor(row,col),reportcolor(row-1,col+1),reportcolor(row-2,col+2),reportcolor(row-3,col+3))){
                console.log('Diagonal Win');
                return true;
            }else{
                continue;
            }
        }
    }
}


var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1+" it is your turn, pick a column to drop in!")

$('.board button').on('click',function(){

    var col = $(this).closest('td').index();
    var bottomAvail = checkBottom(col);

    changecolor(bottomAvail,col,currentColor);

    if(horizontalCheck() || verticalCheck() || diagonalCheck()){
        $('h1').text(currentName+" You have Won!")
        //console.log(currentName+" You have Won!")
        $('.board').fadeOut(7000);
        $('h3').fadeOut(7000);
        game_on=false;
    }
    
    currentPlayer = currentPlayer* -1;


    if(currentPlayer ===1){
        currentName= player1;
        $('h3').text(currentName+" it is your turn, pick a column to drop in!")
        currentColor = player1Color;
    }else {
        currentName = player2;
        $('h3').text(currentName+" it is your turn, pick a column to drop in!")
        currentColor = player2Color;
    }
    if(game_on===false){
        $('h2').text("Refresh the page to Play Again!")
    }

})
