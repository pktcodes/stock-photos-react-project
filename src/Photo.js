import React from "react";

const Photo = ({
  urls: { regular },
  likes,
  alt_description,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) => {
  return (
    <article className="photo">
      <img src={regular} alt={alt_description} />
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <div>
          <a href={portfolio_url}>
            <img src={medium} alt={name} className="user-img" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default Photo;
