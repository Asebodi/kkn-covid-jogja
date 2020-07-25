import React, { useEffect, useState } from "react";

import SubpageHeader from "../SubpageHeader";
import InstagramContainer from "../InstagramContainer";
import MemberItem from "../MemberItem";

function useFetch(url) {
  const [socialData, setSocial] = useState([]);
  useEffect(() => {
    async function getNews() {
      const data = await fetch(url).then((res) => res.json());
      setSocial(data);
    }

    getNews();
  }, [url]);

  return socialData;
}

export default function Medsos(props) {
  const sosmed = useFetch("/api/sosmed");

  useEffect(() => {
    props.setNav(false);
  }, [props]);

  if (sosmed.length !== 0) {
    const posts = sosmed.posts.split(" ");
    const followers = sosmed.followers.split(" ");
    const following = sosmed.following.split(" ");
  }

  return (
    <div className="page-wrapper berita-subpage medsos-page">
      <SubpageHeader
        title="Sosial Media"
        subtitle="Sosial media dari KKN Covid Jogja UNS dan anggota KKN ini."
      />

      <div className="page-inner-wrapper">
        {sosmed.length !== 0 ? (
          <InstagramContainer
            img={sosmed.img}
            name="KKN Covid Jogja"
            post={sosmed.posts}
            follower={sosmed.followers}
            following={sosmed.following}
          />
        ) : (
          <InstagramContainer />
        )}

        <div className="member-wrapper">
          <h3>Anggota</h3>

          <div className="member-item-container">
            <MemberItem
              img="https://thispersondoesnotexist.com/image"
              name="Adit Raharditya"
              ig="https://www.instagram.com/a.raharditya/"
              twitter="#"
              linkedin="#"
            >
              <small>Desainer UI/UX</small>
              <small>Developer Front & Back End</small>
            </MemberItem>

            <MemberItem
              img="https://thispersondoesnotexist.com/image"
              name="Iklil Mara"
              ig="https://www.instagram.com/iiklil/"
              twitter="#"
              linkedin="#"
            >
              <small>Penulis Artikel</small>
            </MemberItem>
          </div>

          <small className="bottom-acknowledment">
            Dibuat sebagai media edukasi masyarakat dalam rangka KKN Covid UNS
          </small>
        </div>
      </div>
    </div>
  );
}
