const img = new Image();
img.src = 'test.jpg'; // Make sure test.png is in the same directory
img.crossOrigin = 'Anonymous'; // Optional if loading remotely


let turn = 1;

img.onload = () => {
  document.getElementById("myButton").addEventListener("click", play);
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  let posA = { x: 0, y: 0 };
  let posB = { x: 0, y: 0 };
  
  ladderfrom=[[9,3],[8,6],[8,8],[7,1],[5,0],[4,6]];
  ladderto=[[4,4],[4,5],[5,9],[4,2],[2,1],[1,7]];

  snakefrom=[[7,7],[6,3],[5,7],[2,6],[0,6],[0,4]];
  snaketo=[[9,9],[9,2],[8,4],[6,8],[2,9],[5,1]];

  newWidth=img.width;
  newHeight=img.height;

  canvas.width = newWidth;
  canvas.height = newHeight;
  
  console.log(canvas.width);
  console.log(canvas.height);
  // Draw image to canvas
  ctx.drawImage(img, 0, 0);

  // Get image data
  const imageData = ctx.getImageData(0, 0, newWidth, newHeight);
  const data = imageData.data; // 1D array: [r,g,b,a, r,g,b,a, ...]
  const width = img.width;
  const height = img.height;

  let resA={ row: 9, col: -1 };
  let resB={ row: 9, col: -1 };

  const x=cols= 10;
  const y =rows= 10;
  const blockWidth = canvas.width / cols;
  const blockHeight = canvas.height / rows;
  ctx.fillStyle = 'red';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  let number =1;
  turn=0;

  let prevXA=0;
  let prevYA=0;
  let prevXB=0;
  let prevYB=0;

  function animateMove(fromX, fromY, toX, toY, nam) {
    const steps = 30;
    const delay = 30; // milliseconds per step
    let step = 0;

    function drawStep() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const x = fromX + (toX - fromX) * (step / steps);
        const y = fromY + (toY - fromY) * (step / steps);

        if (nam === 'A') {
            posA.x = x;
            posA.y = y;
        } else {
            posB.x = x;
            posB.y = y;
        }

        ctx.fillText('A', posA.x, posA.y);
        ctx.fillText('B', posB.x, posB.y);

        step++;
        if (step <= steps) {
            setTimeout(drawStep, delay);
        }
    }

    drawStep();
}




function gameA(nam, dice, row, col) 
{
    
        let finalRow = row;
        let finalCol = col;
        let currentPos = (9 - finalRow) * 10 + (finalRow % 2 === 0 ? (9 - finalCol) : finalCol);
        let targetPos = 99;
        let remainingSteps = targetPos - currentPos;
    
        if (dice > remainingSteps)
             {
            console.log("Overshot! Need exact number to finish.");
            return { row, col };
        }
    while (dice > 0 && finalRow >= 0)
    {
        if (finalRow % 2 !== 0) 
        {
            let space=9-finalCol;

            if (dice<=space)
            {
                finalCol += dice;
                dice=0;
            } 
            else 
            {
                dice -= (space+1);
                finalRow--;
                finalCol=9;
            }
        } 
        else 
        {
            if (dice<=finalCol) {
                finalCol-=dice;
                dice=0;
            } 
            else
             {
                dice-=(finalCol + 1);
                finalRow--;
                finalCol = 0;
            }
        }
    }
    //ctx.fillText("", prevX, prevY);
    console.log(finalRow,finalCol);
    if(finalRow<=9 && finalCol<=9)
    {
        for (let i = 0; i < ladderfrom.length; i++) 
        {
            if(finalRow==ladderfrom[i][0] && finalCol==ladderfrom[i][1])
            {
                finalRow = ladderto[i][0];
                finalCol = ladderto[i][1];
                
                break;
            }
        // console.log(`Row: ${row}, Col: ${col}`);
        }
        for (let i = 0; i < snakefrom.length; i++) 
            {
                if(finalRow==snakefrom[i][0] && finalCol==snakefrom[i][1])
                {
                    finalRow = snaketo[i][0];
                    finalCol = snaketo[i][1];
                    break;
                }
            // console.log(`Row: ${row}, Col: ${col}`);
            }
    
    console.log(finalRow,finalCol);
    const centerXA=finalCol*blockWidth + blockWidth / 2;
    const centerYA=finalRow * blockHeight + blockHeight / 2;
    //console.log(centerXA,centerYA);
    animateMove(prevXA, prevYA, centerXA, centerYA, nam);
    if(finalRow==0 && finalCol==0)
        {
            return { row: -1, col: -1 };
        }
    
    /*
    ctx.fillText(nam, centerX, centerY);*/
    prevXA=centerXA;
    prevYA=centerYA;
    }
    
    else
    {
        finalRow=prevXA;
        finalCol=prevYA;
    }
  
    return { row: finalRow, col: finalCol };
}
function gameB(nam, dice, row, col) 
{
    let finalRow = row;
        let finalCol = col;
        let currentPos = (9 - finalRow) * 10 + (finalRow % 2 === 0 ? (9 - finalCol) : finalCol);
        let targetPos = 99;
        let remainingSteps = targetPos - currentPos;
    
        if (dice > remainingSteps)
             {
            console.log("Overshot! Need exact number to finish.");
            document.getElementById("change").textContent="Overshot! Need exact number to finish."
            return { row, col };
        }
    while (dice > 0 && finalRow >= 0)
    {
        if (finalRow % 2 !== 0) 
        {
            let space=9 -finalCol;
            if (dice<=space)
            {
                finalCol += dice;
                dice=0;
            } 
            else 
            {
                dice -= (space+1);
                finalRow--;
                finalCol=9;
            }
        } 
        else 
        {
            if (dice<=finalCol) {
                finalCol-=dice;
                dice=0;
            } 
            else
             {
                dice-=(finalCol + 1);
                finalRow--;
                finalCol = 0;
            }
        }
    }
    //ctx.fillText("", prevX, prevY);
    console.log(finalRow,finalCol)
    if(finalRow<=9 && finalCol<=9)
    {
    for (let i = 0; i < ladderfrom.length; i++) 
        {
            if(finalRow==ladderfrom[i][0] && finalCol==ladderfrom[i][1])
            {
                finalRow = ladderto[i][0];
                finalCol = ladderto[i][1];
                break;
            }
            //console.log(`Row: ${row}, Col: ${col}`);
        }
        for (let i = 0; i < snakefrom.length; i++) 
            {
                if(finalRow==snakefrom[i][0] && finalCol==snakefrom[i][1])
                {
                    finalRow = snaketo[i][0];
                    finalCol = snaketo[i][1];
                    break;
                }
                //console.log(`Row: ${row}, Col: ${col}`);
            }
    console.log(finalRow,finalCol);
    const centerXB=finalCol*blockWidth + blockWidth / 2;
    const centerYB=finalRow * blockHeight + blockHeight / 2;
    //console.log(centerXB,centerYB);
    animateMove(prevXB, prevYB, centerXB, centerYB, nam);
    if(finalRow==0 && finalCol==0)
        {
            return { row: -1, col: -1 };
        }

    
    /*
    ctx.fillText(nam, centerX, centerY);*/
    prevXB=centerXB;
    prevYB=centerYB;
    }
    
    else
    {
        finalRow=prevXA;
        finalCol=prevYA;
    }
    
    return { row: finalRow, col: finalCol };
}  
async function play() 
{   
      const dice = Math.floor(Math.random() * 6) + 1;
      console.log(`Player clicked! Rolled: ${dice}`);
      document.getElementById("val").textContent=`Player clicked! Rolled: ${dice}`
      document.getElementById("change").textContent=""
      resA = gameA('A', dice, resA.row, resA.col); // Pass current position
      if(resA.row==-1)
      {
        document.getElementById("myButton").disabled = true;
        console.log("Player reached end. Button disabled.");
        document.getElementById("change").textContent="Player reached end. Button disabled."
      }
      console.log(`Player Position -> Row: ${resA.row}, Col: ${resA.col}`);
      await delay(1000);
      if (dice!==1) 
        {
        comp();
    } else
     {
        console.log("Player rolled a 1. Play again manually.");
        document.getElementById("change").textContent="Player rolled a 1. Play again manually."
        
    }
}
function comp() 
{
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log(`Computer clicked! Rolled: ${dice}`);
    document.getElementById("val").textContent=`Comp clicked! Rolled: ${dice}`
    document.getElementById("change").textContent=""
    resB = gameB('B', dice, resB.row, resB.col); // Pass current position
    
    if(resB.row==-1)
        {
          document.getElementById("myButton").disabled = true;
          console.log("Comp reached end. Button disabled.");
          document.getElementById("change").textContent="Comp reached end. Button disabled."
        }
    console.log(`Comp Position -> Row: ${resB.row}, Col: ${resB.col}`);      
    if(dice==1)
    {
        comp();
    }
}  
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

};


