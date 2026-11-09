import io, base64, zipfile, tarfile, sys, os
from PIL import Image
import os; R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..')+'/'; OUT=R+'dist/'
html=open(R+'dist/machine-legends.html','rb').read()
icon=Image.open(R+'tools/icon.png').convert('RGBA')
ico=io.BytesIO(); icon.save(ico,'ICO',sizes=[(16,16),(24,24),(32,32),(48,48),(64,64),(128,128),(256,256)]); ico=ico.getvalue()
png=io.BytesIO(); icon.resize((256,256),Image.LANCZOS).save(png,'PNG'); png=png.getvalue()
icns=io.BytesIO(); icon.resize((512,512),Image.LANCZOS).save(icns,'ICNS'); icns=icns.getvalue()
def wrap(b): 
    s=base64.b64encode(b).decode(); return '\n'.join(s[i:i+120] for i in range(0,len(s),120))
# ---------- Windows ----------
z=io.BytesIO()
with zipfile.ZipFile(z,'w',zipfile.ZIP_DEFLATED) as f: f.writestr('index.html',html); f.writestr('icon.ico',ico)
ps=r'''
$ErrorActionPreference = 'Stop'
$d = Join-Path $env:LOCALAPPDATA 'MachineLegends'
New-Item -ItemType Directory -Force -Path $d | Out-Null
$b64 = @'
%s
'@
$zip = Join-Path $d 'pkg.zip'
[IO.File]::WriteAllBytes($zip, [Convert]::FromBase64String(($b64 -replace '\s', '')))
Expand-Archive -LiteralPath $zip -DestinationPath $d -Force
Remove-Item $zip -Force
$cands = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe")
$browser = $cands | Where-Object { Test-Path $_ } | Select-Object -First 1
$url = 'file:///' + ($d -replace '\\', '/') + '/index.html'
$ws = New-Object -ComObject WScript.Shell
$links = @((Join-Path ([Environment]::GetFolderPath('Desktop')) 'Machine Legends.lnk'),
           (Join-Path ([Environment]::GetFolderPath('Programs')) 'Machine Legends.lnk'))
foreach ($p in $links) {
  $s = $ws.CreateShortcut($p)
  if ($browser) { $s.TargetPath = $browser; $s.Arguments = '--app="' + $url + '" --window-size=1280,860' }
  else { $s.TargetPath = Join-Path $d 'index.html' }
  $s.IconLocation = (Join-Path $d 'icon.ico')
  $s.WorkingDirectory = $d
  $s.Description = 'Machine Legends'
  $s.Save()
}
Write-Host ''
Write-Host 'Machine Legends is installed. Look for the new icon on your desktop.' -ForegroundColor Green
''' % wrap(z.getvalue())
bat='@echo off\r\ntitle Machine Legends Setup\r\necho Installing Machine Legends...\r\nset "SELF=%~f0"\r\npowershell -NoProfile -ExecutionPolicy Bypass -Command "$f=[IO.File]::ReadAllText($env:SELF); $i=$f.IndexOf([string][char]10+\'::PSBEGIN\'); $i=$f.IndexOf([char]10,$i+1)+1; Invoke-Expression $f.Substring($i)"\r\nif errorlevel 1 (echo Setup failed. & pause & exit /b 1)\r\ntimeout /t 3 >nul\r\nexit /b 0\r\n::PSBEGIN\r\n'+ps.replace('\n','\r\n')
open(OUT+'Machine-Legends-Setup.bat','w',newline='').write(bat)
# ---------- Linux / macOS ----------
t=io.BytesIO()
with tarfile.open(fileobj=t,mode='w:gz') as tf:
    for n,b in (('index.html',html),('icon.png',png),('icon.icns',icns)):
        ti=tarfile.TarInfo(n); ti.size=len(b); tf.addfile(ti,io.BytesIO(b))
sh=r'''#!/bin/bash
# Machine Legends installer for Linux and macOS
set -e
case "$(uname -s)" in Darwin) OS=mac;; *) OS=linux;; esac
if [ "$OS" = mac ]; then D="$HOME/Library/Application Support/MachineLegends"; else D="${XDG_DATA_HOME:-$HOME/.local/share}/machine-legends"; fi
mkdir -p "$D"
sed -n '/^__PAYLOAD__$/,$p' "$0" | tail -n +2 | base64 -d | tar -xz -C "$D"
URL="file://$D/index.html"
if [ "$OS" = mac ]; then
  APP="$HOME/Desktop/Machine Legends.app"; rm -rf "$APP"; mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"
  cp "$D/icon.icns" "$APP/Contents/Resources/icon.icns"
  cat > "$APP/Contents/Info.plist" <<PL
<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0"><dict><key>CFBundleName</key><string>Machine Legends</string><key>CFBundleExecutable</key><string>launch</string><key>CFBundleIconFile</key><string>icon</string><key>CFBundleIdentifier</key><string>app.machinelegends</string><key>CFBundlePackageType</key><string>APPL</string></dict></plist>
PL
  cat > "$APP/Contents/MacOS/launch" <<LN
#!/bin/bash
for b in "Google Chrome" "Microsoft Edge" "Brave Browser"; do
  if [ -d "/Applications/\$b.app" ]; then exec open -na "\$b" --args --app="$URL" --window-size=1280,860; fi
done
exec open "$D/index.html"
LN
  chmod +x "$APP/Contents/MacOS/launch"; xattr -dr com.apple.quarantine "$APP" 2>/dev/null || true
  echo "Done. Machine Legends is on your Desktop."
else
  mkdir -p "$HOME/.local/share/applications"
  for B in google-chrome google-chrome-stable chromium chromium-browser microsoft-edge brave-browser; do command -v $B >/dev/null 2>&1 && { EXEC="$B --app=$URL --window-size=1280,860"; break; }; done
  [ -n "$EXEC" ] || EXEC="xdg-open $D/index.html"
  F="$HOME/.local/share/applications/machine-legends.desktop"
  printf '[Desktop Entry]\nType=Application\nName=Machine Legends\nComment=Learn how machines learn\nExec=%s\nIcon=%s/icon.png\nTerminal=false\nCategories=Game;RolePlaying;\n' "$EXEC" "$D" > "$F"
  chmod +x "$F"
  DESK="$(xdg-user-dir DESKTOP 2>/dev/null || echo "$HOME/Desktop")"
  if [ -d "$DESK" ]; then cp "$F" "$DESK/Machine Legends.desktop"; chmod +x "$DESK/Machine Legends.desktop"; command -v gio >/dev/null 2>&1 && gio set "$DESK/Machine Legends.desktop" metadata::trusted true 2>/dev/null || true; fi
  echo "Done. Machine Legends is in your applications menu and on your Desktop."
fi
exit 0
__PAYLOAD__
'''+wrap(t.getvalue())+'\n'
open(OUT+'Machine-Legends-Setup.sh','w',newline='\n').write(sh); os.chmod(OUT+'Machine-Legends-Setup.sh',0o755)
print(os.path.getsize(OUT+'Machine-Legends-Setup.bat')//1024,'KB bat',os.path.getsize(OUT+'Machine-Legends-Setup.sh')//1024,'KB sh')
