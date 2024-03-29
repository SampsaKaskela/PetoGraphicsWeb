import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import useProject from 'common/hooks/useProject';
import findGraphic from 'common/utils/findGraphic';

const useAnimationPropertiesState = (id, path) =>
    useProject((state) => findGraphic(state.config, id)[path]);

const AnimationProperties = ({ id, path }) => {
    const { style, duration, delay, addFade, ease } = useAnimationPropertiesState(id, path);
    const updateGraphic = useProject((state) => state.updateGraphic);
    return (
        <>
            <Grid
                item
                xs={12}
            >
                <TextField
                    label='Style'
                    value={style ?? 'Fade'}
                    onChange={(event) => updateGraphic(id, `${path}.style`, event.target.value)}
                    fullWidth
                    select
                >
                    <MenuItem value='None'>None</MenuItem>
                    <MenuItem value='Fade'>Fade</MenuItem>
                    <MenuItem value='SlideTop'>Slide Top</MenuItem>
                    <MenuItem value='SlideBottom'>Slide Bottom</MenuItem>
                    <MenuItem value='SlideLeft'>Slide Left</MenuItem>
                    <MenuItem value='SlideRight'>Slide Right</MenuItem>
                    <MenuItem value='WipeTop'>Wipe Top</MenuItem>
                    <MenuItem value='WipeLeft'>Wipe Left</MenuItem>
                    <MenuItem value='ExpandY'>ExpandY</MenuItem>
                    <MenuItem value='ExpandX'>ExpandX</MenuItem>
                </TextField>
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
            >
                <TextField
                    label='Duration (ms)'
                    type='number'
                    value={duration ?? 0}
                    onChange={(event) =>
                        updateGraphic(id, `${path}.duration`, Number(event.target.value))
                    }
                    fullWidth
                />
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
            >
                <TextField
                    label='Delay (ms)'
                    type='number'
                    value={delay ?? 0}
                    onChange={(event) =>
                        updateGraphic(id, `${path}.delay`, Number(event.target.value))
                    }
                    fullWidth
                />
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={addFade}
                            onChange={(event) =>
                                updateGraphic(id, `${path}.addFade`, event.target.checked)
                            }
                        />
                    }
                    label='Fade'
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={ease}
                            onChange={(event) =>
                                updateGraphic(id, `${path}.ease`, event.target.checked)
                            }
                        />
                    }
                    label='Ease'
                />
            </Grid>
        </>
    );
};

AnimationProperties.propTypes = {
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default AnimationProperties;
