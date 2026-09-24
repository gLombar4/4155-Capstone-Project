import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import './Rating.css';

export default function BasicRating() {
  const [value, setValue] = React.useState(3);

  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Typography component="legend">Rate this title</Typography>
      <Rating
        className="rating-stars"
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
}
