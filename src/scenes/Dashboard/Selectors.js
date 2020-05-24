import React, { Component } from 'react'
import './dashboard.css'
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const selectItemHeight = 66;
const selectMenuHeight = selectItemHeight * 3;

const useSimpleSelectStyles = makeStyles(theme => ({
  formControl: {
    margin: 0,
    width: 66,
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
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
    padding: "0px !important",
    borderRadius: "4px !important",
    //font stuff
    fontSize: 24,
    fontWeight: 700,
    color: "var(--card-text-highlight-color)",
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
      <FormControl className={classes.formControl} disabled={props.disabled}>
        <Select classes={{select: classes.selectMenu}} onChange={event  => {props.handleSelect(event.target.value+props.offset, props.selectorId)}} 
          MenuProps={{style: {height: selectMenuHeight}, classes: {list: classes.list, paper: classes.paper}}} defaultValue={props.initValue-props.offset} >
          <MenuItem value="" disabled />
          {props.values.map((item, index) => (
            <MenuItem classes={{root: classes.menuItemRoot}} value={index}> {index+props.offset}{props.units} </MenuItem>
          ))}
          <MenuItem value="" disabled />
        </Select>
      </FormControl>
    </div>
  );
}