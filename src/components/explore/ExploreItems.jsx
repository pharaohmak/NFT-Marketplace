import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { ShimmerDiv, ShimmerText, ShimmerTitle } from "shimmer-effects-react";
import CountdownTimer from "../UI/CountdownTimer";
import axios from "axios";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  async function fetchData(filter = "") {
    try {
      let url = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
      if (filter) {
        url += `?filter=${filter}`;
      }
      const response = await axios.get(url);
      setExploreItems(response.data);
    } catch (error) {
      console.error("Failed fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleLoadMore = async () => {
    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setExploreItems([...exploreItems, ...response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <ShimmerDiv
                  mode="light"
                  center={true}
                  height={50}
                  width={50}
                  rounded={50}
                />
              </div>
              <ShimmerText mode="light" center={true} width={40} line={1} />
              <div className="nft__item_wrap">
                <ShimmerDiv
                  className="nft-wrap--img"
                  mode="light"
                  height={"75%"}
                  width={"100%"}
                />
              </div>
              <div className="nft__item_info">
                <ShimmerTitle mode="light" center={true} width={60} line={1} />
              </div>
            </div>
          </div>
        ))
      ) : (
        exploreItems.map((item, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link to={`/author/${item.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top">
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <div className="de_countdown">
                <CountdownTimer expiryDate={item.expiryDate} />
              </div>
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href={item.facebookLink} target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href={item.twitterLink} target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href={item.emailLink}>
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to={`/item-details/${item.id}`}>
                  <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${item.id}`}>
                  <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="col-md-12 text-center">
        <button onClick={handleLoadMore} className="btn-main lead">
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
