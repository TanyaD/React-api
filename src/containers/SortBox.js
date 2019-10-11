import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';

const styles = theme => ({
    formControl: {
        marginTop: '10px',
        marginLeft: '80%',
        minWidth: 120,
        display: 'block'
    },
    listView: {
        display: 'block'
    },
    card: {
        maxWidth: 345,
        height: "100%",
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },

    cardhead: {
        height: '15%'
    },
})

class SortBox extends Component {
    render() {
        const { count } = this.props
        return (
            <div style={{width: '100%' }}>
                <Box display="flex" bgcolor="grey.100">
                    <Box pt={3} ml={10} flexGrow={1} >
                        Results: {count}
                    </Box>
                    <Box p={1} mr={10}>
                        <div>
                            <FormControl>
                                <InputLabel htmlFor="uncontrolled-native">Sort By</InputLabel>
                                <NativeSelect
                                    defaultValue={1}
                                    inputProps={{
                                        name: 'name',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={1}>Newest First</option>
                                    <option value={2}>Oldest First</option>
                                </NativeSelect>
                            </FormControl>
                        </div>
                    </Box>
                </Box>
            </div> 
            )
    }
}

export default withStyles(styles)(SortBox);
