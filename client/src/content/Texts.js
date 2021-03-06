import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const Texts = ({ id, texts, updateGraphic }) => (
    <>
        {texts.map((text, index) => (
            <Grid key={index} item xs={12}>
                <TextField
                    label={`Text ${index + 1}`}
                    type='text'
                    value={text.content ?? ''}
                    onChange={(event) => updateGraphic(id, `texts[${index}].content`, event.target.value)}
                    fullWidth
                    multiline={text.rich}
                    minRows={4}
                />
            </Grid>
        ))}
    </>
);

Texts.propTypes = {
    id: PropTypes.string.isRequired,
    texts: PropTypes.array.isRequired,
    updateGraphic: PropTypes.func.isRequired
};

export default Texts;
