import { useContext, useEffect } from "react";
import { ProjectsIntro } from "../styles/Projects.styled";
import { Cmd, CmdDesc, CmdList, HelpWrapper } from "../styles/Help.styled";
import {
  checkRedirect,
  generateTabs,
  getCurrentCmdArry,
  isArgInvalid,
} from "../../utils/funcs";
import { termContext } from "../Terminal";
import Usage from "../Usage";

const Socials: React.FC = () => {
  const { arg, history, rerender, executeCommand } = useContext(termContext);

  const currentCommand = getCurrentCmdArry(history);

  useEffect(() => {
    if (checkRedirect(rerender, currentCommand, "socials")) {
      socials.forEach(({ id, url }) => {
        id === parseInt(arg[1]) && window.open(url, "_blank");
      });
    }
  }, [arg, rerender, currentCommand]);

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  const checkArg = () =>
    isArgInvalid(arg, "go", ["1", "2", "3", "4"]) ? (
      <Usage cmd="socials" />
    ) : null;

  return arg.length > 0 || arg.length > 2 ? (
    checkArg()
  ) : (
    <HelpWrapper data-testid="socials">
      <ProjectsIntro>Here are my social links</ProjectsIntro>
      {socials.map(({ id, title, url, tab }) => (
        <CmdList key={title}>
          <Cmd
            onClick={() => handleSocialClick(url)}
            style={{ cursor: 'pointer' }}
          >
            {`${id}. ${title}`}
          </Cmd>
          {generateTabs(tab)}
          <CmdDesc>- {url}</CmdDesc>
        </CmdList>
      ))}
      <Usage cmd="socials" marginY />
    </HelpWrapper>
  );
};

const socials = [
  {
    id: 1,
    title: "LinkedIn",
    url: "https://linkedin.com/in/maanoj",
    tab: 3,
  },
  {
    id: 2,
    title: "GitHub",
    url: "https://github.com/ManoJ-46",
    tab: 3,
  },
  {
    id: 3,
    title: "X (Twitter)",
    url: "https://x.com/PsychNanMaga",
    tab: 1,
  },
  {
    id: 4,
    title: "Email",
    url: "mailto:dev@maanoj.com",
    tab: 5,
  },
];

export default Socials;