//App.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MasterView from "./components/MasterView";
import DetailView from "./components/DetailView";


const App: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detect mobile screens

  return (
    <Router>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route
            path="/"
            element={
              isMobile ? (
                <MobileView products={products} />
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <MasterView
                      products={products}
                      onSelect={handleSelectProduct}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <DetailView product={selectedProduct} />
                  </Grid>
                </Grid>
              )
            }
          />
          {isMobile && (
            <Route
              path="/product/:id"
              element={<MobileDetailPage products={products} />}
            />
          )}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

const MobileView: React.FC<{ products: any[] }> = ({ products }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MasterView products={products} />
      </Grid>
    </Grid>
  );
};

const MobileDetailPage: React.FC<{ products: any[] }> = ({ products }) => {
  const productId = window.location.pathname.split("/").pop();
  const product = products.find((p) => p.id === parseInt(productId || ""));
  return <DetailView product={product} />;
};