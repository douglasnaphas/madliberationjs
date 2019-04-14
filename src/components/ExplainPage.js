import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { madLiberationStyles } from '../madLiberationStyles';
import { Configs } from '../Configs';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Tooltip from '@material-ui/core/Tooltip';
import StageDirection from './StageDirection';

const styles = theme => {
  return {};
};

class ExplainPage extends Component {
  render() {
    const {} = this.props;

    return (
      <div madliberationid="explain-page">
        <MenuAppBar />
        <div>
          <br />
          <div>
            <Typography component="p" paragraph>
              <StageDirection text="Read this aloud to everyone at your seder to explain what's about to happen" />
            </Typography>
            <Typography component="p" paragraph>
              Everyone please listen to me.
            </Typography>
            <Typography component="p" paragraph>
              We are about to play a game called Mad Liberation, so I am going
              to explain how to play.
            </Typography>
            <Typography component="p" paragraph>
              We are all going to get prompts on our phones asking us to enter
              words or phrases. The answers we give will be inserted into our
              Haggadah, which we'll read from one device, which we'll pass
              around as we take turns reading.
            </Typography>
            <Typography component="p" paragraph>
              First, I am going to push a few buttons on my phone to get a "Room
              Code". This "Room Code" is so that all of us here in the same
              "room" can work on the same Haggadah.
            </Typography>
            <Typography component="p" paragraph>
              I'll tell all of you the Room Code once I get it.
            </Typography>
            <Typography component="p" paragraph>
              After I tell you the Room Code, you'll get out your devices and
              each go to{' '}
              <span style={madLiberationStyles.blue}>passover.lol</span> in a
              browser, and click "Join a Seder." There will be a place for you
              to enter the code.
            </Typography>
            <Typography component="p" paragraph>
              Meanwhile, I'll get a list of everyone who has joined, so I can
              make sure everyone is in. Once I confirm that everyone's in, I'll
              give you the word, and you'll click the only button your screen,
              and I'll click the only button on my screen, and we'll all get our
              fill-in-the-blank assignments.
            </Typography>
            <Typography component="p" paragraph>
              Each of these assignments will explain what to do. For example, a
              prompt might be, "Enter a word or phrase to replace: 'animal',"
              and I could enter "black bear." Or it might say something like,
              "Enter a word or phrase to replace: 'professional'," and I could
              put in, "zoo architect." There will be examples, and even examples
              showing what part of speech the answer shdould be, so our Haggadah
              doesn't wind up with something like, "Moses woke up the next day
              feeling extremely{' '}
              <Tooltip title="emotion">
                <span style={madLiberationStyles.lightGrayBackround}>
                  happiness
                </span>
              </Tooltip>
              ."
            </Typography>
            <Typography component="p" paragraph>
              We'll each click through all of our prompts, filling in all of our
              blanks, then we'll each click "Submit."
            </Typography>
            <Typography component="p" paragraph>
              After we've all submitted, we'll need to nominate one person to
              use their device to display the Haggadah with all its blanks
              filled in. That person will click "Yes, I want the script" after
              they've finished, and they'll get a list showing whether everyone
              else has submitted. Once everyone's submitted their answers, they
              can get the populated Haggadah to their device. Then we'll pass
              that device around the table reading the Haggadah out loud.
            </Typography>
            <Typography component="p" paragraph>
              So let's right now figure out who this special person will be.
            </Typography>
            <Typography component="p" paragraph>
              <StageDirection text="Nominate someone." />
            </Typography>
            <Typography component="p" paragraph>
              As we read the script, we'll see people's answers to prompts
              inserted into the text in gray boxes like{' '}
              <Tooltip title='a word that rhymes with "quiss"'>
                <span style={madLiberationStyles.lightGrayBackround}>this</span>
              </Tooltip>
              . We can press down and hold on top of the gray box for like two
              seconds to see what the prompt was.
            </Typography>
            <Typography component="p" paragraph>
              The app will tell us when to pass to the next reader, and we'll
              press a button to display the next page each time we do so. It
              will even tell us when we need to pass back and forth to the
              youngest person here. That's pretty much it: we just keep on
              pressing, passing, and reading, until the end!
            </Typography>
            <Typography component="p" paragraph>
              Keep in mind that this app is in beta mode, which means it's still
              being tested out, by us, to work out any bugs. So keep the
              follwing things in mind:
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <ChevronRight />
                </ListItemIcon>
                <ListItemText>
                  <Typography>
                    If you aren't able to join the seder on your device, try
                    using a different browser.
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ChevronRight />
                </ListItemIcon>
                <ListItemText>
                  <Typography>
                    Once you've joined the seder, don't close the tab or go to
                    any other web sites in the tab that you have the game open
                    in. Right now the only person who can re-join seders is
                    Elijah.
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
            <Typography component="p" paragraph>
              If everyone is ready to celebrate Passover, I'm going to click
              "Proceed" to generate our Room Code, so we can start having some
              fun!
            </Typography>
          </div>
          <br />
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
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ExplainPage);
