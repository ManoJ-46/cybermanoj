import {
  AboutWrapper,
  HighlightAlt,
  HighlightSpan,
} from "../styles/About.styled";

const About: React.FC = () => {
  return (
    <AboutWrapper data-testid="about">
      <p>
        Hi, my name is <HighlightSpan>Manoj Kumar N</HighlightSpan>.
      </p>
      <p>
        I'm a <HighlightAlt>Cybersecurity Engineer | Ethical Hacker</HighlightAlt> based in Bangalore, India.
      </p>
      <p>
        Proactive MCA graduate with published IEEE research on DoS-resilient wireless networks using Deep Reinforcement Learning.<br />
        Certified Ethical Hacker passionate about penetration testing, vulnerability assessment, and building resilient systems.
      </p>
      <p>
        Type <strong>help</strong> to see all commands.
      </p>
    </AboutWrapper>
  );
};

export default About;