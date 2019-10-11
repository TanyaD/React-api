import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const styles = theme => ({
    search: {
        position: 'relative',
        borderRadius: '5px',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: '20px',
        marginLeft: '20px',
        width: '60%',
        opacity: '1'
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: '#FFF',
        width: '100%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        width: '100%',
    },
    houseIcon: {
        margin: theme.spacing(2),
    }
})

class Header extends Component {
    render() {
        const { classes } = this.props
        return (
            <div>
				      <AppBar position='static'>
                  <ToolBar>
                    <Typography
                        component={Link}
                        to='/home'
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textDecoration: 'none' }}
                    >
                        Movie Time
                    </Typography>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
                            }}
                                placeholder="Search ..."
                            />
                        </div>
                        <ButtonGroup
                            variant="text"
                            size="medium"
                            aria-label="small contained button group"
                        >
                            <Button variant='contained' fullWidth>Title</Button>
                            <Button variant='contained' fullWidth>Director</Button>
                            <Button variant='contained' fullWidth>Year</Button>
                        </ButtonGroup>
					</ToolBar>
				</AppBar>
			</div>)
    }
}

export default withStyles(styles)(Header);
