import React, { useEffect, useRef } from "react";
import L from "leaflet";

// Fix default icon paths (Webpack)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const SEVERITY_COLORS = {
  critical: "#E11D48",
  high: "#EA580C",
  medium: "#D97706",
  low: "#059669",
};

function buildIcon(color) {
  const html = `
    <div style="position:relative;width:24px;height:24px;">
      <span style="position:absolute;inset:0;border-radius:9999px;background:${color};opacity:0.25;animation:mvspulse 1.6s infinite;"></span>
      <span style="position:absolute;inset:6px;border-radius:9999px;background:${color};box-shadow:0 0 0 2px white;"></span>
    </div>
    <style>@keyframes mvspulse{0%{transform:scale(0.8);opacity:0.6}70%{transform:scale(1.6);opacity:0}100%{transform:scale(0.8);opacity:0}}</style>
  `;
  return L.divIcon({
    className: "mvs-marker",
    html,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

export default function MapView({
  markers = [],
  center = [19.076, 72.8777],
  zoom = 11,
  height = 420,
  testId = "map-view",
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) return;
    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: true,
      attributionControl: true,
    });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    // Force resize after mount
    setTimeout(() => map.invalidateSize(), 50);
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current || !layerRef.current) return;
    layerRef.current.clearLayers();
    markers.forEach((m) => {
      const color = SEVERITY_COLORS[m.severity] || "#2563EB";
      const marker = L.marker(m.coords, { icon: buildIcon(color) });
      marker.bindPopup(
        `<div style="font-family:Figtree,sans-serif;min-width:180px;">
          <div style="font-weight:700;font-size:13px;color:#0F172A;">${m.title || m.id || "Marker"}</div>
          ${m.subtitle ? `<div style="font-size:12px;color:#64748B;margin-top:2px;">${m.subtitle}</div>` : ""}
          ${m.severity ? `<div style="margin-top:6px;font-size:11px;text-transform:uppercase;color:${color};font-weight:700;">${m.severity}</div>` : ""}
        </div>`,
      );
      marker.addTo(layerRef.current);
    });
  }, [markers]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  return (
    <div
      data-testid={testId}
      ref={containerRef}
      className="w-full overflow-hidden rounded-2xl border border-slate-200 shadow-inner"
      style={{ height }}
    />
  );
}
