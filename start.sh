#!/bin/bash
# Start-Script für Sportstudio Thielen Website

echo "🏋️ Starte Sportstudio Thielen Website..."
echo "📍 Server läuft auf: http://localhost:8000"
echo "🛑 Zum Beenden: Strg+C drücken"
echo ""

python3 -m http.server 8000
