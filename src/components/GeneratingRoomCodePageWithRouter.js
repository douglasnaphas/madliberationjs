import CircularProgress from '@material-ui/core/CircularProgress';
import { Configs } from '../Configs';
import MenuAppBar from './MenuAppBar';
import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import GeneratingRoomCodePage from './GeneratingRoomCodePage';

export default withRouter(GeneratingRoomCodePage);
