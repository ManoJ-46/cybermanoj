import About from "./commands/About";
import Clear from "./commands/Clear";
import Echo from "./commands/Echo";
import Education from "./commands/Education";
import Email from "./commands/Email";
import GeneralOutput from "./commands/GeneralOutput";
import Resume from "./commands/Resume";
import Help from "./commands/Help";
import Welcome from "./commands/Welcome";
import History from "./commands/History";
import Projects from "./commands/Projects";
import Socials from "./commands/Socials";

import { OutputContainer, UsageDiv } from "./styles/Output.styled";
import { termContext } from "./Terminal";
import { useContext } from "react";

type Props = {
  index: number;
  cmd: string;
};

const Output: React.FC<Props> = ({ index, cmd }) => {
  const { arg } = useContext(termContext);

  if (arg.length > 0 && !["projects", "socials", "echo"].includes(cmd))
    return <UsageDiv>Usage: {cmd}</UsageDiv>;

  return (
    <OutputContainer data-testid={index === 0 ? "latest-output" : null}>
      {{
        about: <About />,
        clear: <Clear />,
        echo: <Echo />,
        education: <Education />,
        email: <Email />,
        resume: <Resume />,
        help: <Help />,
        history: <History />,
        projects: <Projects />,
        pwd: <GeneralOutput>/home/maanoj</GeneralOutput>,
        socials: <Socials />,
        welcome: <Welcome />,
        whoami: <GeneralOutput>maanoj</GeneralOutput>,
      }[cmd]}
    </OutputContainer>
  );
};

export default Output;