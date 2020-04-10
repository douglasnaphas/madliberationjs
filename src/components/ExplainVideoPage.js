import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';
import { Button } from '@material-ui/core';
import { madLiberationStyles } from '../madLiberationStyles';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import StageDirection from './StageDirection';

const styles = () => {
  return {
    bordered: {
      paddingRight: '20px',
      paddingLeft: '20px',
      paddingTop: '10px',
      paddingBottom: '10px',
    },
  };
};

class ExplainVideoPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div madliberationid="explain-page">
        <MenuAppBar />
        <div>
          <br />
          <div className={classes.bordered}>
            <Typography variant="h1" component="h2" gutterBottom>
              Order! Order! Order!
            </Typography>
            <Typography component="p" paragraph>
              Dear leader (of this virtual seder), follow these instructions to
              bring order to your remote seder.
            </Typography>

            <Typography variant="h2" component="h2" gutterBottom>
              Prepare to put the virtual room in order
            </Typography>
            <Typography component="p" paragraph>
              Find a means to create an ordered list that will be used to
              determine who reads and when. This can be by pen/paper, a google
              doc, a henna design on your chest, etc. To make things easier,
              list the name of each participant before you move on to the next
              step.
            </Typography>

            <Typography variant="h2" component="h2" gutterBottom>
              Call the virtual room to attention so you can explain what is
              about to happen.
            </Typography>
            <Typography component="p" paragraph>
              <StageDirection>Say</StageDirection>: Happy Passover! We are about
              to play a game called Mad Liberation, which is like a seder but
              fun, so I am going to explain how to play. Before I proceed, make
              sure you have access to either your smartphone or a web browser on
              your computer if you do not have a phone. Please let me know if
              you do NOT have a device ready at this time.
            </Typography>
            <Typography component="p" paragraph>
              <StageDirection>
                Pause until everyone has confirmed with their silence.
              </StageDirection>
            </Typography>
            <Typography variant="h2" component="h2" gutterBottom>
              Explain the concept
            </Typography>
            <Typography component="p" paragraph>
              <StageDirection>Say</StageDirection>: Together, we’re going to
              create a fill-in-the-blank Haggadah by answering prompts on our
              phones or computers with words or phrases. We’ll then take turns
              reading our one-of-a-kind creation from our very own screens based
              on the order I am about to jot down. When I say go, we are going
              to number off. For whomever the breeze tickles first, you will
              say, “1.” The next person so motivated will say, “2,” then, “3,”
              and so on until we all have said a single number. I will write
              down the order but you should know who goes before you and who
              goes after. If multiple people try to claim the same number, I
              will judge who deserves it most. Any questions?
            </Typography>
            <Typography component="p" paragraph>
              <StageDirection>
                Pause for questions. Once all are answered, move on.
              </StageDirection>
            </Typography>
            <Typography>
              <StageDirection>Say</StageDirection>: Ok, go.
            </Typography>
            <Typography variant="h2" component="h2" gutterBottom>
              Generate the order of readers
            </Typography>
            <Typography component="p" paragraph>
              As your virtual party numbers off, note the order in your list.
              Once the numbering has been complete, read the ordered list to the
              group.
            </Typography>
            <Typography variant="h2" component="h2" gutterBottom>
              Provide further instructions
            </Typography>
            <Typography component="p" paragraph>
              <StageDirection>Say</StageDirection>: On your phone or computer,
              type <span style={madLiberationStyles.blue}>passover.lol</span> in
              a web browser. When you’re there, click “Join a Seder.” If you
              aren't able to join the seder on your device, try using a
              different browser. Go ahead, I’ll wait.
            </Typography>
            <Typography component="p" paragraph>
              <StageDirection>
                Pause and confirm that everyone has complied in whatever way you
                like.
              </StageDirection>
            </Typography>
            <Typography component="p" paragraph>
              <StageDirection>Say</StageDirection>: I’ll give you the Room Code
              to enter the seder in a few moments. For now, keep listening to me
              talk. When you get your prompts, pay attention to how you phrase
              your answers. There will be examples to guide you, so our Haggadah
              doesn't wind up with something like, "Moses woke up the next day
              feeling extremely happiness." Make sure you fill in and click
              through all of your prompts, then hit "Submit” when you’re done.
              After we've all submitted, click "Yes, I want the script.” Then,
              we read our collective creation in the order we just set! The app
              will tell us when it’s time to “pass” to the next reader. Any
              questions?
            </Typography>
            <Typography component="p" paragraph>
              <StageDirection>
                Pause for questions. Once all are answered, move on.
              </StageDirection>
            </Typography>
            <Typography variant="h2" component="h2" gutterBottom>
              Provide additional clarity
            </Typography>
            <Typography component="p" paragraph>
              <StageDirection>Say</StageDirection>: One more thing: this app is
              in gamma mode, which means it's still being tested out and
              improved. Keep this in mind: Once you've joined the seder, don't
              close the tab or go to any other web sites in the tab in which you
              have the game open. If you click Log In on the Home Page before
              you join our seder, and you accidentally close your tab, you can
              probably re-join by logging in again and clicking{' '}
              <b>See your seders</b>, but that feature is experimental.
            </Typography>
            <Typography component="p" paragraph>
              If you encounter any problems, try using a different browser or
              device.
            </Typography>
            <Typography component="p" paragraph>
              <StageDirection>Say</StageDirection>: If everyone is ready to
              celebrate Passover, I'm going to click "Proceed" to generate our
              Room Code and let the Mad Liberation begin!
            </Typography>
          </div>
          <div>
            <Button
              madliberationid="proceed-from-explanation-button"
              variant="contained"
              color="primary"
              component={Link}
              to="/pick-script"
            >
              Proceed
            </Button>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ExplainVideoPage);
