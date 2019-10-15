import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

import styles from './Modal.module.css';

class SimpleModal extends React.Component {
    render() {
        const { movieId} = this.props;
    return (
      <div>
        <Modal
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          open={this.props.open}
        >
          <div className={styles.modal}>
            <Grid container spacing={2}>
              <Grid item>
                <div>
                  <img
                    className={styles.img}
                    alt='complex'
                    src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movieId}`}
                  />
                </div>
              </Grid>
              <Grid item xs={6} sm container>
                <Grid item xs container direction='column' spacing={2}>
                  <Grid item>
                    <Typography gutterBottom variant='h4'>
                      Movie Title
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      Release Date: 2019-10-04
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      ID: 1030114 During the 1980s, a failed stand-up comedian
                      is driven insane and turns to a life of crime and chaos in
                      Gotham City while becoming an infamous psychopathic crime
                      figure.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

export default SimpleModal;
