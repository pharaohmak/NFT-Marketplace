import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import { ShimmerDiv, ShimmerText, ShimmerTitle } from "shimmer-effects-react";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopSellers();
  }, [])

  async function fetchTopSellers() {
    try {
      const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      setTopSellers(response.data);
    } catch (error) {
      console.error("Counld not fetch data" + error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading ? (
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <Skeleton width={50} height={50} borderRadius={100}/>
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author"><Skeleton width={100} height={20}/></Link>
                    <span><Skeleton width={40} height={20} /></span>
                  </div>
                </li>
                ))
              ) : (
                topSellers.map((data, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${data.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={data.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${data.authorId}`}>{data.authorName}</Link>
                      <span>{data.price} ETH</span>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
