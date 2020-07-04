import React, { useEffect } from "react";

import PageHeader from "../PageHeader";
import InfoArticle from "../InfoArticle";
import InfoHeadline from "../InfoHeadline";
import articles from "../../articles/combineArticles";
import { Link } from "react-router-dom";

export default function Info(props) {
  useEffect(() => {
    props.setNav(true);
  }, [props]);

  articles.reverse();

  const articlesList = articles.map((article, i) => {
    if (i === 0) {
      return (
        <Link to={article.url} key={article.url}>
          <InfoHeadline title={article.title} thumbnail={article.img} />
        </Link>
      );
    } else {
      return (
        <Link to={article.url} key={article.url}>
          <InfoArticle title={article.title} thumbnail={article.img} />
        </Link>
      );
    }
  });

  return (
    <div className="page-wrapper">
      <div className="page-inner-wrapper">
        <PageHeader
          title="Edukasi"
          subtitle="Berbagai artikel mengenai pengetahuan pencegahan Covid-19"
        />

        <div className="article-container">{articlesList}</div>
      </div>
    </div>
  );
}
