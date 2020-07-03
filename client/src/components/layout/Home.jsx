import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import HomeNav from "../HomeNav";
import PageHeader from "../PageHeader";
import SectionHeader from "../SectionHeader";
import ProvinceStats from "../ProvinceStats";
import RegencyStats from "../RegencyStats";
import { Accordion } from "react-accessible-accordion";

export default function Home(props) {
  const [homeMenu, setHomeMenu] = useState("province");

  function homeNavHandle(pos) {
    setHomeMenu(pos);
    console.log("Menu clicked");
  }

  useEffect(() => {
    props.setNav(true);
  }, [props]);

  return (
    <div className="page-wrapper">
      <div className="page-inner-wrapper">
        <PageHeader title="Beranda" />

        <HomeNav pos={homeMenu} homeNavHandle={homeNavHandle} />

        <section className="sebaran-provinsi">
          <CSSTransition
            in={homeMenu === "province"}
            timeout={500}
            unmountOnExit
            classNames="home-province"
          >
            <div className="province">
              <SectionHeader title="Sebaran Covid-19" subtitle="Provinsi DIY" />
              <ProvinceStats active={53} recovered={103} deaths={8} daily={3} />

              <SectionHeader
                title="Grafik Pasien Covid-19"
                subtitle="Provinsi DIY"
              />

              <div className="placeholder"></div>

              <div className="more-wrapper">
                <a
                  href="https://corona.jogjaprov.go.id/data-statistik"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="chart-more"
                >
                  Lebih Lengkap
                </a>
              </div>

              <small className="data-update">
                Update terakhir: 11 Juni 2020
              </small>
            </div>
          </CSSTransition>

          <CSSTransition
            in={homeMenu === "regency"}
            timeout={500}
            unmountOnExit
            classNames="home-regency"
          >
            <div className="regency">
              <SectionHeader
                title="Sebaran Covid-19"
                subtitle="Per Kabupaten"
              />

              <div className="kabupaten-wrapper">
                <Accordion>
                  <RegencyStats
                    area="Kota Yogyakarta"
                    active={28}
                    odp={1049}
                    pdp={847}
                  />
                  <RegencyStats
                    area="Kota Yogyakarta"
                    active={28}
                    odp={1049}
                    pdp={847}
                  />
                  <RegencyStats
                    area="Kota Yogyakarta"
                    active={28}
                    odp={1049}
                    pdp={847}
                  />
                  <RegencyStats
                    area="Kota Yogyakarta"
                    active={28}
                    odp={1049}
                    pdp={847}
                  />
                </Accordion>
              </div>
            </div>
          </CSSTransition>
        </section>
      </div>
    </div>
  );
}
