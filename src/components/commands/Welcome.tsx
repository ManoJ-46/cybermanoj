import { useContext } from "react";
import {
  Cmd,
  HeroContainer,
} from "../styles/Welcome.styled";
import { termContext } from "../Terminal";

const Welcome: React.FC = () => {
  const { executeCommand } = useContext(termContext);

  const handleHelpClick = () => {
    if (executeCommand) {
      executeCommand('help');
    }
  };

  return (
    <HeroContainer data-testid="welcome">
      <div style={{ lineHeight: 1.7 }}>
        <span style={{
          fontSize: "2.4rem",
          fontWeight: "700",
          color: "#00ff41",
          letterSpacing: "-0.02em"
        }}>
          MANOJ KUMAR N
        </span><br />

        <span style={{
          fontSize: "1.25rem",
          color: "#00bfff"
        }}>
          Cybersecurity Engineer | Ethical Hacker
        </span><br /><br />

        Proactive MCA graduate with IEEE published research on DoS mitigation.<br />
        Certified Ethical Hacker • Passionate about penetration testing &amp; network defense.<br /><br />

        <span style={{ color: "#d0d0d0" }}>
          Type <Cmd onClick={handleHelpClick} style={{ cursor: 'pointer' }}>help</Cmd> to see all commands
        </span>
      </div>
    </HeroContainer>
  );
};

export default Welcome;