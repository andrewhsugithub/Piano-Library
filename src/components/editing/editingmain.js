﻿/* midi */
var midi = null;

/* Control */
var MODE = "EDIT_MODE";

/* time para*/
var BEAT_DIVITION = 4;
var BEATS_PER_MEASURE = 4;

/* margin param */
const TOP_MARGIN = 450;
const LEFT_MARGIN = 300;

/* cell param */
const CELL_HEIGHT = 25;
const CELL_WIDTH = 50;
// const CELL_NOHOVER_COLOR = "rgb(0, 0, 25)";
// const CELL_HOVER_COLOR = "aquamarine";
// const CELL_BORDER = "1px solid rgb(97, 51, 247)";
const H_LINE_COLOR = "rgb(97, 51, 247)";
const CELL_COLOR = "rgba(255, 255, 230, 1)";
const BACK_COLOR = "rgba(200, 150, 150, 1)";

/* line param */
const LINE_MORE = 10;
const BEAT_MORE = 30;
const BAR_MORE = 60;

const LINE_LENGTH = CELL_HEIGHT * 88 + 2 * LINE_MORE;
const BEAT_LENGTH = CELL_HEIGHT * 88 + 2 * BEAT_MORE;
const BAR_LENGTH = CELL_HEIGHT * 88 + 2 * BAR_MORE;

const LINE_TOP = TOP_MARGIN - LINE_MORE;
const BEAT_TOP = TOP_MARGIN - BEAT_MORE;
const BAR_TOP = TOP_MARGIN - BAR_MORE;

const LINE_COLOR = "rgb(150, 150, 150)"; // "white";
const BEAT_COLOR = "rgb(0, 0, 50)"; // "rgb(255, 255, 200)";
const BAR_COLOR = "rgb(200, 15, 15)"; // "rgb(255, 200, 200)";

const MEASURE_NUMBER_HEIGHT = 50;
const MEASURE_NUMBER_WIDTH = 75;
const MEASURE_NUMBER_BACKGROUNDCOLOR = "rgba(255, 255, 255, 0.9)";
const MEASURE_NUMBER_FONTCOLOR = "purple";
const MEASURE_NUMBER_FONTSIZE = 30;
const MEASURE_NUMBER_SPACE = 10;
const MEASURE_NUMBER_BORDERRADIUS = "45%";

/* souond param */
// const SOUND_COLOR = "magenta";
// const SOUND_BORDER = "1px solid peachpuff";
// const SOUND_BORDER_LR = "2px solid seagreen";
const SOUND_BORDERRADIUS = "12px";
const SOUND_HEIGHT_GRADIENT_COLOR_DISTANCEFROMBORDER = 3;
const SOUND_HEIGHT_GRADIENT_WHITE_DISTANCEFROMBORDER = 12;
const SOUND_WIDTH_GRADIENT_COLOR_DISTANCEFROMBORDER = 5;
const SOUND_WIDTH_GRADIENT_WHITE_DISTANCEFROMBORDER = 15;
const SOUND_DEFAULT_VELOCITY = 60;

/* tools */
var previous_velocity_input_time = null;

/* lookup table */
// let table = new Array(88).fill(0).map(() => new Array(0));

/*************************************************************************************************** */
/** Example */
const midi_example = {
    measures: 30,
    beats_per_measure: 4,
    beat_divition: 4,
    sounds: [
        [],
        [],
        [
            [10, 40, 70],
            [60, 65, 20],
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
            [30, 40, 90]
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
            [100, 105, 120]
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ],
};

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
        ["mousedown", "touchstart"].forEach((type) => {
            this.target.addEventListener(type, this._onHoldStart.bind(this));
        });

        /* run _onHoldEnd when event: mouseup, touchend, touchcancel */
        ["mouseup", "touchend", "touchcancel"].forEach((type) => {
            this.target.addEventListener(type, this._onHoldEnd.bind(this));
        });
    }

    _onHoldStart(e) {
        if (MODE === "EDIT_MODE") {
            //console.log("event:   ", e.);
            console.log("No shift");
            this.isHold = true;
            // console.log(e.pageX, e.pageY);
            this.start_pageX = e.pageX;
            this.start_pageY = e.pageY;
        }
    }

    _onHoldEnd(e) {
        console.log("event:   ", e);

        // console.log(e.pageX, e.pageY);
        if (
            this.start_pageX != null &&
            this.start_pageY != null &&
            this.isHold &&
            isInPanel(this.start_pageX, this.start_pageY)
        ) {
            this.isHold = false;
            this.callback(this.start_pageX, this.start_pageY, e.pageX, e.pageY);
        }
    }

    /**
     *
     * @param {EventTarget} target The HTML element to apply the event to
     * @param {Function} callback The Function to run once the target is clicked and hold
     */
    static apply(target, callback) {
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
    set_up() {
        [this.cell_column, this.cell_row] = PageXYtoCellColumnRow(
            this.pageX,
            this.pageY
        );

        /* no sound in that note */
        if (midi.sounds[this.cell_row - 1].length == 0) {
            this.is_sound = false;
            this.current_sound = null;
            this.previous_sound = null;
            this.next_sound = null;
            return;
        }

        const upperBound_result = upperBound(
            midi.sounds[this.cell_row - 1],
            this.cell_column
        );

        this.is_sound =
            midi.sounds[this.cell_row - 1][upperBound_result - 1] === undefined ?
            false :
            this.cell_column <=
            midi.sounds[this.cell_row - 1][upperBound_result - 1][1];

        if (this.is_sound) {
            /* sound */

            /* current */
            this.current_sound = {
                note: this.cell_row,
                start: midi.sounds[this.cell_row - 1][upperBound_result - 1][0],
                end: midi.sounds[this.cell_row - 1][upperBound_result - 1][1],
                index: upperBound_result - 1,
            };

            /* previous */
            if (midi.sounds[this.cell_row - 1][upperBound_result - 2] !== undefined) {
                this.previous_sound = {
                    note: this.cell_row,
                    start: midi.sounds[this.cell_row - 1][upperBound_result - 2][0],
                    end: midi.sounds[this.cell_row - 1][upperBound_result - 2][1],
                    index: upperBound_result - 2,
                };
            }
        } else {
            /* no sound */

            /* current */
            this.current_sound = null;

            /* previous */
            if (midi.sounds[this.cell_row - 1][upperBound_result - 1] !== undefined) {
                this.previous_sound = {
                    note: this.cell_row,
                    start: midi.sounds[this.cell_row - 1][upperBound_result - 1][0],
                    end: midi.sounds[this.cell_row - 1][upperBound_result - 1][1],
                    index: upperBound_result - 1,
                };
            }
        }

        /* next */
        if (midi.sounds[this.cell_row - 1][upperBound_result] !== undefined) {
            this.next_sound = {
                note: this.cell_row,
                start: midi.sounds[this.cell_row - 1][upperBound_result][0],
                end: midi.sounds[this.cell_row - 1][upperBound_result][1],
                index: upperBound_result + 1,
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
        );
        return;
    }
}

/*************************************************************************************************** */
/** Function */

/**  Menu **/
/*----------------------------------------------------------------------------------------------------- */

const CreateMenuBar = () => {
    const menu_bar = document.getElementById("menu_bar");

    menu_bar.style.position = "fixed";
    menu_bar.style.top = "0px";
    menu_bar.style.left = "0px";
    menu_bar.style.width = "100%";
    menu_bar.style.height = Math.ceil(window.innerHeight * 0.1).toString() + "px";
    menu_bar.style.backgroundColor = "rgba(110, 100, 120, 0.6)";
    menu_bar.style.border = "0px";
    menu_bar.style.boxShadow = "0px 2px 10px black";
    menu_bar.style.zIndex = "10";
    menu_bar.style.transition = " top 0.3s";

    // document.body.appendChild(menu_bar);

    // SetupLogoAndLogin();
    CreateLogoBox();
    CreatLogInBox();
    CreateSaveButton();
    CreateModeViewer();
    RespondToScroll();
};

const CreateLogoBox = () => {
    const logobox = document.getElementById("logo");

    logobox.style.position = "absolute";
    logobox.style.width = "10%";
    logobox.style.height = "70%";
    logobox.style.top = "15%";
    logobox.style.left = "3%";
    logobox.style.backgroundColor = "transparent";
    logobox.style.border = "none";
    logobox.style.display = "flex";
    logobox.style.justifyContent = "center";
    logobox.style.alignItems = "center";

    logobox.children[0].style.height = "100%";
    logobox.children[0].children[0].style.height = "100%";

    // document.getElementById("menu_bar").appendChild(logobox);
};

const CreateModeViewer = () => {
    const modeviewer = document.getElementById("mode-viewer");

    const mode_p = document.createElement("p");
    modeviewer.style.position = "absolute";
    modeviewer.style.width = "30%";
    modeviewer.style.height = "95%";
    modeviewer.style.top = "2.5%";
    modeviewer.style.left = "30%";
    modeviewer.style.backgroundColor = "chartreuse";
    modeviewer.style.border = "0px";
    modeviewer.style.display = "flex";
    modeviewer.style.justifyContent = "center";
    modeviewer.style.alignItems = "center";

    mode_p.innerHTML = "Edit mode";
    mode_p.style.fontSize =
        Math.ceil(window.innerHeight * 0.06).toString() + "px";
    mode_p.style.fontWeight = "bold";

    modeviewer.appendChild(mode_p);
    // document.getElementById("menu_bar").appendChild(modeviewer);
};

const CreateSaveButton = () => {
    const savebutton = document.getElementById("save_button");
    const button_p = document.createElement("p");

    savebutton.style.position = "absolute";
    savebutton.style.width = "20%";
    savebutton.style.height = "70%";
    savebutton.style.top = "15%";
    savebutton.style.right = "10%";
    savebutton.style.backgroundColor = "goldenrod";
    savebutton.style.border = "3px outset gold";
    savebutton.style.display = "flex";
    savebutton.style.justifyContent = "center";
    savebutton.style.alignItems = "center";
    savebutton.innerHTML = "Save";
    savebutton.style.fontSize =
        Math.ceil(window.innerHeight * 0.05).toString() + "px";

    button_p.innerHTML = "Save";
    button_p.style.fontSize =
        Math.ceil(window.innerHeight * 0.05).toString() + "px";
    button_p.style.fontWeight = "bold";

    // savebutton.appendChild(button_p);

    savebutton.addEventListener("click", (e) => {
        console.log("CLICKED!!!!!");
    });

    // document.getElementById("menu_bar").appendChild(savebutton);
};

const CreatLogInBox = () => {
    const loginbox = document.getElementById("user");

    loginbox.style.position = "absolute";
    loginbox.style.width = "5%";
    loginbox.style.height = "70%";
    loginbox.style.top = "15%";
    loginbox.style.right = "3%";
    loginbox.style.backgroundColor = "transparent";
    loginbox.style.border = "none";
    loginbox.style.display = "flex";
    loginbox.style.justifyContent = "center";
    loginbox.style.alignItems = "center";

    loginbox.children[0].style.height = "100%";
    loginbox.children[0].style.width = "100%";
    loginbox.children[0].children[0].style.height = "100%";
    loginbox.children[0].children[0].style.width = "100%";
    loginbox.children[0].children[0].children[0].style.height = "100%";
    loginbox.children[0].children[0].children[0].style.width = "100%";

    // document.getElementById("menu_bar").appendChild(loginbox)
};

const ModeSwitch = () => {
    document.addEventListener("keydown", (e) => {
        // console.log(e.code);
        if (e.shiftKey && e.code === "KeyV") {
            let mode_div = document.getElementById("mode-viewer");
            let black_mask = document.getElementById("blackmask");
            if (MODE === "EDIT_MODE") {
                MODE = "VELOCITY_MODE";
                mode_div.children[0].innerHTML = "Velocity mode";
                mode_div.style.backgroundColor = "orangered";
                black_mask.style.display = "block";
            } else {
                MODE = "EDIT_MODE";
                mode_div.children[0].innerHTML = "Edit mode";
                mode_div.style.backgroundColor = "chartreuse";
                black_mask.style.display = "none";
            }
        }
    });
};

const RespondToWindowResize = () => {
    const modeviewer = document.getElementById("mode-viewer");
    const menu_bar = document.getElementById("menu_bar");
    const savebutton = document.getElementById("save_button");
    const logo = document.getElementById("logo");
    const user = document.getElementById("user");

    window.addEventListener("resize", (e) => {
        modeviewer.children[0].style.fontSize =
            Math.ceil(window.innerHeight * 0.06).toString() + "px";

        menu_bar.style.height =
            Math.ceil(window.innerHeight * 0.1).toString() + "px";

        savebutton.children[0].style.fontSize =
            Math.ceil(window.innerHeight * 0.05).toString() + "px";

        // logo.style.height = "70%";
        // logo.style.width = "10%";
        // user.style.height = "70%";
        // user.style.width = "5%";

        // logo.children[0].style.height = "100%";
        // logo.children[0].children[0].style.height = "100%";
        // user.children[0].style.height = "70%";
        // user.children[0].style.width = "5%";
    });
};

const RespondToScroll = () => {
    var prevScrollpos = window.pageYOffset;
    const menu_bar = document.getElementById("menu_bar");
    window.addEventListener("scroll", (e) => {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            menu_bar.style.top = "0px";
            // document.getElementById("logo").style.top = Math.ceil(window.innerHeight*(0.015)).toString()+"px";
            // document.getElementById("user").style.top = Math.ceil(window.innerHeight*(0.015)).toString()+"px";
        } else {
            menu_bar.style.top = "-" + menu_bar.style.height;
            // document.getElementById("logo").style.top = "-"+ (Math.ceil(window.innerHeight*(0.015))+Math.ceil(window.innerHeight*(0.07))).toString()+"px";
            // document.getElementById("user").style.top = "-"+ (Math.ceil(window.innerHeight*(0.015))+Math.ceil(window.innerHeight*(0.07))).toString()+"px";
        }
        prevScrollpos = currentScrollPos;
    });
};

const SetupLogoAndLogin = () => {
    let logo = document.getElementById("logo");
    logo.style.position = "fixed";
    logo.style.width = "10%";
    logo.style.height = Math.ceil(window.innerHeight * 0.07).toString() + "px";
    logo.style.top = Math.ceil(window.innerHeight * 0.015).toString() + "px";
    logo.style.left = "3%";
    logo.style.backgroundColor = "transparent";
    logo.style.border = "0px";
    logo.style.display = "flex";
    logo.style.justifyContent = "center";
    logo.style.alignItems = "center";
    logo.style.border = "1px solid black";
    logo.style.zIndex = "15";
    logo.style.transition = " top 0.3s";

    let user = document.getElementById("user");
    user.style.position = "fixed";
    user.style.width = "5%";
    user.style.height = Math.ceil(window.innerHeight * 0.07).toString() + "px";
    user.style.top = Math.ceil(window.innerHeight * 0.015).toString() + "px";
    user.style.right = "3%";
    user.style.backgroundColor = "transparent";
    user.style.border = "0px";
    user.style.display = "flex";
    user.style.justifyContent = "center";
    user.style.alignItems = "center";
    user.style.border = "1px solid black";
    user.style.zIndex = "15";
    user.style.transition = " top 0.3s";
};

/**  Grid **/
/*----------------------------------------------------------------------------------------------------- */

/* container for grid */
const CreateGridContainer = (measures) => {
    const gridcontainer = document.getElementById("grid-container");

    /* style */
    gridcontainer.style.backgroud = "transparent";
    gridcontainer.style.width =
        (measures * BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH).toString() +
        "px";
    gridcontainer.style.height = "100%";
    gridcontainer.setAttribute("draggable", false);
    // gridcontainer.style.border = "10px dashed yellow";

    /* position */
    gridcontainer.style.position = "absolute";
    gridcontainer.style.left = LEFT_MARGIN.toString() + "px";
    gridcontainer.style.top = "0px";
    gridcontainer.style.zIndex = "0";

    // document.getElementById("editer-container").appendChild(gridcontainer);
};

/* Make grid */
const DrawGrid = (measures) => {
    /* draw panel */
    DrawPanel(measures);

    /* draw vertical lines */
    for (let i = 1; i <= midi.measures * BEAT_DIVITION * BEATS_PER_MEASURE; i++)
        DrawVerticalLine(i);

    /* draw horizontal lines */
    for (let j = 1; j <= 89; j++) DrawHorizontalLine(j, midi.measures);

    // CreateNewCell(i, j); // create cells
    // console.log(i.toString()+"_"+j.toString())
};

const DrawPanel = (measures) => {
    let panel = document.createElement("div");

    /* identity information */
    panel.id = "panel"; // add class

    /* style */
    panel.style.backgroundColor = CELL_COLOR;
    panel.style.width =
        (measures * BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH).toString() +
        "px";
    panel.style.height = (CELL_HEIGHT * 88).toString() + "px";
    panel.setAttribute("draggable", false);

    /* position */
    panel.style.position = "absolute";
    panel.style.left = "0px";
    panel.style.top = TOP_MARGIN.toString() + "px";
    panel.style.zIndex = "1";

    /* prevent drag */
    panel.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });

    /* appnd to editer-container */
    document.getElementById("grid-container").appendChild(panel);
};

const DrawHorizontalLine = (y, measures) => {
    let H_line = document.createElement("div"); // create div

    /* identity information */
    H_line.classList.add("H-line"); // add class

    /* style */
    H_line.style.backgroundColor = H_LINE_COLOR;
    H_line.style.width =
        (measures * BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH).toString() +
        "px";
    H_line.style.height = "2px";
    H_line.setAttribute("draggable", false);

    /* position */
    H_line.style.position = "absolute";
    H_line.style.left = "0px";
    H_line.style.top = ((y - 1) * CELL_HEIGHT + TOP_MARGIN).toString() + "px";
    H_line.style.zIndex = "2";

    /* prevent drag */
    H_line.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });

    /* appnd to editer-container */
    document.getElementById("grid-container").appendChild(H_line);
};

/* Draw Line */
const DrawVerticalLine = (x) => {
    let V_line = document.createElement("div"); // create div

    /* identity information */
    V_line.classList.add("line");

    /* style */
    V_line.style.backgroundColor = LINE_COLOR;
    V_line.style.width = "2px";
    V_line.style.height = LINE_LENGTH.toString() + "px";
    V_line.setAttribute("draggable", false);

    /* position */
    let left = (x - 1) * CELL_WIDTH - 1;
    let top = TOP_MARGIN;
    V_line.style.position = "absolute";
    V_line.style.left = left.toString() + "px";
    V_line.style.top = top.toString() + "px";
    V_line.style.zIndex = "3";

    /* distinct beat and measure */
    if ((x - 1) % BEAT_DIVITION == 0) {
        // one beat
        V_line.style.height = BEAT_LENGTH.toString() + "px";
        V_line.style.backgroundColor = BEAT_COLOR;
        V_line.style.top = BEAT_TOP.toString() + "px";
    }

    if ((x - 1) % (BEAT_DIVITION * BEATS_PER_MEASURE) == 0) {
        // one measure
        V_line.style.height = BAR_LENGTH.toString() + "px";
        V_line.style.backgroundColor = BAR_COLOR;
        V_line.style.top = BAR_TOP.toString() + "px";
        V_line.style.left = (left - 1).toString() + "px";
        V_line.style.width = "4px";

        const measure_number = document.createElement("div");

        const p_number = document.createElement("p");
        p_number.innerHTML = (
            (x - 1) / (BEAT_DIVITION * BEATS_PER_MEASURE) +
            1
        ).toString();
        p_number.style.color = MEASURE_NUMBER_FONTCOLOR;
        p_number.style.fontSize = MEASURE_NUMBER_FONTSIZE.toString() + "px";
        p_number.style.position = "relative";
        p_number.style.bottom = "45%";
        p_number.style.textAlign = "center";
        p_number.style.fontWeight = "bold";

        measure_number.style.width = MEASURE_NUMBER_WIDTH.toString() + "px";
        measure_number.style.height = MEASURE_NUMBER_HEIGHT.toString() + "px";
        measure_number.style.display = "block";
        measure_number.style.position = "absolute";
        measure_number.style.top =
            (-(MEASURE_NUMBER_HEIGHT + MEASURE_NUMBER_SPACE)).toString() + "px";
        measure_number.style.left = (-(MEASURE_NUMBER_WIDTH / 2)).toString() + "px";
        measure_number.style.backgroundColor = MEASURE_NUMBER_BACKGROUNDCOLOR;
        measure_number.style.borderRadius = MEASURE_NUMBER_BORDERRADIUS;
        measure_number.style.zIndex = "4";

        measure_number.appendChild(p_number);
        V_line.appendChild(measure_number);
    }

    /* prevent drag */
    V_line.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });

    /* append to editer-container */
    document.getElementById("grid-container").appendChild(V_line);
};

const createAddNewMeasureButton = () => {
    const editercontainer = document.getElementById("editer-container");
    const gridcontainer = document.getElementById("grid-container");
    const panel = document.getElementById("panel");
    const h_line = document.getElementsByClassName("H-line");

    const current_width = parseInt(gridcontainer.style.width, 10);
    const current_measure = midi.measures;

    editercontainer.style.width =
        (
            current_width +
            BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH +
            300
        ).toString() + "px";
    gridcontainer.style.width =
        (
            current_width +
            BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH
        ).toString() + "px";
    panel.style.width =
        (
            current_width +
            BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH
        ).toString() + "px";

    for (const hl of h_line) {
        hl.style.width =
            (
                current_width +
                BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH
            ).toString() + "px";
    }

    for (
        let i = current_measure * BEAT_DIVITION * BEATS_PER_MEASURE + 1; i <= (current_measure + 1) * BEAT_DIVITION * BEATS_PER_MEASURE; i++
    ) {
        DrawVerticalLine(i);
    }

    const addnewmeasure_button_mask = document.createElement("div");

    addnewmeasure_button_mask.id = "addnewmeasure-button";
    addnewmeasure_button_mask.style.width =
        (BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH).toString() + "px";
    addnewmeasure_button_mask.style.height =
        (
            BAR_LENGTH +
            (MEASURE_NUMBER_HEIGHT * 0.5 + MEASURE_NUMBER_SPACE) * 2
        ).toString() + "px";
    addnewmeasure_button_mask.setAttribute("draggable", false);

    addnewmeasure_button_mask.style.position = "absolute";
    addnewmeasure_button_mask.style.left = current_width.toString() + "px";
    addnewmeasure_button_mask.style.top =
        (
            BAR_TOP -
            (MEASURE_NUMBER_HEIGHT * 0.5 + MEASURE_NUMBER_SPACE)
        ).toString() + "px";
    addnewmeasure_button_mask.style.zIndex = "15";

    let transparent_cellcolor = toTransparentColorRagb(BACK_COLOR);
    addnewmeasure_button_mask.style.background = `linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 1) 75%)`;
    addnewmeasure_button_mask.border = "0px";
    // addnewmeasure_button_mask.style.backgroundColor = "black";

    addnewmeasure_button_mask.style.display = "flex";
    addnewmeasure_button_mask.style.justifyContent = "center";
    addnewmeasure_button_mask.style.alignItems = "center";

    const addnewmeasure_button = document.createElement("div");
    addnewmeasure_button.style.width = "100px";
    addnewmeasure_button.style.height = "100px";

    addnewmeasure_button.style.background = `
        radial-gradient(circle at center, transparent 45%, white 45%),
        linear-gradient(to right, transparent 45%, black 45%, black 55%, transparent 55%),
        linear-gradient(to bottom, transparent 45%, black 45%, black 55%, transparent 55%),
        rgba(255, 255, 255, 0.9)
    `;
    addnewmeasure_button.style.border = "1px solid #c1c1c1";
    addnewmeasure_button.style.borderRadius = "50%";
    addnewmeasure_button.style.cursor = "pointer";
    addnewmeasure_button.setAttribute("draggable", false);
    addnewmeasure_button_mask.appendChild(addnewmeasure_button);
    gridcontainer.appendChild(addnewmeasure_button_mask);

    /* prevent drag */
    addnewmeasure_button_mask.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });
    addnewmeasure_button.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });

    addnewmeasure_button.addEventListener("click", (e) => {
        AddNewMeasure();
    });
};

const AddNewMeasure = () => {
    const editercontainer = document.getElementById("editer-container");
    const soundscontainer = document.getElementById("sounds-container");
    const gridcontainer = document.getElementById("grid-container");
    const panel = document.getElementById("panel");
    const h_line = document.getElementsByClassName("H-line");
    const addnewmeasure_button = document.getElementById("addnewmeasure-button");
    const black_mask = document.getElementById("blackmask");

    const current_width = parseInt(gridcontainer.style.width, 10);
    const current_measure = midi.measures;

    editercontainer.style.width =
        (
            current_width +
            BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH +
            300
        ).toString() + "px";
    soundscontainer.style.width =
        (
            current_width +
            BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH
        ).toString() + "px";
    black_mask.style.width =
        (
            current_width +
            BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH +
            300
        ).toString() + "px";
    gridcontainer.style.width =
        (
            current_width +
            BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH
        ).toString() + "px";
    panel.style.width =
        (
            current_width +
            BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH
        ).toString() + "px";

    for (const hl of h_line) {
        hl.style.width =
            (
                current_width +
                BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH
            ).toString() + "px";
    }

    for (
        let i = (current_measure + 1) * BEAT_DIVITION * BEATS_PER_MEASURE + 1; i <= (current_measure + 2) * BEAT_DIVITION * BEATS_PER_MEASURE; i++
    ) {
        DrawVerticalLine(i);
    }

    addnewmeasure_button.style.left = current_width.toString() + "px";
    midi.measures += 1;
};

/**  Sound **/
/*----------------------------------------------------------------------------------------------------- */

/* container for sounds */
const CreateSoundsContainer = (measures) => {
    const soundscontainer = document.getElementById("sounds-container");

    /* style */
    soundscontainer.style.backgroud = "transparent";
    soundscontainer.style.width =
        (measures * BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH).toString() +
        "px";
    soundscontainer.style.height = (CELL_HEIGHT * 88).toString() + "px";
    soundscontainer.setAttribute("draggable", false);
    // soundscontainer.style.border = "5px solid green";

    /* position */
    soundscontainer.style.position = "absolute";
    soundscontainer.style.left = LEFT_MARGIN.toString() + "px";
    soundscontainer.style.top = TOP_MARGIN.toString() + "px";
    soundscontainer.style.zIndex = "5";

    // document.getElementById("editer-container").appendChild(soundscontainer);
};

/* Create sound */
const CreateSoundDiv = (note, start, end, velocity = 60) => {
    /* new sound length */
    let width = (end - start + 1) * CELL_WIDTH;

    /* create element */
    let new_sound = document.createElement("div");

    /* identity information */
    new_sound.id =
        note.toString() + "_" + start.toString() + "_" + end.toString();
    new_sound.classList.add("sound");

    const soundrgb = CalculateColor(velocity).map((x) => x.toString());
    console.log(`rgb:  ${soundrgb[0]}, ${soundrgb[1]}, ${soundrgb[2]}`);

    /* style */
    // new_sound.style.backgroundColor = `rgb(${soundrgb[0]}, ${soundrgb[1]}, ${soundrgb[2]})`;
    new_sound.style.background = SquareGradientColor(
        `rgba(${soundrgb[0]}, ${soundrgb[1]}, ${soundrgb[2]}, 1)`,
        `rgba(255, 255, 255, 0.9)`
    );
    new_sound.style.width = width.toString() + "px";
    new_sound.style.height = CELL_HEIGHT.toString() + "px";
    new_sound.style.zIndex = "6";
    new_sound.draggable = false;
    new_sound.style.border =
        "1px solid " + `rgb(${soundrgb[0]}, ${soundrgb[1]}, ${soundrgb[2]})`;
    // new_sound.style.borderLeft = SOUND_BORDER_LR;
    // new_sound.style.borderRight = SOUND_BORDER_LR;
    new_sound.style.borderRadius = SOUND_BORDERRADIUS;

    /* position */
    new_sound.style.position = "absolute";
    new_sound.style.left = ((start - 1) * CELL_WIDTH).toString() + "px";
    new_sound.style.top = ((note - 1) * CELL_HEIGHT).toString() + "px";

    /* extra data */
    new_sound.dataset.lookuptable_index = null;

    /* velocity toolbox */
    let velocity_toolbox = document.createElement("div");
    velocity_toolbox.style.display = "none";
    velocity_toolbox.style.position = "absolute";
    velocity_toolbox.style.bottom = "100%";
    velocity_toolbox.style.left = "20px";
    velocity_toolbox.style.margin = "0px";
    velocity_toolbox.style.padding = "0px";
    velocity_toolbox.style.backgroundColor = "#e5e5e5";
    velocity_toolbox.style.boxShadow = "0px 5px 10px 0px rgba(0,0,0,0.2)";
    velocity_toolbox.style.zIndex = "7";
    velocity_toolbox.style.width = (CELL_WIDTH * 10).toString() + "px";
    velocity_toolbox.style.height = (CELL_HEIGHT * 0.75).toString() + "px";
    velocity_toolbox.style.border = "0px"; //"1px solid darkgoldenrod";
    velocity_toolbox.style.borderRadius = "5px";

    /* range bar */
    let range_bar = document.createElement("input");
    range_bar.type = "range";
    range_bar.min = "0";
    range_bar.max = "127";
    range_bar.value = "60";
    range_bar.step = "1";
    range_bar.style.width = "95%";
    range_bar.style.height = "100%";
    range_bar.style.left = "2%";
    range_bar.style.borderRadius = "5px";

    /* number_box */
    let number_box = document.createElement("div");
    number_box.style.display = "inline-block";
    number_box.style.position = "absolute";
    number_box.style.bottom = "0px";
    number_box.style.left = "-20px";
    number_box.style.widows = "30px";
    number_box.style.height = "100%";
    number_box.style.margin = "0px";
    number_box.style.padding = "0px";
    number_box.innerHTML = "60";
    number_box.style.zIndex = "7";
    number_box.style.backgroundColor = "#e6e6e6";
    number_box.style.textAlign = "center";
    number_box.style.borderRadius = "10%";

    velocity_toolbox.appendChild(number_box);
    velocity_toolbox.appendChild(range_bar);
    new_sound.appendChild(velocity_toolbox);

    new_sound.addEventListener("mouseover", (e) => {
        if (MODE === "VELOCITY_MODE") {
            velocity_toolbox.style.display = "block";

            // let node_start_end = new_sound.id.split("_").map(x => parseInt(x));
            // console.log("NOTE:  ",node_start_end);
            let index = upperBound(midi.sounds[note - 1], start) - 1;
            new_sound.dataset.lookuptable_index = index.toString();
            console.log("INDEX:  ", new_sound.dataset.lookuptable_index);
        }
    });

    new_sound.addEventListener("mouseout", (e) => {
        setTimeout(() => {
            if (previous_velocity_input_time === null) {
                velocity_toolbox.style.display = "none";
            }
        }, 3600);

        console.log(JSON.stringify(midi.sounds[note - 1]));
    });

    range_bar.addEventListener("input", (e) => {
        let velocity = range_bar.value;
        number_box.innerHTML = velocity;
        let [red, green, blue] = CalculateColor(parseInt(velocity)).map((x) =>
            x.toString()
        );
        new_sound.style.border = "1px solid " + `rgb(${red}, ${green}, ${blue})`;
        new_sound.style.background = SquareGradientColor(
            `rgba(${red}, ${green}, ${blue}, 0.9)`,
            `rgba(255, 255, 255, 0.9)`
        );

        number_box.style.Color = `rgb(${red}, ${green}, ${blue})`;

        if (previous_velocity_input_time != null) {
            clearTimeout(previous_velocity_input_time);
        }
        previous_velocity_input_time = setTimeout(() => {
            previous_velocity_input_time = null;
            velocity_toolbox.style.display = "none";
        }, 3600);

        midi.sounds[note - 1][new_sound.dataset.lookuptable_index][2] =
            parseInt(velocity);
    });

    /* prevent drag */
    new_sound.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });

    // range_bar.addEventListener("mouseout", (e) => {

    //     console.log(JSON.stringify(midi.sounds[note-1]));

    // })

    // append to editer-container
    // console.log("("+x+","+y+")", "width:", width);
    document.getElementById("sounds-container").appendChild(new_sound);
};

/* Draw new sound */
const AddNewSoundDiv = (note, start, end, bound_above, bound_below) => {
    if (start <= end) {
        // bound
        end = end < bound_above ? end : bound_above - 1;
    } else {
        // bound
        end = end > bound_below ? end : bound_below + 1;
        // switch
        const temp = start;
        start = end;
        end = temp;
    }

    /* create sound */
    CreateSoundDiv(note, start, end);

    /* add new sound to lookup table */
    InsertNewSound(note, start, end, SOUND_DEFAULT_VELOCITY);
};

/* change sound length */
const ChangeSoundLength = (current_sound, mode, end, bound) => {
    const current_sound_div = document.getElementById(
        current_sound.note + "_" + current_sound.start + "_" + current_sound.end
    );
    console.log("end CHANGE:", end);
    const color = CalculateColor(
        midi.sounds[current_sound.note - 1][current_sound.index][2]
    );

    if (mode === "head") {
        /* bounds below by bound_below and above by current sound end */
        const new_start =
            end > bound ?
            end < current_sound.end ?
            end :
            current_sound.end :
            bound + 1;

        /* new width */
        const new_width = (current_sound.end - new_start + 1) * CELL_WIDTH;

        // const end_cell_div = document.getElementById(new_start.toString()+"_"+current_sound.note.toString());

        /* style */
        current_sound_div.style.left =
            ((new_start - 1) * CELL_WIDTH).toString() + "px";
        current_sound_div.style.width = new_width + "px";
        current_sound_div.style.background = SquareGradientColor(
            `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`,
            `rgba(255, 255, 255, 0.9)`
        );

        /* identity information */
        current_sound_div.id =
            current_sound.note.toString() +
            "_" +
            new_start.toString() +
            "_" +
            current_sound.end.toString();

        /* update midi.sound */
        midi.sounds[current_sound.note - 1][current_sound.index][0] = new_start;

        console.log("Change---head: ", current_sound.start, "->", new_start);
    } else if (mode === "tail") {
        /* bounds above by bound_above and below by current sound start */
        const new_end =
            end < bound ?
            end > current_sound.start ?
            end :
            current_sound.start :
            bound - 1;

        /* new width */
        const new_width = (new_end - current_sound.start + 1) * CELL_WIDTH;

        /* style */
        current_sound_div.style.width = new_width + "px";
        current_sound_div.style.background = SquareGradientColor(
            `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`,
            `rgba(255, 255, 255, 0.9)`
        );

        /* identity information */
        current_sound_div.id =
            current_sound.note.toString() +
            "_" +
            current_sound.start.toString() +
            "_" +
            new_end.toString();

        /* update midi.sounds */
        midi.sounds[current_sound.note - 1][current_sound.index][1] = new_end;

        console.log("Change---tail: ", current_sound.end, "->", new_end);
    }
};

/* remove sound */
const RemoveSound = (current_sound) => {
    const current_sound_div = document.getElementById(
        current_sound.note + "_" + current_sound.start + "_" + current_sound.end
    );
    current_sound_div.remove();
    midi.sounds[current_sound.note - 1].splice(current_sound.index, 1);
};

/**  Action **/
/*----------------------------------------------------------------------------------------------------- */

/* select which action to take */
const Act = (start_pageX, start_pageY, end_pageX, end_pageY) => {
    /* get which cell is on when mouseup */
    let [mouseup_cell_column, mouseup_cell_row] = PageXYtoCellColumnRow(
        end_pageX,
        end_pageY
    );

    /* get mousedown info */
    let mousedown_point_at = new PointAt(start_pageX, start_pageY);
    mousedown_point_at.set_up();

    console.log(
        "start: ",
        mousedown_point_at.cell_column,
        mousedown_point_at.cell_row
    );
    console.log("end: ", mouseup_cell_column, mouseup_cell_row);

    /* bounds changes of sound's length in case crash other sound */
    const bound_above =
        mousedown_point_at.next_sound === null ?
        Infinity :
        mousedown_point_at.next_sound.start;
    const bound_below =
        mousedown_point_at.previous_sound === null ?
        0 :
        mousedown_point_at.previous_sound.end;

    console.log(
        "is_sound: ",
        mousedown_point_at.is_sound,
        "  bound_above: ",
        bound_above,
        "  bound_below: ",
        bound_below
    );

    console.log("_____________________________________________");

    /* add a new sound if not mousedown at sound */
    if (!mousedown_point_at.is_sound) {
        AddNewSoundDiv(
            mousedown_point_at.cell_row,
            mousedown_point_at.cell_column,
            mouseup_cell_column,
            bound_above,
            bound_below
        );

        /* remove a sound if mousedown and mouseup at same cell */
    } else if (
        mousedown_point_at.cell_column == mouseup_cell_column &&
        mousedown_point_at.cell_row == mouseup_cell_row
    ) {
        RemoveSound(mousedown_point_at.current_sound);
    } else {
        if (
            mousedown_point_at.current_sound.start ==
            mousedown_point_at.current_sound.end
        ) {
            if (mouseup_cell_column < mousedown_point_at.cell_column) {
                console.log("______HEAD_______1");
                ChangeSoundLength(
                    mousedown_point_at.current_sound,
                    "head",
                    mouseup_cell_column,
                    bound_below
                );
            } else {
                console.log("______TAIL_______1");
                ChangeSoundLength(
                    mousedown_point_at.current_sound,
                    "tail",
                    mouseup_cell_column,
                    bound_above
                );
            }
        } else {
            /* move head of sound if mousedowm at head and move to elsewhere */
            if (
                mousedown_point_at.cell_column == mousedown_point_at.current_sound.start
            ) {
                console.log("______HEAD_______");
                ChangeSoundLength(
                    mousedown_point_at.current_sound,
                    "head",
                    mouseup_cell_column,
                    bound_below
                );
            }

            /* move tail of sound if mousedowm at tail and move to elsewhere */
            if (
                mousedown_point_at.cell_column == mousedown_point_at.current_sound.end
            ) {
                console.log("______TAIL_______");
                ChangeSoundLength(
                    mousedown_point_at.current_sound,
                    "tail",
                    mouseup_cell_column,
                    bound_above
                );
            }
        }
    }
    /* let garbage collection */
    mousedown_point_at = null;

    console.log("==============================================================");
    console.log(JSON.stringify(midi.sounds));
    console.log("==============================================================");
    // AddNewSoundDiv(mousedown_cell_column, mousedown_cell_row, mouseup_cell_column);
};

/**  Tools **/
/*----------------------------------------------------------------------------------------------------- */

/* calculate which cell given position */
const PageXYtoCellColumnRow = (pageX, pageY) => {
    let editercontainerX_relateto_body =
        document.getElementById("editer-container").getBoundingClientRect().left -
        document.body.getBoundingClientRect().left; // editer-container x
    let editercontainerY_relateto_body =
        document.getElementById("editer-container").getBoundingClientRect().top -
        document.body.getBoundingClientRect().top; // editer-container y
    let cell_column =
        Math.floor(
            (pageX - editercontainerX_relateto_body - LEFT_MARGIN) / CELL_WIDTH
        ) + 1; // the nth column(time) when mousedown
    let cell_row =
        Math.floor(
            (pageY - editercontainerY_relateto_body - TOP_MARGIN) / CELL_HEIGHT
        ) + 1; // the mth row(note)
    // console.log("cell_column = Math.floor((", pageX," - ",editercontainer_x," - ", LEFT_MARGIN,"), / ", CELL_WIDTH, ") + 1 = ", cell_column);
    // console.log("cell_row = Math.floor((", pageY," - ",editercontainer_y," - ", TOP_MARGIN,"), / ", CELL_HEIGHT, ") + 1 = ", cell_row);
    return [cell_column, cell_row];
};

/* check wheter xy out of panel */
const isInPanel = (pageX, pageY) => {
    const editercontainerX_relateto_body =
        document.getElementById("editer-container").getBoundingClientRect().left -
        document.body.getBoundingClientRect().left; // editer-container x
    const editercontainerY_relateto_body =
        document.getElementById("editer-container").getBoundingClientRect().top -
        document.body.getBoundingClientRect().top;
    const x_relate = pageX - editercontainerX_relateto_body - LEFT_MARGIN;
    const y_relate = pageY - editercontainerY_relateto_body - TOP_MARGIN;
    // console.log(x_relate, y_relate);
    if (
        x_relate > 0 &&
        x_relate < midi.measures * BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH &&
        y_relate > 0 &&
        y_relate < CELL_HEIGHT * 88
    ) {
        return true;
    }
    console.log("outside");
    return false;
};

/* costume binary search */
// about the list of list to compare about the first element of inside list
const CostumeBinarySearch = (array, pred) => {
    let low = -1,
        hight = array.length;
    while (1 + low < hight) {
        const middle = low + ((hight - low) >> 1);
        if (pred(array[middle][0])) {
            hight = middle;
        } else {
            low = middle;
        }
    }
    return hight;
};

/* upperbound */
const upperBound = (array, item) => {
    return CostumeBinarySearch(array, (j) => item < j);
};

/* insert note to midi.sounds */
const InsertNewSound = (note, start, end, velocity) => {
    // console.log(note, n1, n2);
    midi.sounds[note - 1].push([start, end, velocity]);
    midi.sounds[note - 1].sort(function(a, b) {
        return a[0] - b[0];
    });
};

/* calculate color */
const CalculateColor = (velocity) => {
    let red =
        velocity >= 64 ?
        Math.ceil(-(255 / 63.5 ** 2) * (velocity - 127) ** 2) + 255 :
        0;
    let green =
        velocity >= 64 ?
        Math.ceil((255 / 63.5 ** 2) * (velocity - 127) ** 2) :
        Math.ceil((255 / 63.5 ** 2) * velocity ** 2);
    let blue =
        velocity <= 63 ? Math.ceil(-(255 / 63.5 ** 2) * velocity ** 2) + 255 : 0;
    return [red, green, blue];
};

const SquareGradientColor = (rgba_outside, rgba_inside, color_hint) => {
    const transparentcolor = toTransparentColorRagb(rgba_outside);

    return `
    linear-gradient(to top, ${rgba_outside} ${SOUND_HEIGHT_GRADIENT_COLOR_DISTANCEFROMBORDER}px,
                            ${transparentcolor} ${SOUND_HEIGHT_GRADIENT_WHITE_DISTANCEFROMBORDER}px),
    linear-gradient(to bottom, ${rgba_outside} ${SOUND_HEIGHT_GRADIENT_COLOR_DISTANCEFROMBORDER}px,
                            ${transparentcolor} ${SOUND_HEIGHT_GRADIENT_WHITE_DISTANCEFROMBORDER}px),
    linear-gradient(to right, ${rgba_outside} ${SOUND_WIDTH_GRADIENT_COLOR_DISTANCEFROMBORDER}px, 
                            ${transparentcolor} ${SOUND_WIDTH_GRADIENT_WHITE_DISTANCEFROMBORDER}px),
    linear-gradient(to left, ${rgba_outside} ${SOUND_WIDTH_GRADIENT_COLOR_DISTANCEFROMBORDER}px, 
                            ${transparentcolor} ${SOUND_WIDTH_GRADIENT_WHITE_DISTANCEFROMBORDER}px),
    ${rgba_inside}
    `;
};

const toTransparentColorRagb = (rgba) => {
    return rgba.replace(/(\d+)(?!.*\d)/i, "0");
};

const PlacePiano = () => {
    let piano = document.getElementById("piano");

    piano.style.height = (CELL_HEIGHT * 88).toString() + "px";
    piano.style.width = "250px";
    piano.style.margin = "0px";
    piano.style.padding = "0px";

    piano.style.position = "relative";
    piano.style.left = "50px";
    piano.style.top = TOP_MARGIN.toString() + "px";
    piano.style.boxShadow = "-2px 1px 5px black";
    // piano.style.border = "5px solid red";
};

const LoadMidiJSONtoObject = () => {
    try {
        const MIDIDATASTRING = document.getElementById("midi_input").value;
        // console.log(MIDIDATASTRING);
        midi = JSON.parse(MIDIDATASTRING).MidiData[0];
        console.log(midi);
    } catch (err) {
        console.log(err);
    }
};

const updateMidi = () => {
    document.getElementById("midi_input").value = JSON.stringify({
        MidiData: [midi],
    });
};

/*************************************************************************************************** */
/** Main */

const main = () => {
    /* load json */
    LoadMidiJSONtoObject();

    let black_mask = document.getElementById("blackmask");
    black_mask.style.width =
        (
            2 * LEFT_MARGIN +
            midi.measures * BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH
        ).toString() + "px";
    black_mask.style.height =
        (2 * TOP_MARGIN + CELL_HEIGHT * 88).toString() + "px";

    document.getElementById("editer-container").style.width =
        (
            2 * LEFT_MARGIN +
            midi.measures * BEAT_DIVITION * BEATS_PER_MEASURE * CELL_WIDTH
        ).toString() + "px";

    /* menu bar */
    CreateMenuBar();

    /* mode veiwer */
    ModeSwitch();

    /* mode veiwer resize */
    // modeviewer_resize();

    /* piano */
    PlacePiano();

    /* create container */
    CreateGridContainer(midi.measures);
    CreateSoundsContainer(midi.measures);

    /* draw grid */
    DrawGrid(midi.measures);

    /* responsive */
    RespondToWindowResize();

    createAddNewMeasureButton();

    /* put sound on */
    midi.sounds.forEach((note, i) => {
        console.log(note, i);
        if (note.length != 0) {
            note.forEach((sound) => {
                console.log([i + 1, ...sound]);
                CreateSoundDiv(i + 1, ...sound);
            });
        }
    });
    // console.log(midi.sounds[1]);
    // console.log(table[10]);

    // add new sound
    ClickAndHold.apply(document.body, Act);
};

window.addEventListener("load", (e) => {
    main();
});
//updateMidi();