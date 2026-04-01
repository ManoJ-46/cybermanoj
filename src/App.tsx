import { createContext, useEffect, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { useTheme } from "./hooks/useTheme";
import GlobalStyle from "./components/styles/GlobalStyle";
import TerminalWindow from "./components/TerminalWindow";
import DesktopShortcuts from "./components/DesktopShortcuts";
import WelcomeBrowserWindow from "./components/WelcomeBrowserWindow";
import ResumeWindow from "./components/ResumeWindow";
import FullscreenToggle from "./components/FullscreenToggle";

export const themeContext = createContext<
  ((switchTheme: DefaultTheme) => void) | null
>(null);

function App() {
  // themes
  const { theme, themeLoaded, setMode } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  // Device detection
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const requestFullscreen = async () => {
    const el: any = document.documentElement;
    try {
      if (!document.fullscreenElement && el.requestFullscreen) await el.requestFullscreen();
      else if ((el as any).webkitRequestFullscreen) await (el as any).webkitRequestFullscreen();
      else if ((el as any).msRequestFullscreen) await (el as any).msRequestFullscreen();
    } catch { }
  };
  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) await document.exitFullscreen();
      else if ((document as any).webkitExitFullscreen) await (document as any).webkitExitFullscreen();
      else if ((document as any).msExitFullscreen) await (document as any).msExitFullscreen();
    } catch { }
  };
  const toggleFullscreen = async () => {
    if (!isFullscreen) await requestFullscreen(); else await exitFullscreen();
  };
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).msFullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange as any);
    document.addEventListener('msfullscreenchange', onChange as any);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange as any);
      document.removeEventListener('msfullscreenchange', onChange as any);
    };
  }, []);

  useEffect(() => {
    if (themeLoaded) {
      requestFullscreen();
    }
  }, [themeLoaded]);

  // Terminal window state
  const [terminalMounted, setTerminalMounted] = useState(false);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [terminalMaximized, setTerminalMaximized] = useState(false);
  const [winX, setWinX] = useState(0);
  const [winY, setWinY] = useState(0);
  const [winW, setWinW] = useState(960);
  const [winH, setWinH] = useState(640);

  // Welcome browser window state
  const [welcomeMounted, setWelcomeMounted] = useState(true);
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [welcomeMaximized, setWelcomeMaximized] = useState(false);

  // Resume window state
  const [resumeMounted, setResumeMounted] = useState(false);
  const [resumeVisible, setResumeVisible] = useState(false);
  const [resumeMaximized, setResumeMaximized] = useState(false);

  // z-index stacking
  const [zTop, setZTop] = useState(500);
  const [zBrowser, setZBrowser] = useState(200);
  const [zTerminal, setZTerminal] = useState(300);
  const [zResume, setZResume] = useState(400);

  const bringBrowserToFront = () => { const next = zTop + 1; setZTop(next); setZBrowser(next); };
  const bringTerminalToFront = () => { const next = zTop + 1; setZTop(next); setZTerminal(next); };
  const bringResumeToFront = () => { const next = zTop + 1; setZTop(next); setZResume(next); };

  const [wbX, setWbX] = useState(140);
  const [wbY, setWbY] = useState(60);
  const [wbW, setWbW] = useState(900);
  const [wbH, setWbH] = useState(560);
  const [rsX, setRsX] = useState(160);
  const [rsY, setRsY] = useState(80);
  const [rsW, setRsW] = useState(900);
  const [rsH, setRsH] = useState(560);

  // Startup layout
  useEffect(() => {
    if (!themeLoaded) return;
    if (isMobile) {
      setWelcomeMounted(true);
      setWelcomeVisible(true);
      setWelcomeMaximized(true);
      setTerminalMounted(false);
      setTerminalVisible(false);
      setTerminalMaximized(false);
    } else {
      setWelcomeMounted(true);
      setWelcomeVisible(true);
      setWelcomeMaximized(false);
      const ww = window.innerWidth, wh = window.innerHeight;
      const w = wbW, h = wbH;
      setWbX(Math.max(0, Math.round((ww - w) / 2)));
      setWbY(Math.max(0, Math.round((wh - h) / 2)));
      bringBrowserToFront();
      setTerminalMounted(false);
      setTerminalVisible(false);
      setTerminalMaximized(false);
    }
  }, [isMobile, themeLoaded]);

  // Disable default arrow keys
  useEffect(() => {
    window.addEventListener("keydown", e => {
      ["ArrowUp", "ArrowDown"].indexOf(e.code) > -1 && e.preventDefault();
    }, false);
  }, []);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  // MATRIX RAIN + FALLING KALI COMMANDS (added by Grok)
  useEffect(() => {
    const canvas = document.getElementById("matrix") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const commands = ["nmap -sV", "msfconsole", "burp", "sudo", "whoami", "hydra", "sqlmap", "nikto", "gobuster", "metasploit", "wireshark", "kali", "root@maanoj", "DoS", "OWASP", "BurpSuite", "ssh", "john"];
    const fontSize = 14;
    const columns = width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = commands[Math.floor(Math.random() * commands.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Update meta theme colors
  useEffect(() => {
    const themeColor = theme.colors?.body;
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    const maskIcon = document.querySelector("link[rel='mask-icon']");
    const metaMsTileColor = document.querySelector("meta[name='msapplication-TileColor']");
    metaThemeColor && metaThemeColor.setAttribute("content", themeColor);
    metaMsTileColor && metaMsTileColor.setAttribute("content", themeColor);
    maskIcon && maskIcon.setAttribute("color", themeColor);
  }, [selectedTheme]);

  const themeSwitcher = (switchTheme: DefaultTheme) => {
    setSelectedTheme(switchTheme);
    setMode(switchTheme);
  };

  // Terminal handlers
  const handleClose = () => { setTerminalMounted(false); setTerminalVisible(false); setTerminalMaximized(false); };
  const handleMinimize = () => { setTerminalVisible(false); setTerminalMaximized(false); };
  const handleOpenFromShortcut = () => {
    if (isMobile) {
      setTerminalMounted(true);
      setTerminalVisible(true);
      setTerminalMaximized(true);
      bringTerminalToFront();
      return;
    }
    const ww = window.innerWidth, wh = window.innerHeight;
    const w = winW, h = winH;
    setWinX(Math.max(0, Math.round((ww - w) / 2)));
    setWinY(Math.max(0, Math.round((wh - h) / 2)));
    if (!terminalMounted) setTerminalMounted(true);
    setTerminalVisible(true);
    bringTerminalToFront();
  };
  const handleToggleMaximize = () => { setTerminalMaximized(prev => !prev); setTerminalVisible(true); };

  // Resume handlers
  const handleResumeClose = () => { setResumeMounted(false); setResumeVisible(false); setResumeMaximized(false); };
  const handleResumeMinimize = () => { setResumeVisible(false); setResumeMaximized(false); };
  const handleOpenResume = () => {
    if (isMobile) {
      setResumeMounted(true);
      setResumeVisible(true);
      setResumeMaximized(true);
      bringResumeToFront();
      return;
    }
    const ww = window.innerWidth, wh = window.innerHeight;
    const w = rsW, h = rsH;
    setRsX(Math.max(0, Math.round((ww - w) / 2)));
    setRsY(Math.max(0, Math.round((wh - h) / 2)));
    if (!resumeMounted) setResumeMounted(true);
    setResumeVisible(true);
    bringResumeToFront();
  };
  const handleResumeToggleMax = () => { setResumeMaximized(p => !p); setResumeVisible(true); };

  // Welcome handlers
  const handleWelcomeClose = () => { setWelcomeMounted(false); setWelcomeVisible(false); setWelcomeMaximized(false); };
  const handleWelcomeMinimize = () => { setWelcomeVisible(false); setWelcomeMaximized(false); };
  const handleOpenWelcome = () => {
    if (isMobile) {
      setWelcomeMounted(true);
      setWelcomeVisible(true);
      setWelcomeMaximized(true);
      bringBrowserToFront();
      return;
    }
    const ww = window.innerWidth, wh = window.innerHeight;
    const w = wbW, h = wbH;
    setWbX(Math.max(0, Math.round((ww - w) / 2)));
    setWbY(Math.max(0, Math.round((wh - h) / 2)));
    if (!welcomeMounted) setWelcomeMounted(true);
    setWelcomeVisible(true);
    bringBrowserToFront();
  };
  const handleWelcomeToggleMax = () => { setWelcomeMaximized(p => !p); setWelcomeVisible(true); };

  return (
    <>
      <h1 className="sr-only" aria-label="Manoj Kumar N">Manoj Kumar N</h1>

      {/* MATRIX RAIN BACKGROUND - NEON KALI COMMANDS */}
      <canvas
        id="matrix"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          opacity: 0.18,
          pointerEvents: "none",
        }}
      />

      {themeLoaded && (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyle />
          <themeContext.Provider value={themeSwitcher}>
            <DesktopShortcuts
              onOpenTerminal={handleOpenFromShortcut}
              onOpenWelcome={handleOpenWelcome}
              onOpenResume={handleOpenResume}
              hidden={terminalMaximized || welcomeMaximized || resumeMaximized}
              activeTerminal={!isMobile && terminalMounted && terminalVisible}
              activeBrowser={!isMobile && welcomeMounted && welcomeVisible}
              activeResume={!isMobile && resumeMounted && resumeVisible}
              mobileExpanded={isMobile && !terminalMounted}
            />

            <FullscreenToggle
              isFullscreen={isFullscreen}
              onToggle={toggleFullscreen}
              hidden={terminalMaximized || welcomeMaximized || resumeMaximized}
            />

            {welcomeMounted && (
              <WelcomeBrowserWindow
                onClose={handleWelcomeClose}
                onMinimize={!isMobile ? handleWelcomeMinimize : undefined}
                onToggleMaximize={!isMobile ? handleWelcomeToggleMax : undefined}
                isMaximized={welcomeMaximized}
                visible={welcomeVisible}
                x={wbX} y={wbY} width={wbW} height={wbH}
                onMove={(x, y) => { setWbX(x); setWbY(y); bringBrowserToFront(); }}
                onResize={({ width, height, x, y }) => { if (x !== undefined) setWbX(x); if (y !== undefined) setWbY(y); setWbW(width); setWbH(height); bringBrowserToFront(); }}
                onFocus={bringBrowserToFront}
                zIndex={zBrowser}
              />
            )}

            {terminalMounted && (
              <TerminalWindow
                onClose={handleClose}
                onMinimize={!isMobile ? handleMinimize : undefined}
                onToggleMaximize={!isMobile ? handleToggleMaximize : undefined}
                isMaximized={terminalMaximized}
                visible={terminalVisible}
                x={winX} y={winY} width={winW} height={winH}
                onMove={(x, y) => { setWinX(x); setWinY(y); bringTerminalToFront(); }}
                onResize={({ width, height, x, y }) => { if (x !== undefined) setWinX(x); if (y !== undefined) setWinY(y); setWinW(width); setWinH(height); bringTerminalToFront(); }}
                onFocus={bringTerminalToFront}
                zIndex={zTerminal}
              />
            )}

            {resumeMounted && (
              <ResumeWindow
                onClose={handleResumeClose}
                onMinimize={!isMobile ? handleResumeMinimize : undefined}
                onToggleMaximize={!isMobile ? handleResumeToggleMax : undefined}
                isMaximized={resumeMaximized}
                visible={resumeVisible}
                x={rsX} y={rsY} width={rsW} height={rsH}
                onMove={(x, y) => { setRsX(x); setRsY(y); bringResumeToFront(); }}
                onResize={({ width, height, x, y }) => { if (x !== undefined) setRsX(x); if (y !== undefined) setRsY(y); setRsW(width); setRsH(height); bringResumeToFront(); }}
                onFocus={bringResumeToFront}
                zIndex={zResume}
              />
            )}
          </themeContext.Provider>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;