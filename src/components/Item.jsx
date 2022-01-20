import React, { memo } from "react";


import './ItemStyles.css';

export const Item = memo(({ data })=>{
    return (
        
          <div className="content">
          {data.thumbnail !== "self" && <img src={data.thumbnail} alt="image" />}
          <p>{data.title}</p>
          <p>Number of comments: {data.num_comments}</p>
          <a
            href={`https://www.reddit.com/${data.permalink}`}
            target="_blank"
          >
            link
          </a>
          </div>
         
      
      );
});

