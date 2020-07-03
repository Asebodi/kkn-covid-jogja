import React, { useState, useEffect } from "react";

import PageHeader from "../PageHeader";
import NewsMenu from "../NewsMenu";
import NewsSelect from "../NewsSelect";
import NewsItem from "../NewsItem";

function useFetch(url) {
  const [newsData, setNews] = useState();
  useEffect(() => {
    async function getNews() {
      const data = await fetch(url).then((res) => res.json());
      console.log(data);
      setNews(data);
    }

    getNews();
  }, [url]);

  return newsData;
}

export default function News(props) {
  useEffect(() => {
    props.setNav(true);
  }, [props]);

  const news = useFetch("/api/berita");
  const [newsSource, setSource] = useState("detik");

  function changeNewsSource(event) {
    setSource(event.target.value);
  }

  function outputNews() {
    if (!news)
      return (
        <>
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
        </>
      );

    switch (newsSource) {
      case "detik":
        const detik = news[0].news.map((item) => {
          return (
            <NewsItem
              title={item.title}
              date={item.date}
              excerpt={item.excerpt}
              url={item.url}
              key={item._id}
            />
          );
        });
        return detik;

      case "cnbc":
        const cnbc = news[1].news.map((item) => {
          return (
            <NewsItem
              title={item.title}
              date={item.date}
              label={item.label}
              excerpt=""
              url={item.url}
              key={item._id}
            />
          );
        });
        return cnbc;

      case "suara":
        const suara = news[2].news.map((item) => {
          return (
            <NewsItem
              title={item.title}
              excerpt={item.excerpt}
              date=""
              url={item.url}
              key={item._id}
            />
          );
        });
        return suara;

      case "kompas":
        const kompas = news[3].news.map((item) => {
          return (
            <NewsItem
              title={item.title}
              date={item.date}
              excerpt={item.excerpt}
              url={item.url}
              key={item._id}
            />
          );
        });
        return kompas;

      case "tribun":
        const tribun = news[4].news.map((item) => {
          return (
            <NewsItem
              title={item.title}
              date={item.date}
              excerpt={item.excerpt}
              url={item.url}
              key={item._id}
            />
          );
        });
        return tribun;

      default:
        return <p>Error</p>;
    }
  }

  return (
    <div className="page-wrapper">
      <div className="page-inner-wrapper berita-inner">
        <div className="header-static-section">
          <PageHeader
            title="Berita"
            subtitle="Kumpulan berita lokal dan informasi hoaks terbaru, semua dari
              sumber terpercaya."
          />

          <NewsMenu />
        </div>
      </div>

      <div className="berita-container">
        <div className="berita-wrapper">
          <div className="scroll-indicator"></div>

          <NewsSelect source={newsSource} changeNewsSource={changeNewsSource} />

          <div className="berita-item-wrapper">{outputNews()}</div>
        </div>
      </div>
    </div>
  );
}
