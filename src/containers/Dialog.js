import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import { closeModal } from "../../actions/actions";
import Camera from "../../images/analog-art-camera-390089.jpg";
import styles from "../MovieList/MovieList.module.css";

class DialogView extends React.Component {
  render() {
    const { handleClose } = this.props;
    return (
      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {this.props.title}
          </DialogTitle>
          <DialogContent dividers>
            <div>
              <Grid container spacing={2}>
                {this.props.poster_path ? (
                  <Grid item>
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${this.props.poster_path}`}
                        alt="complex"
                      />
                    </div>
                  </Grid>
                ) : (
                  <Grid item>
                    <div>
                      <img
                        src={Camera}
                        alt="complex"
                        className={styles.noImage}
                      />
                    </div>
                  </Grid>
                )}
                <Grid item xs={6} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item>
                      <Typography
                        gutterBottom
                        color="textSecondary"
                        component="p"
                      >
                        Release Date: {this.props.release_date}
                      </Typography>
                      <Typography
                        gutterBottom
                        color="textSecondary"
                        component="p"
                      >
                        {this.props.overview}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  open: state.open,
  title: state.title,
  overview: state.overview,
  release_date: state.release_date,
  poster_path: state.poster_path
});

const mapDispatchToProps = {
  closeModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogView);
