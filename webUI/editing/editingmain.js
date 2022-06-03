
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
const BEAT_MORE = 7;
const BAR_MORE = 10;

const LINE_LENGTH = CELL_HEIGHT*88+2*LINE_MORE;
const BEAT_LENGTH = CELL_HEIGHT*88+2*BEAT_MORE;
const BAR_LENGTH = CELL_HEIGHT*88+2*BAR_MORE;

const LINE_TOP = TOP_MARGIN-LINE_MORE;
const BEAT_TOP = TOP_MARGIN-BEAT_MORE;
const BAR_TOPP = TOP_MARGIN-BAR_MORE;

const LINE_COLOR = "white";
const BEAT_COLOR = "yellow";
const BAR_COLOR = "red";


/* souond param */
const SOUND_COLOR = "magenta";
const SOUND_BORDER = "1px solid peachpuff";
const SOUND_BORDER_LR = "2px solid seagreen";


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

        /* run _onHoldStart when event: mousedown, touchstart */
        ["mousedown", "touchstart"].forEach(type =>{
            this.target.addEventListener(type, this._onHoldStart.bind(this));
        });

        /* run _onHoldEnd when event: mouseup, touchend, touchcancel */
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


/* explore information given position */

class PointAt {

    /**
     * 
     * @param {Number} pageX pageX
     * @param {Number} pageY pageY
     */

    constructor(pageX, pageY) {
        this.pageX = pageX;
        this.pageY = pageY;
        this.cell_column = null;
        this.cell_row = null;
        this.is_sound = null;
        this.current_sound = null;
        this.previous_sound = null;
        this.next_sound = null;
    }

    /* set up */
    set_up(){
        [this.cell_column, this.cell_row] = PageXYtoCellColumnRow(this.pageX, this.pageY);

        /* no sound in that note */
        if(table[this.cell_row-1].length == 0){
            this.is_sound = false;
            this.current_sound = null;
            this.previous_sound = null;
            this.next_sound = null;
            return ;
        }

        const upperBound_result = upperBound(table[this.cell_row-1], this.cell_column); 

        this.is_sound = table[this.cell_row-1][upperBound_result-1] === undefined ? false : this.cell_column <= table[this.cell_row-1][upperBound_result-1][1]


        if(this.is_sound){      /* sound */
            
            /* current */
            this.current_sound = {
                note: this.cell_row,
                start: table[this.cell_row-1][upperBound_result-1][0],
                end: table[this.cell_row-1][upperBound_result-1][1],
                index: upperBound_result-1
            };

            /* previous */
            if(table[this.cell_row-1][upperBound_result-2] !== undefined){
                this.previous_sound = {
                    note: this.cell_row,
                    start: table[this.cell_row-1][upperBound_result-2][0],
                    end: table[this.cell_row-1][upperBound_result-2][1],
                    index: upperBound_result-2
                };
            }

        } else {        /* no sound */
            
            /* current */
            this.current_sound = null

            /* previous */
            if(table[this.cell_row-1][upperBound_result-1] !== undefined){
                this.previous_sound = {
                    note: this.cell_row,
                    start: table[this.cell_row-1][upperBound_result-1][0],
                    end: table[this.cell_row-1][upperBound_result-1][1],
                    index: upperBound_result-1
                };
            }   
        }
        
        /* next */
        if(table[this.cell_row-1][upperBound_result] !== undefined){
            this.next_sound = {
                note: this.cell_row,
                start: table[this.cell_row-1][upperBound_result][0],
                end: table[this.cell_row-1][upperBound_result][1],
                index: upperBound_result+1
            };
        }

        // console.log("new: ", this.cell_column, "  pre: ", this.previous_sound.start, this.previous_sound.end);

        console.log(
            `
            this.pageX = ${this.pageX}
            this.pageY = ${this.pageY}
            this.cell_column = ${this.cell_column}
            this.cell_row = ${this.cell_row}
            this.is_sound = ${this.is_sound}
            this.current_sound = ${JSON.stringify(this.current_sound)}
            this.previous_sound = ${JSON.stringify(this.previous_sound)}
            this.next_sound = ${JSON.stringify(this.next_sound)}
            `
        )
        return;

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
    new_div.addEventListener("mouseover", (e) => {     // change color when cell being hover
        e.target.style.backgroundColor = CELL_HOVER_COLOR;
    })

    new_div.addEventListener("mouseout", (e) => {     // change back color when cell not being hover
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
    if((x-1)%BEAT_DIVITION == 0){   // one beat
        new_line.style.height = BEAT_LENGTH.toString()+"px";
        new_line.style.backgroundColor = BEAT_COLOR;
        new_line.style.top = BEAT_TOP.toString()+"px";
    }

    if((x-1)%(BEAT_DIVITION*TIME_SIGNATURE_NUMERATOR) == 0){    // one measure
        new_line.style.height = BAR_LENGTH.toString()+"px";
        new_line.style.backgroundColor = BAR_COLOR;
        new_line.style.top = BAR_TOPP.toString()+"px";
    }

    /* append to body */
    if(scroll == null){
        console.log("scroll is null");
    }else{
        document.querySelector("body").appendChild(new_line);
    }
}


/* Create sound */
const CreateSoundDiv = (note, start, end) =>{

    /* calculate which cell is on when mousedown, mouseup */
    const id = start.toString()+"_"+note.toString();
    const mousedown_cell = document.getElementById(id); // the cell when mousedown
    console.log(id)
    
    /* new sound length */
    let width = (end - start + 1) * CELL_WIDTH;

    /* new sound position */
    let x = mousedown_cell.style.left;
    let y = mousedown_cell.style.top;

    /* create element */
    let new_sound = document.createElement("div")

    /* identity information */
    new_sound.id = note.toString()+"_" + start.toString() + "_" + end.toString();

    /* style */
    new_sound.style.backgroundColor = SOUND_COLOR;
    new_sound.style.width = width.toString()+"px";
    new_sound.style.height = CELL_HEIGHT.toString()+"px";
    new_sound.style.zIndex = "3";
    new_sound.setAttribute("draggable", false);
    new_sound.style.border = SOUND_BORDER;
    new_sound.style.borderLeft = SOUND_BORDER_LR;
    new_sound.style.borderRight = SOUND_BORDER_LR;


    /* position */
    new_sound.style.position = "absolute";
    new_sound.style.left = x;
    new_sound.style.top = y;
    

    // append to body
    console.log("("+x+","+y+")", "width:", width);
    document.body.appendChild(new_sound);

}


/* Draw new sound */
const AddNewSoundDiv = (note, start, end, bound_above, bound_below) =>{

    if(start <= end){
        // bound
        end = end < bound_above ? end : bound_above-1;    
    } else {
        // bound
        end = end > bound_below ? end : bound_below+1;  
        // switch
        const temp = start;
        start = end;
        end = temp;
    }
    
    /* create sound */
    CreateSoundDiv(note, start, end);
    
    /* add new sound to lookup table */
    LookupTableInsert(note, start, end);

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
    // console.log("cell_column = Math.floor((", pageX," - ",body_x," - ", LEFT_MARGIN,"), / ", CELL_WIDTH, ") + 1 = ", cell_column);
    // console.log("cell_row = Math.floor((", pageY," - ",body_y," - ", TOP_MARGIN,"), / ", CELL_HEIGHT, ") + 1 = ", cell_row);
    return [cell_column, cell_row];
}


/* select which action to take */
const Act = (start_pageX, start_pageY, end_pageX, end_pageY) => {

    /* get which cell is on when mouseup */
    let [mouseup_cell_column, mouseup_cell_row] = PageXYtoCellColumnRow(end_pageX, end_pageY);
    
    
    /* get mousedown info */
    const mousedown_point_at = new PointAt(start_pageX, start_pageY);
    mousedown_point_at.set_up();


    console.log("start: ", mousedown_point_at.cell_column, mousedown_point_at.cell_row,);
    console.log("end: ", mouseup_cell_column, mouseup_cell_row);

    /* bounds changes of sound's length in case crash other sound */
    const bound_above = mousedown_point_at.next_sound === null ? Infinity : mousedown_point_at.next_sound.start
    const bound_below = mousedown_point_at.previous_sound === null ? 0 : mousedown_point_at.previous_sound.end

    console.log("is_sound: ", mousedown_point_at.is_sound, 
                "  bound_above: ", bound_above,
                "  bound_below: ", bound_below
                );

    console.log("_____________________________________________");

    /* add a new sound if not mousedown at sound */
    if(!mousedown_point_at.is_sound){   

        AddNewSoundDiv(mousedown_point_at.cell_row, mousedown_point_at.cell_column, mouseup_cell_column, bound_above , bound_below);

    /* remove a sound if mousedown and mouseup at same cell */
    } else if (mousedown_point_at.cell_column == mouseup_cell_column && mousedown_point_at.cell_row == mouseup_cell_row){

        RemoveSound(mousedown_point_at.current_sound);

    }else {

        /* move head of sound if mousedowm at head and move to elsewhere */
        if (mousedown_point_at.cell_column == mousedown_point_at.current_sound.start) {
            console.log("______HEAD_______");
            ChangeSoundLength( mousedown_point_at.current_sound, "head", mouseup_cell_column, bound_below);
        }

        /* move tail of sound if mousedowm at tail and move to elsewhere */
        if (mousedown_point_at.cell_column == mousedown_point_at.current_sound.end){
            console.log("______TAIL_______");
            ChangeSoundLength( mousedown_point_at.current_sound, "tail", mouseup_cell_column, bound_above);
        }
    }

    console.log("==============================================================");
    console.log(JSON.stringify(table));
    console.log("==============================================================");
    // AddNewSoundDiv(mousedown_cell_column, mousedown_cell_row, mouseup_cell_column);
}


/* change sound length */
const ChangeSoundLength = ( current_sound, mode, end, bound) => {

    const current_sound_div = document.getElementById(current_sound.note+"_"+current_sound.start+"_"+current_sound.end);

    if(mode === "head") {

        /* bounds below by bound_below and above by current sound end */
        const new_start = end > bound ? (end < current_sound.end ? end : current_sound.end) : bound+1;

        /* new width */
        const new_width = ( current_sound.end - new_start + 1) * CELL_WIDTH;

        const end_cell_div = document.getElementById(new_start.toString()+"_"+current_sound.note.toString());

        /* style */
        current_sound_div.style.left = end_cell_div.style.left;
        current_sound_div.style.width = new_width + "px";

        /* identity information */
        current_sound_div.id = current_sound.note.toString() + "_" + new_start.toString() + "_" + current_sound.end.toString();

        /* update lookup table */
        table[current_sound.note-1][current_sound.index][0] = new_start;

        console.log("Change---head: ",current_sound.start, "->", new_start);

    }else if (mode === "tail") {

        /* bounds above by bound_above and below by current sound start */
        const new_end = end < bound ? (end > current_sound.start ? end : current_sound.start) : bound-1;

        /* new width */
        const new_width = ( new_end - current_sound.start + 1) * CELL_WIDTH;
        
        /* style */
        current_sound_div.style.width = new_width + "px";

        /* identity information */
        current_sound_div.id = current_sound.note.toString() + "_" + current_sound.start.toString() + "_" + new_end.toString();

        /* update lookup table */
        table[current_sound.note-1][current_sound.index][1] = new_end;

        console.log("Change---tail: ",current_sound.end, "->", new_end);
    }
}


/* remove sound */
const RemoveSound = (current_sound) => {
    const current_sound_div = document.getElementById(current_sound.note+"_"+current_sound.start+"_"+current_sound.end);
    current_sound_div.remove();
    table[current_sound.note-1][current_sound.index].splice(current_sound.index, 1)
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


/* insert note to lookup table */
const LookupTableInsert = (note, start, end) => {
    // console.log(note, n1, n2);
    table[note-1].push([start, end])
    table[note-1].sort(function(a, b){return a[0] - b[0]});
}


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
            CreateSoundDiv(...sound);

            /* put sound list to lookup array */
            LookupTableInsert(...sound);
        }
        console.log(table[1]);
        console.log(table[10]);
        

        // add new sound
        ClickAndHold.apply(document.body, Act);
    }
)();





/*************************************************************************************************** */
/*  &---REFERENCE---&  &---depatch---&
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

/* whether the cell has occupied by sound 
// return [ Boolen, upperBound result ]
const isSound = (cell_row, cell_column) => { 

    if(table[cell_row-1].length == 0) return [false, 0]; // no sound in that note(upperBound return the array length which equal to 0)

    const upperBound_result = upperBound(table[cell_row-1], cell_column); 

    return [ table[cell_row-1][upperBound_result-1] === undefined ? false : cell_column <= table[cell_row-1][upperBound_result-1][1], upperBound_result ]

    // const previous_sound = ;    // find the sound before new sound
    // const next_sound = table[cell_row-1][upperBound_result];    // find the sound after new sound

    // // if (upperBound_result == 0) return [false, 0, next_sound[0]]; // no sound before the new sound(the upperBound index is 0) 
    
    // const previous_sound_info = {
    //     note: cell_row,
    //     start: previous_sound === undefined ? undefined : previous_sound[0],
    //     end: previous_sound === undefined ? undefined : previous_sound[1],
    //     index: previous_sound === undefined ? undefined : upperBound_result-1
    // }

    // console.log("new: ", cell_column, "  pre: ", previous_sound_info.start, previous_sound_info.end);

    // return [ previous_sound === undefined ? false : cell_column < previous_sound[1],   // whether the previous sound ends before the new sound starts
    //          previous_sound_info,  // prevois_sound === table[cell_row-1][-1] === undifined if no sound before the new sound
    //          next_sound === undefined ? Infinity : next_sound[0] ]; // next_sound ===  table[cell_row-1][{the length}] === undifined if on sound after the new sound
}
*/
