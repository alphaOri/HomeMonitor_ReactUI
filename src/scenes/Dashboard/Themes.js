import { createMuiTheme }  from '@material-ui/core/styles'

var style = window.getComputedStyle(document.querySelector("html")); 

export const myTheme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 700,
  },
  palette: {
    primary: {
      light: style.getPropertyValue('--primary-light').trim(),
      main: style.getPropertyValue('--primary-main').trim(),
      dark: style.getPropertyValue('--primary-dark').trim(),
      //contrastText: '#fff',
    },
    secondary: {
      light: style.getPropertyValue('--secondary-light').trim(),
      main: style.getPropertyValue('--secondary-main').trim(),
      dark: style.getPropertyValue('--secondary-dark').trim(),
      //contrastText: '#000',
    },
  },
  overrides: {
  	MuiBackdrop: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: style.getPropertyValue('--background-main').trim(),
      },
    },
    MuiPickersToolbarText: {
      toolbarTxt: {
        fontSize: 40,
        fontWeight: 500,
      }
    },
    MuiPickersToolbarButton: {
      toolbarBtn: {
        width: 66,
        height: 66,
        margin: "4px 0",
      }
    },
    MuiPickersTimePickerToolbar: {
      separator: {
        margin: "0 4px 11px 2px", 
      },
      ampmSelection: {
        height: 88,
      }
    },
    MuiPickersClock: {
      clock: {
        backgroundColor: style.getPropertyValue('--background-light').trim()
      },
      pin: {
        backgroundColor: style.getPropertyValue('--secondary-main').trim()
      }
    },
    MuiPickersClockNumber: {
      clockNumber: {
        color: style.getPropertyValue('--text-main').trim()
      }
    },
    MuiPickersClockPointer: {
      pointer: {
        backgroundColor: style.getPropertyValue('--secondary-main').trim(),
        height: "42% !important",
      },
      thumb: {
        borderColor: style.getPropertyValue('--secondary-main').trim(),
        height: 15,
        width: 15,
        top: "-21px",
        left: "-20px",
      },
      noPoint: {
        backgroundColor: style.getPropertyValue('--secondary-main').trim()
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: style.getPropertyValue('--background-dark').trim(),
      }
    },
    MuiButton: {
      root: {
        minWidth: 66,
        backgroundColor: style.getPropertyValue('--secondary-main').trim(),
        '&:hover': {
          backgroundColor: style.getPropertyValue('--secondary-main').trim(),
        },
        height: 66,
        color: style.getPropertyValue('--secondary-main').trim(),
      },
      // Name of the rule
      textPrimary: {
        '&:hover': {
          backgroundColor: style.getPropertyValue('--secondary-main').trim(),
        },
        // Some CSS
        //borderRadius: 4,
        //border: 0,
        color: style.getPropertyValue('--text-main').trim(),
        //textTransform: "lowercase",
        fontSize: 20,
        fontWeight: 500,
        //padding: '0 30px',
      }
    }
  }
});