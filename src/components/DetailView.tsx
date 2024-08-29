//DetailView.tsx
import React from "react";
import { Typography, Paper, CardMedia, Box, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface DetailViewProps {
  product: any | null;
}

const DetailView: React.FC<DetailViewProps> = ({ product }) => {
  if (!product) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h6" color="textSecondary">
          Nothing to display...
        </Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: "auto", maxWidth: 600 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ textAlign: "center" }}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{ width: "100%", maxWidth: 200, margin: "0 auto" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="h6" color="secondary">
            Price: ${product.price.toFixed(2)}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <StarIcon sx={{ color: "#ffb400", fontSize: 20 }} />
            <Typography variant="body2" color="textSecondary">
              {product.rating?.rate} ({product.rating?.count} reviews)
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            Category: {product.category}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DetailView;