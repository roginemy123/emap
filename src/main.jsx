import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import markerIcon from "../node_modules/leaflet/dist/images/marker-icon.png";
L.Marker.prototype.setIcon(L.icon({
  iconUrl:markerIcon
}))


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
);