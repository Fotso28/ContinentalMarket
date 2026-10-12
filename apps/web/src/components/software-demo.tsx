"use client";

import { type CSSProperties, useEffect, useState } from "react";

const moments = [
  { sales: "186 500", orders: 28, active: 7, bars: [42, 58, 48, 74, 63, 86, 71] },
  { sales: "203 750", orders: 31, active: 5, bars: [50, 64, 57, 82, 69, 92, 78] },
  { sales: "219 000", orders: 34, active: 8, bars: [55, 69, 62, 88, 76, 96, 84] },
];

export function SoftwareDemo() {
  const [moment, setMoment] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    const timer = window.setInterval(() => setMoment((value) => (value + 1) % moments.length), 2400);
    return () => window.clearInterval(timer);
  }, []);

  const data = moments[moment];

  return (
    <div className="software-device" role="img" aria-label="Simulation animée d’une application de gestion de bar">
      <div className="software-camera" />
      <div className="software-screen">
        <aside className="software-sidebar">
          <strong>Continental</strong>
          <span className="is-active">Vue d’ensemble</span>
          <span>Commandes</span>
          <span>Stock</span>
          <span>Caisse</span>
        </aside>
        <div className="software-dashboard">
          <div className="software-dashboard-head">
            <div><small>Bar Manager</small><h3>Bonsoir, équipe Logpom</h3></div>
            <span className="software-live"><i /> En direct</span>
          </div>
          <div className="software-stats">
            <article><small>Ventes du jour</small><strong>{data.sales} <em>FCFA</em></strong><span>Activité en progression</span></article>
            <article><small>Commandes</small><strong>{data.orders}</strong><span>{data.active} en préparation</span></article>
            <article><small>Alertes stock</small><strong>03</strong><span>À vérifier</span></article>
          </div>
          <div className="software-panels">
            <article className="software-chart">
              <div><strong>Activité du service</strong><small>Mise à jour automatique</small></div>
              <div className="software-bars">
                {data.bars.map((height, index) => <i style={{ "--h": height / 100 } as CSSProperties} key={index} />)}
              </div>
            </article>
            <article className="software-orders">
              <strong>Commandes récentes</strong>
              <p><span>Table 08</span><b>Servie</b></p>
              <p><span>Comptoir 03</span><b className="is-pending">En cours</b></p>
              <p><span>Table 12</span><b>Validée</b></p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
