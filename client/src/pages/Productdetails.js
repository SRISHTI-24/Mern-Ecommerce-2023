import React, { useState, useEffect } from "react";
import Layout from "../components/layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../style/productdet.css";
const Productdetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  //itital details
  useEffect(() => {
    if (params?.slug) getproduct();
  }, [params?.slug]);
  //get product
  const getproduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Productdetails</h1>
          <hr />
          <h4>Name: {product.name}</h4>
          <h4>Description: {product.description}</h4>
          <h4>
            Price:{" "}
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h4>
        </div>
      </div>
    </Layout>
  );
};

export default Productdetails;
