
/* time para*/
BEAT_DIVITION = 4;
TIME_SIGNATURE_NUMERATOR = 4;


/* margin param */
const TOP_MARGIN = 50;
const LEFT_MARGIN = 50;


/* cell param */
const CELL_HEIGHT = 20;
const CELL_WIDTH = 30;
const CELL_NOHOVER_COLOR = "darkblue";
const CELL_HOVER_COLOR = "aquamarine";


/* line param */
const LINE_MORE = 3;
const BAR_MORE = 7;
const MEASURE_MORE = 10;

const LINE_LENGTH = CELL_HEIGHT*88+2*LINE_MORE;
const BAR_LENGTH = CELL_HEIGHT*88+2*BAR_MORE;
const MEASURE_LENGTH = CELL_HEIGHT*88+2*MEASURE_MORE;

const LINE_TOP = TOP_MARGIN-LINE_MORE;
const BAR_TOP = TOP_MARGIN-BAR_MORE;
const MEASURE_TOP = TOP_MARGIN-MEASURE_MORE;


/* souond param */
const SOUND_COLOR = "magenta"


/* [note, start, end] */
let SOUND_LIST = []

/*************************************************************************************************** */
/** Class */

/* Clik and hold */
/* https://www.youtube.com/watch?v=A95mIE2HdcY */

class ClickAndHold {

    /**
     * 
     * @param {EventTarget} target The HTML element to apply the event to 
     * @param {Function} callback The Function to run once the target is clicked and hold
     */
    constructor(target, callback) {
        this.target = target;
        this.callback = callback;
        this.isHold = false;
        this.activeHoldTimeoutId = null;

        this.start_pageX = null;
        this.start_pageY = null;

        ["mousedown", "touchstart"].forEach(type =>{
            this.target.addEventListener(type, this._onHoldStart.bind(this));
        });

        ["mouseup", "mouseleave", "touchend", "touchcancel"].forEach(type =>{
            this.target.addEventListener(type, this._onHoldEnd.bind(this));
        });
    }

    _onHoldStart(e){
        this.isHold = true;

        // console.log(e.pageX, e.pageY);
        this.start_pageX = e.pageX;
        this.start_pageY = e.pageY;

    }
    
    _onHoldEnd(e){
        this.isHold = false;

        // console.log(e.pageX, e.pageY);
        if(this.start_pageX != null && this.start_pageY != null){

            this.callback(this.start_pageX, this.start_pageY, e.pageX, e.pageY);
        }

    }

    /**
     * 
     * @param {EventTarget} target The HTML element to apply the event to 
     * @param {Function} callback The Function to run once the target is clicked and hold
     */
    static apply(target, callback){
        new ClickAndHold(target, callback);
    }
}


/*************************************************************************************************** */
/** Function */

/* Make grid */
const MakeGrid = (beats) => {
    for(let i=1;i<=beats*BEAT_DIVITION*TIME_SIGNATURE_NUMERATOR;i++){

    Create_new_line(i); // draw vertical lines
    for(let j=1;j<=88;j++){

        Create_new_cell(i, j); // create cells
        // console.log(i.toString()+"_"+j.toString())
        }
    }
}
    

/* Create cells */
function Create_new_cell(x, y){

    let new_div = document.createElement("div");    // create div

    /* identity information */
    new_div.id = x.toString()+"_"+y.toString();     // id: x_y
    new_div.classList.add('cell');      // add class
    
    /* style */
    new_div.style.width = CELL_WIDTH.toString()+"px";       // width
    new_div.style.height = CELL_HEIGHT.toString()+"px";     // height
    new_div.style.backgroundColor = CELL_NOHOVER_COLOR;     // color
    new_div.style.boxSizing = "border-box";     // flip border inside 
    new_div.style.borderTop = "1px solid rgb(97, 51, 247)";     // border on the top
    new_div.style.borderBottom = "1px solid rgb(97, 51, 247)";
    new_div.style.zIndex = "1";      // border on the bottom
    new_div.setAttribute("draggable", false);

    /* position */
    let left = (x-1)*CELL_WIDTH+LEFT_MARGIN; 
    let top = (y-1)*CELL_HEIGHT+TOP_MARGIN; 
    new_div.style.position = "absolute";        // position relation
    new_div.style.left = left.toString()+"px";  // absolute position from left in parent element
    new_div.style.top = top.toString()+"px";    // absolute position from top in parent elenent

    /* event */
    new_div.addEventListener("mouseover",(e)=>{     // change color when cell being hover
        e.target.style.backgroundColor = CELL_HOVER_COLOR;
    })

    new_div.addEventListener("mouseout", (e)=>{     // change back color when cell not being hover
        e.target.style.backgroundColor = CELL_NOHOVER_COLOR;
    })
    
    /* append to body */
    if(scroll == null){
        console.log("scroll is null");
    }else{
        document.querySelector("body").appendChild(new_div);
    }
    
}


/* Draw Line */
function Create_new_line(x){

    let new_line = document.createElement("div");       // create div

    /* identity information */
    new_line.classList.add('line');

    /* style */
    new_line.style.backgroundColor = "white"; 
    new_line.style.width = "2px";
    new_line.style.height = LINE_LENGTH.toString()+"px";
    new_line.style.zIndex = "2";
    new_line.setAttribute("draggable", false);

    /* position */
    let left = (x-1)*CELL_WIDTH-1+LEFT_MARGIN;
    let top = LINE_TOP;
    new_line.style.position = "absolute";
    new_line.style.left = left.toString()+"px";
    new_line.style.top = top.toString()+"px";

    /* distinct beat and measure */
    if(x%BEAT_DIVITION == 0){   // one beat
        new_line.style.height = BAR_LENGTH.toString()+"px";
        new_line.style.backgroundColor = "yellow";
        new_line.style.top = BAR_TOP.toString()+"px";
    }

    if(x%(BEAT_DIVITION*TIME_SIGNATURE_NUMERATOR) == 0){    // one measure
        new_line.style.height = MEASURE_LENGTH.toString()+"px";
        new_line.style.backgroundColor = "red";
        new_line.style.top = MEASURE_TOP.toString()+"px";
    }

    /* append to body */
    if(scroll == null){
        console.log("scroll is null");
    }else{
        document.querySelector("body").appendChild(new_line);
    }
}


/* Create sound */
const createSoundDiv = (x, y, width) =>{

    let new_sound = document.createElement("div")

    /* style */
    new_sound.style.backgroundColor = SOUND_COLOR;
    new_sound.style.width = width+"px";
    new_sound.style.height = CELL_HEIGHT.toString()+"px";
    new_sound.style.zIndex = "3";
    new_sound.setAttribute("draggable", false);

    /* position */
    new_sound.style.position = "absolute";
    new_sound.style.left = x;
    new_sound.style.top = y;

    // append to body
    console.log("("+x+","+y+")", "width:", width);
    document.body.appendChild(new_sound);
}

/* Draw new sound */
const NewSoundDiv = (start_pageX, start_pageY, end_pageX) =>{

    /* calculate which cell is on when mousedown, mouseup */
    let body_x = document.body.getBoundingClientRect().x;   // body x
    let body_y = document.body.getBoundingClientRect().y;   // body y
    let mousedown_cell_column = Math.floor((start_pageX - body_x - LEFT_MARGIN) / CELL_WIDTH) + 1;  // the nth column(time) when mousedown
    let mousedown_cell_row = Math.floor((start_pageY - body_y - TOP_MARGIN) / CELL_HEIGHT) + 1; // the mth row(note)
    let mouseup_cell_column = Math.floor((end_pageX - body_x - LEFT_MARGIN) / CELL_WIDTH) + 1;  // the nth column(time) when mouseup
    let mousedown_cell = document.getElementById(mousedown_cell_column.toString()+"_"+mousedown_cell_row.toString()); // the cell when mousedown
    
    /* new sound length */
    let new_sound_width = (mouseup_cell_column - mousedown_cell_column + 1) * CELL_WIDTH;
    //console.log(holded_cell_column, holded_cell_row);
    
    if(new_sound_width>0){  // whether sound length valid

        /* record sound */
        SOUND_LIST.push([mousedown_cell_row, mousedown_cell_column, mouseup_cell_column]);
        
        /* new sound position */
        let new_sound_x = mousedown_cell.style.left;
        let new_sound_y = mousedown_cell.style.top;
        // console.log("("+mousedown_cell_column.toString()+","+mousedown_cell_row.toString()+")", mouseup_cell_column, new_sound_width);
        
        /* create sound */
        createSoundDiv(new_sound_x, new_sound_y, new_sound_width);

    }
}



/*************************************************************************************************** */
/** Main */

(
    function main(){
        let beats = parseInt(document.querySelector("#measures").innerHTML); // how any measure
        console.log("This is measures" + measures.toString());

        /* make grid */
        MakeGrid(beats);

        // add new sound
        ClickAndHold.apply(document.body, NewSoundDiv);
    }
)();

