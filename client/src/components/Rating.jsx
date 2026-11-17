import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import './Rating.css';

export default function BasicRating({ value, onChange }) {
  return (
    <Box className="rating">
      <Typography component="legend">Rate this title</Typography>
      <Rating
        className="rating-stars"
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
      />
    </Box>
  );
}