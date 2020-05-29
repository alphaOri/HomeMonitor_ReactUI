import React, { Component } from 'react'
import './dashboard.css'
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//import { myTheme } from "./ThemeMaterialUI.js"
//imports for TimePicker
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";

//sandbox for these selectors can be found at https://codesandbox.io/s/m-ui-selectpicker-formatting-l8zp3?file=/demo.js:4993-5765

const selectItemHeight = 66;
const selectMenuHeight = selectItemHeight * 3;

const useSimpleSelectStyles = makeStyles(theme => ({
  formControl: {
    margin: 0,
    minWidth: 66,
  },
  paper: {
    WebkitMaskImage:
      "-webkit-linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1),rgba(0,0,0,1), rgba(0,0,0,0))",
    backgroundColor: "var(--button-highlight-color) !important",
    maxHeight: selectMenuHeight,
    width: "66px !important",
  },
  list: {
    padding: "0px !important",
    width: "auto !important",
  },
  selectMenu: {
    //arrangement
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //button appearance
    backgroundColor: "var(--button-color) !important",
    height: 66,
    padding: "0px 13px !important",
    borderRadius: "4px !important",
    //font stuff
    fontSize: 24,
    fontWeight: 700,
    color: "var(--card-text-highlight-color)",
  },
  selectDisabled: {
    backgroundColor: "var(--text-background-highlight-dark) !important",
  },
  menuItemRoot: {
    height: selectItemHeight,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //font stuff
    fontSize: 24,
    fontWeight: 700,
    color: "var(--card-text-highlight-color)",
  }
}));

//required props: disabled, values, offset
//optional props: units, selectorId, initValue
export function SimpleSelect(props) {
  const classes = useSimpleSelectStyles();
  //const [value, setValue] = React.useState("");
  //const [initValue, setInitValue] = useState(props.initValue);

  /*const handleChange = (event, selectorId) => {
    props.handleSelect(selectorId, event.target.value)
    //setValue(event.target.value);
  };*/

  //this is working.  However, parent props are still valid after first render so initValue is sent again... but even when its sent, this still works because somehow <Select> class already handles the value as a default value.
  /*var initValue = null;
  if(props.initValue) {
    initValue = props.initValue-props.offset;
  }*/

  return (
    <div>
        <FormControl classes={{ root: classes.formControl }} disabled={props.disabled}>
          <Select classes={{select: classes.selectMenu, disabled: classes.selectDisabled}} onChange={event  => {props.handleSelect(event.target.value, props.buttonId)}} 
            MenuProps={{style: {height: selectMenuHeight}, classes: {list: classes.list, paper: classes.paper}}} defaultValue={props.initValue} disableUnderline>
            <MenuItem value="" disabled />
            {props.values.map((item, index) => (
              <MenuItem classes={{root: classes.menuItemRoot}} value={item}> {item}{props.units} </MenuItem>
            ))}
            <MenuItem value="" disabled />
          </Select>
        </FormControl>
    </div>
    
  );
}

const pickerStyles = makeStyles(theme => ({
  formControl: {
    margin: 0,
    backgroundColor: "var(--secondary-main)",
    borderRadius: 4,
    height: 66,
    width: 120,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  disabled : {
    backgroundColor: "var(--secondary-dark)",
    color: "#FFFFFF"
  },
  inputBase: {
    //appearance
    borderRadius: 4,
    height: 66,
    width: 120,
    //font stuff
    fontSize: 24,
    fontWeight: 700,
    color: "var(--text-main)"
  },
  input: {
    textAlign: "center",
    textTransform: "lowercase"
  },
  paper: {
    //backgroundColor: "var(--background-light)",
  }
}));

//required props: disabled, values, offset
//optional props: units, selectorId, initValue
export function SimpleTimePicker(props) {
  const classes = pickerStyles();
  const [date, setDate] = React.useState(props.initValue);

  const handleChange = (date) => {
    setDate(date);
    props.handleSelect(date, props.buttonId)
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker
        classes={{
          root: classes.formControl,
        }}
        InputProps={{
          disableUnderline: true,
          classes: {
            root: classes.inputBase,
            input: classes.input,
            disabled: classes.disabled
          }
        }}
        DialogProps={{
          PaperProps: {
            classes: {
              root: classes.paper
            }
          }
        }}
        disabled={props.disabled}
        variant="dialog"
        minutesStep={5}
        margin="normal"
        value={date}
        onChange={handleChange}
      />
    </MuiPickersUtilsProvider>
    
  );
}