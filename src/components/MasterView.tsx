//MasterView.tsx
import React from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

interface MasterViewProps {
  products: any[];
  onSelect?: (product: any) => void; 
}

const MasterView: React.FC<MasterViewProps> = ({ products, onSelect }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); 

  const handleProductClick = (product: any) => {
    if (isMobile) {
      navigate(`/product/${product.id}`);
    } else if (onSelect) {
      onSelect(product);
    }
  };

  return (
    <Box sx={{ height: "80vh", overflowY: "auto" }}>
      {products.map((product) => (
        <Card
          key={product.id}
          onClick={() => handleProductClick(product)}
          sx={{
            marginBottom: 2,
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 3,
            },
          }}
        >
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              variant="square"
              src={product.image}
              alt={product.title}
              sx={{
                width: 50,
                height: 50,
                marginRight: 2,
                backgroundColor: "#F4F6FA",
              }}
            />
            <Box>
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {product.description.substring(0, 60)}...
              </Typography>
              <Typography variant="body1" color="primary">
                ${product.price.toFixed(2)}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StarIcon sx={{ color: "#ffb400", fontSize: 20 }} />
                <Typography variant="body2" color="textSecondary">
                  {product.rating?.rate} ({product.rating?.count} reviews)
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MasterView;