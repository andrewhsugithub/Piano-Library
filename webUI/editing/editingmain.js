
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
const CELL_BORDER = "1px solid rgb(97, 51, 247)";


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

const LINE_COLOR = "white";
const BAR_COLOR = "yellow";
const MEASURE_COLOR = "red";


/* souond param */
const SOUND_COLOR = "magenta";
const SOUND_BORDER = "1px solid peachpuff";


/* [note, start, end] */
let SOUND_LIST = [[2, 10, 20], [6, 15, 19]] // from midi

/* lookup table */
let table = new Array(88).fill(0).map(() => new Array(0));
 

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

        ["mouseup", "touchend", "touchcancel"].forEach(type =>{
            this.target.addEventListener(type, this._onHoldEnd.bind(this));
        });
    }

    _onHoldStart(e){
        this.isHold = true;
        console.log("event:   ", e);

        // console.log(e.pageX, e.pageY);
        this.start_pageX = e.pageX;
        this.start_pageY = e.pageY;

    }
    
    _onHoldEnd(e){
        this.isHold = false;
        console.log("event:   ", e);

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

    CreateNewLine(i); // draw vertical lines
    for(let j=1;j<=88;j++){

        CreateNewCell(i, j); // create cells
        // console.log(i.toString()+"_"+j.toString())
        }
    }
}
    

/* Create cells */
function CreateNewCell(x, y){

    let new_div = document.createElement("div");    // create div

    /* identity information */
    new_div.id = x.toString()+"_"+y.toString();     // id: x_y
    new_div.classList.add('cell');      // add class
    
    /* style */
    new_div.style.width = CELL_WIDTH.toString()+"px";       // width
    new_div.style.height = CELL_HEIGHT.toString()+"px";     // height
    new_div.style.backgroundColor = CELL_NOHOVER_COLOR;     // color
    new_div.style.boxSizing = "border-box";     // flip border inside 
    new_div.style.borderTop = CELL_BORDER;      // border on the top
    new_div.style.borderBottom = CELL_BORDER;   // border on the bottom
    new_div.style.zIndex = "1";      
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
function CreateNewLine(x){

    let new_line = document.createElement("div");       // create div

    /* identity information */
    new_line.classList.add('line');

    /* style */
    new_line.style.backgroundColor = LINE_COLOR; 
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
        new_line.style.backgroundColor = BAR_COLOR;
        new_line.style.top = BAR_TOP.toString()+"px";
    }

    if(x%(BEAT_DIVITION*TIME_SIGNATURE_NUMERATOR) == 0){    // one measure
        new_line.style.height = MEASURE_LENGTH.toString()+"px";
        new_line.style.backgroundColor = MEASURE_COLOR;
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
const CreateSoundDiv = (x, y, width) =>{

    let new_sound = document.createElement("div")

    /* style */
    new_sound.style.backgroundColor = SOUND_COLOR;
    new_sound.style.width = width.toString()+"px";
    new_sound.style.height = CELL_HEIGHT.toString()+"px";
    new_sound.style.zIndex = "3";
    new_sound.setAttribute("draggable", false);

    /* position */
    new_sound.style.position = "absolute";
    new_sound.style.left = x;
    new_sound.style.top = y;
    new_sound.style.border = SOUND_BORDER;

    // append to body
    console.log("("+x+","+y+")", "width:", width);
    document.body.appendChild(new_sound);

}


/* Draw new sound */
const NewSoundDiv = (mousedown_cell_column, mousedown_cell_row, mouseup_cell_column) =>{

    /* calculate which cell is on when mousedown, mouseup */
    let id = mousedown_cell_column.toString()+"_"+mousedown_cell_row.toString();
    let mousedown_cell = document.getElementById(id); // the cell when mousedown
    console.log(id)
    
    /* new sound length */
    let new_sound_width = (mouseup_cell_column - mousedown_cell_column + 1) * CELL_WIDTH;
    //console.log(holded_cell_column, holded_cell_row);
    
    if(new_sound_width>0){  // whether sound length valid

        /* record sound */
        SOUND_LIST.push([mousedown_cell_row, mousedown_cell_column, mouseup_cell_column]);
        console.log(SOUND_LIST);
        /* new sound position */
        let new_sound_x = mousedown_cell.style.left;
        let new_sound_y = mousedown_cell.style.top;
        // mousedown_cell.style.backgroundColor = "yellowgreen";
        // console.log("("+mousedown_cell_column.toString()+","+mousedown_cell_row.toString()+")", mouseup_cell_column, new_sound_width);
        
        /* create sound */
        CreateSoundDiv(new_sound_x, new_sound_y, new_sound_width);
        
        /* add new sound to lookup table */
        LookupTableInsert(mousedown_cell_row, mousedown_cell_column, mouseup_cell_column);

    }
}


/* [note, start, end] to [x, y, width] */
const DecodeSoundRecordtoPosition = (note, start, end) =>{
    let head_cell = document.getElementById(start.toString()+"_"+note.toString()); // the cell when at the head
    let x = head_cell.style.left;
    let y = head_cell.style.top;
    let width = (end - start + 1)*CELL_WIDTH;
    // console.log(x, y, width);
    return [x, y, width];
}


/* calculate which cell given position */
const PageXYtoCellColumnRow = (pageX, pageY) =>{
    let body_x = document.body.getBoundingClientRect().x;   // body x
    let body_y = document.body.getBoundingClientRect().y;   // body y
    let cell_column = Math.floor((pageX - 0 - LEFT_MARGIN) / CELL_WIDTH) + 1;  // the nth column(time) when mousedown
    let cell_row = Math.floor((pageY - 0 - TOP_MARGIN) / CELL_HEIGHT) + 1; // the mth row(note)
    console.log("cell_column = Math.floor((", pageX," - ",body_x," - ", LEFT_MARGIN,"), / ", CELL_WIDTH, ") + 1 = ", cell_column);
    console.log("cell_row = Math.floor((", pageY," - ",body_y," - ", TOP_MARGIN,"), / ", CELL_HEIGHT, ") + 1 = ", cell_row);
    return [cell_column, cell_row];
}


/* select which action to take */
const WhichAction = (start_pageX, start_pageY, end_pageX, end_pageY) => {

    let [mousedown_cell_column, mousedown_cell_row] = PageXYtoCellColumnRow(start_pageX, start_pageY);
    let [mouseup_cell_column, mouseup_cell_row] = PageXYtoCellColumnRow(end_pageX, end_pageY);
    console.log("start: ", mousedown_cell_column, mousedown_cell_row);
    console.log("end: ", mouseup_cell_column, mouseup_cell_row);
    // console.log(lowerBound(table[mousedown_cell_row-1], mousedown_cell_column));
    let [is_sound, next_start] = isSound(mousedown_cell_row, mousedown_cell_column);
    console.log("is_sound: ", is_sound, "  next_start: ", next_start);
    if(!is_sound){
        console.log("_____________________________________________");
        NewSoundDiv(mousedown_cell_column, mousedown_cell_row, mouseup_cell_column < next_start ? mouseup_cell_column : next_start-1);
    }
    // NewSoundDiv(mousedown_cell_column, mousedown_cell_row, mouseup_cell_column);
}


/* insert note to lookup table */
const LookupTableInsert = (note, start, end) => {
    // console.log(note, n1, n2);
    table[note-1].push([start, end])
    table[note-1].sort(function(a, b){return a[0] - b[0]});
}


/* whether the cell has occupied by sound */
const isSound = (cell_row, cell_column) => { 

    if(table[cell_row-1].length == 0) return [false, Infinity]; // no sound in that note(upperBound return the array length which equal to 0)

    let upperBound_result = upperBound(table[cell_row-1], cell_column); 
    
    let previous_sound = table[cell_row-1][upperBound_result-1];    // find the sound before new sound
    let next_sound = table[cell_row-1][upperBound_result];      // find the sound after new sound

    if (upperBound_result == 0) return [false, next_sound[0]]; // no sound before the new sound(the upperBound index is 0) 

    console.log("new: ", cell_column, "  pre: ", previous_sound[0], previous_sound[1]);
    // if (upperBound_result == table[cell_row-1].length) return 
    return [cell_column < previous_sound[1], next_sound === undefined ? Infinity : next_sound[0]]; // whether the previous sound ends before the new sound starts
}


/* costume binary search */
// about the list of list to compare about the first element of inside list
const CostumeBinarySearch = (array, pred) => {
    let low = -1, hight = array.length;
    while (1 + low < hight) {
        const middle = low + ((hight - low) >> 1);
        if (pred(array[middle][0])){
            hight = middle;
        } else {
            low = middle;
        }
    }
    return hight;
}

/* upperbound */
const upperBound = (array, item) => {
    return CostumeBinarySearch(array, j => item < j);
}


/* 
  &---REFERENCE---&
/** 
 * https://stackoverflow.com/questions/22697936/binary-search-in-javascript
 * 
 * Return 0 <= i <= array.length such that !pred(array[i - 1]) && pred(array[i]).
 *
 * 
 function binarySearch(array, pred) {
    let lo = -1, hi = array.length;
    while (1 + lo < hi) {
        const mi = lo + ((hi - lo) >> 1);
        if (pred(array[mi])) {
            hi = mi;
        } else {
            lo = mi;
        }
    }
    return hi;
}

/**
 * Return i such that array[i - 1] < item <= array[i].
 *
function lowerBound(array, item) { 
    if(array.length == 0){
        console.log("zero");
        return 0;
    }
    return binarySearch(array, j => item <= j);
}

/**
 * Return i such that array[i - 1] <= item < array[i].
 *
function upperBound(array, item) {
    return binarySearch(array, j => item < j);
}
*/



/*************************************************************************************************** */
/** Main */

(
    function main(){
        let beats = parseInt(document.querySelector("#measures").innerHTML); // how any measure
        console.log("This is measures" + measures.toString());

        
        /* make grid */
        MakeGrid(beats);

        /* put sound on */
        for( const sound of SOUND_LIST){
            CreateSoundDiv(...DecodeSoundRecordtoPosition(...sound));

            /* put sound list to lookup array */
            LookupTableInsert(sound[0], sound[1], sound[2]);
        }
        console.log(table[1]);
        console.log(table[10]);
        

        // add new sound
        ClickAndHold.apply(document.body, WhichAction);
    }
)();

