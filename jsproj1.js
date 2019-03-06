//                                            --- Canvas ---    


    var canvas = document.getElementById('drawingSurface');
    var context = canvas.getContext('2d');


//                                           --- Variables ---



    var field = [];                                 // main array which contain cells 
    var fieldSize = 4;                              // size of the field
    var canvasSize = 600;                          // size of the canvas
    var cellSize = canvasSize/fieldSize;          // size of one individual cell  
    var rotate = 0;                              // responsible for random shuffling 
    var swapI = 0;                               // var used to shuffle the cells
    var swapJ = 0;                              // var used to shuffle the cells
    var tmp;                                   // holds temporary objects
    
  
        


//                                     --- Click responding methods --



    // A swap function is responsible for swapping two cells: a cell that has been clicked and the blank cell.
    // As a parameters, it takes both current and blank cells.

    function swap(cell, anotherCell) {
        
            // we do swap here
          var tmp = anotherCell.number;
          anotherCell.number = cell.number;
          cell.number = tmp;
        
            // then draw our cells to make changes visible
          drawCell(context, cell);
          drawCell(context, anotherCell);
     }

    // In the clickHandler method we get the coordinates of a cell which has been pressed and
    // then we check if there is a blank cell beside. If it is, we invoke swap method.
        
    function clickHandler(event) {
          var currentCell = getCurrentCell(event); // getting coordinates of the cell pressed
        
          //cheking the blank cell on the left. Performing swap if it exists
          if (field[currentCell.y][currentCell.x + 1] && field[currentCell.y][currentCell.x + 1].number == 0) {
            swap(currentCell, field[currentCell.y][currentCell.x + 1]);
          } 
            //cheking the blank cell on the right. Performing swap if it exists
            else if (field[currentCell.y][currentCell.x - 1] && field[currentCell.y][currentCell.x - 1].number == 0) {
            swap(currentCell, field[currentCell.y][currentCell.x - 1]);
          } 
            //cheking the blank cell at the buttom. Performing swap if it exists
            else if (field[currentCell.y + 1] && field[currentCell.y + 1][currentCell.x] && field[currentCell.y+1][currentCell.x].number == 0) {
            swap(currentCell, field[currentCell.y+1][currentCell.x]);
          } 
            //cheking the blank cell at the top. Performing swap if it exists
            else if (field[currentCell.y - 1] && field[currentCell.y - 1][currentCell.x] && field[currentCell.y-1][currentCell.x].number == 0) {
            swap(currentCell, field[currentCell.y - 1][currentCell.x]);
          }
          
        }

          
        canvas.addEventListener("click", clickHandler, false);  // adding click event responder to the canvas    
          
          
       //This method return coordinates of the cell pressed on canvas

     function getCurrentCell(event) {
            var x = event.offsetX;              //getting offsetX coordinate 
            var y = event.offsetY;             //getting ofsettY coordinate
            var mX = parseInt(x/cellSize);    // We parse the division of offsetX on cellsize tp get integer that represent
                                              // X coordinate of the current cell
            if (mX > cellSize) {
                mX *= cellSize;
            }
            
            var mY = parseInt(y/cellSize);  // We parse the division of offsetY on cellsize tp get integer that represent
                                              // Y coordinate of the current cell
            if (mY > cellSize){
                mY *= cellSize;
            }
            
            return field[mY][mX]; 
    }
          
    // drawCell method prints cells and numbers inside each cell.
             
     function drawCell(context, cell) {
         //context.fillStyle = '#fff';
         context.fillStyle = '#6DD56A'; // A color of the cells on board
         context.fillRect(              //method that prints cells on the game board
         canvasSize/fieldSize*cell.x,
         canvasSize/fieldSize*cell.y,
         canvasSize/fieldSize,
         canvasSize/fieldSize);
         
         if(cell.number == 0){
            context.fillStyle = '#6ACED5';    // A color of the zero cell
            context.fillRect(                 // method that prints a zero cell
             canvasSize/fieldSize*cell.x,
             canvasSize/fieldSize*cell.y,
             canvasSize/fieldSize,
             canvasSize/fieldSize);
             
             context.strokeRect(
             canvasSize/fieldSize*cell.x,
             canvasSize/fieldSize*cell.y,
             canvasSize/fieldSize,
             canvasSize/fieldSize);
         }

         context.strokeRect(            //mathod draws the game board
         canvasSize/fieldSize*cell.x,
         canvasSize/fieldSize*cell.y,
         canvasSize/fieldSize,
         canvasSize/fieldSize);
         

       context.fillStyle = '#000';
        
        // if a cell doesn't have number 0 we display a number of this cell.
       if (cell.number != 0) {
         context.fillText(cell.number, cellSize*cell.x+cellSize/2.25, cellSize*cell.y+cellSize/2);
         
           
       }
     }
    


//                                        --- Initialization and shuffling ---


        context.beginPath();                                
        context.font = "30px Verdana";
       

       
    // initialization of the board. It's represented as a 2d array inside canvas.

    var counter = 0; // counter gives individual number to each cell

    for (var i = 0; i < fieldSize; i++) {
          var row = []; // creating a second array to complete the game board.
          field.push(row); // adding array "row" inside our main "field" array.
        for (var j = 0; j < fieldSize; j++) { 
               var cell = {x: j, y: i, number: counter}; // creating a cell
                counter++;
                row.push(cell); // adding a cell inside array
        }
     }
    
    // shuffling the game board. Depending on random number it will shuffle at different direction: up, down, left, right
    // shuffling will not be performed if the move touches array's boundaries.

    for(var i = 0; i < fieldSize * fieldSize * 2; i++){
    
        rotate = Math.floor(Math.random() * (4 - 0) + 0);
    
        switch(rotate){
        
            case 0: //we first make a check if our move will not be out of the boundaries of the array. If it won't we make one move left.
              if(swapI == 0){
                i--;
                break;
              }
              tmp = field[swapI][swapJ].number;
              field[swapI][swapJ].number = field[swapI - 1][swapJ].number;
              field[swapI - 1][swapJ].number = tmp;
              swapI--;
              break;

            case 1: //we first make a check if our move will not go out of the boundaries of the array. If it won't we make one move right.
              if(swapI == field.length - 1){
                i--;
                break;
              }
              tmp = field[swapI][swapJ].number;
              field[swapI][swapJ].number = field[swapI + 1][swapJ].number;
              field[swapI + 1][swapJ].number = tmp;
              swapI++;
              break;

            case 2: //we first make a check if our move will not go out of the boundaries of the array. If it won't we make one move up.
              if(swapJ == 0){
                i--;
                break;
              }
              tmp = field[swapI][swapJ].number;
              field[swapI][swapJ].number = field[swapI][swapJ - 1].number;
              field[swapI][swapJ - 1].number = tmp;
              swapJ--;
              break;

            case 3:  //we first make a check if our move will not go out of the boundaries of the array. If it won't we make one move down.
              if(swapJ == field.length - 1){
                break;
              }
              tmp = field[swapI][swapJ].number;
              field[swapI][swapJ].number = field[swapI][swapJ + 1].number;
              field[swapI][swapJ + 1].number = tmp;
              swapJ++;
              break;
      }
    }
    
        
    //draw game board after shuffling
    
        for (var i = 0; i < field.length; i++) {
           for (var j = 0; j < field.length; j++) { 
              drawCell(context, field[i][j]);
           }
        }    