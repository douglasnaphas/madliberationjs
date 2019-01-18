import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

// takes in JSON collection of scripts, and a function it will call to set
// its parent's state when a selection is made

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class ScriptTable extends React.Component {
  render() {
    const { scripts } = this.props;
    const scriptRows = [];
    for (let i = 0; i < scripts.length; i++) {
      scriptRows[i] = (
        <TableRow key={`row${i}`}>
          <TableCell key={`row${i}-short_desc`}>
            {scripts[i].haggadah_short_desc.S}
          </TableCell>
          <TableCell key={`row${i}-description`}>
            {scripts[i].haggadah_description.S}
          </TableCell>
        </TableRow>
      );
    }
    return (
      <div>
        <FormControl>
          <Table>
            <TableBody>{scriptRows}</TableBody>
          </Table>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(ScriptTable);
