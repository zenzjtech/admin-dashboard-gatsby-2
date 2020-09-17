import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router'
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { profileActions, userActions } from '../../actions'
import Error from '../Error/Error'

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    minHeight: 'calc(100vh - 64px)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  suggestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  
  const classes = useStyles();
  const { userLogin, getCurrentUser } = props;
  
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    loginError: ''
  });
  
  useEffect(() => {
    const errors = validate(formState.values, schema);
    
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);
  
  
  const handleChange = event => {
    event.persist();
    
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  
  const handleSignIn = event => {
    event.preventDefault();
    const { email, password } = formState.values;
    userLogin(email, password)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          setFormState({
            ...formState,
            loginError: error
          })
        })
        .then(getCurrentUser);
    // history.push('/');
  };
  
  const clearLoginError = () => {
    setFormState({
      ...formState,
      loginError: ''
    })
  }
  
  const hasError = field =>
      formState.touched[field] && formState.errors[field] ? true : false;
  
  return (
      <div className={classes.root}>
        <Grid
            className={classes.grid}
            container
        >
          <Grid
              className={classes.quoteContainer}
              item
              lg={5}
          >
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography
                    className={classes.quoteText}
                    variant="h1"
                >
                  <p>Please enter your details to enter your account</p>
                  <p>If you've forgotten your password, please use the reset link below the Login button</p>
                </Typography>
                <div className={classes.person}>
                  <Typography
                      className={classes.name}
                      variant="body1"
                  >
                    Hello world
                  </Typography>
                  <Typography
                      className={classes.bio}
                      variant="body2"
                  >
                    Admin dashboard
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
              className={classes.content}
              item
              lg={7}
              xs={12}
          >
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form
                    className={classes.form}
                    onSubmit={handleSignIn}
                >
                  <Typography
                      className={classes.title}
                      variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Grid
                      className={classes.socialButtons}
                      container
                      spacing={2}
                  >
                    <TextField
                        className={classes.textField}
                        error={hasError('email')}
                        fullWidth
                        helperText={
                          hasError('email') ? formState.errors.email[0] : null
                        }
                        label="Email address"
                        name="email"
                        onChange={handleChange}
                        type="text"
                        value={formState.values.email || ''}
                        variant="outlined"
                        onFocus={clearLoginError}
                    />
                    <TextField
                        className={classes.textField}
                        error={hasError('password')}
                        fullWidth
                        helperText={
                          hasError('password') ? formState.errors.password[0] : null
                        }
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        type="password"
                        value={formState.values.password || ''}
                        variant="outlined"
                        onFocus={clearLoginError}
                    />
                    { formState.loginError && <Error error={formState.loginError}/> }
                    <Button
                        className={classes.signInButton}
                        color="primary"
                        disabled={!formState.isValid}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                      Sign in now
                    </Button>
                  </Grid>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (email, password) => dispatch(userActions.login(email, password)),
    getCurrentUser: () => dispatch(profileActions.getCurrentUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
