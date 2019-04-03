import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';

// takes in JSON collection of scripts, and a function it will call to set
// its parent's state when a selection is made

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class ScriptTable extends React.Component {
  state = {
    selectedValue: '0',
    selectedScript:
      (this.props.scripts && this.props.scripts.length) > 0
        ? this.props.scripts[0]
        : {}
  };
  handleChange = event => {
    this.setState({
      selectedValue: event.target.value,
      selectedScript: this.props.scripts[event.target.value]
    });
  };
  render() {
    const { classes, scripts, setChosenPath } = this.props;
    const scriptRows = [];
    for (let i = 0; i < scripts.length; i++) {
      scriptRows[i] = (
        <TableRow key={`row${i}`}>
          <TableCell key={`row${i}-select`}>
            <Radio
              key={`row${i}-radio`}
              checked={this.state.selectedValue === `${i}`}
              onChange={this.handleChange}
              value={`${i}`}
            />
          </TableCell>
          <TableCell key={`row${i}-short_desc`}>
            {scripts[i].haggadah_short_desc}
          </TableCell>
          <TableCell key={`row${i}-description`}>
            {scripts[i].haggadah_description}
          </TableCell>
        </TableRow>
      );
    }
    const pickButton =
      scripts.length > 0 ? (
        <div>
          <br />
          <Button
            madliberationid="pick-this-script-button"
            title="Use this one"
            variant="contained"
            className={classes.button}
            component={Link}
            onClick={e => {
              setChosenPath(this.state.selectedScript.path);
            }}
            to={{
              pathname: '/generating-room-code'
            }}
          >
            Use this one
          </Button>
        </div>
      ) : (
        ''
      );
    return (
      <div>
        <div>
          <Table>
            <TableBody>{scriptRows}</TableBody>
          </Table>
        </div>
        {pickButton}
      </div>
    );
  }
}

export default withStyles(styles)(ScriptTable);
