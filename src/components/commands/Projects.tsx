import { useContext, useEffect } from "react";
import {
  checkRedirect,
  getCurrentCmdArry,
  isArgInvalid,
} from "../../utils/funcs";
import {
  ProjectContainer,
  ProjectDesc,
  ProjectsIntro,
  ProjectTitle,
} from "../styles/Projects.styled";
import { termContext } from "../Terminal";
import Usage from "../Usage";

const Projects: React.FC = () => {
  const { arg, history, rerender, executeCommand } = useContext(termContext);

  const currentCommand = getCurrentCmdArry(history);

  useEffect(() => {
    if (checkRedirect(rerender, currentCommand, "projects")) {
      projects.forEach(({ id, url }) => {
        id === parseInt(arg[1]) && window.open(url, "_blank");
      });
    }
  }, [arg, rerender, currentCommand]);

  const handleProjectClick = (id: number, url: string) => {
    window.open(url, "_blank");
  };

  const checkArg = () =>
    isArgInvalid(arg, "go", ["1", "2", "3", "4"]) ? (
      <Usage cmd="projects" />
    ) : null;

  return arg.length > 0 || arg.length > 2 ? (
    checkArg()
  ) : (
    <div data-testid="projects">
      <ProjectsIntro>
        Here are my key cybersecurity projects<br />
        (Type <strong>projects go 1</strong> to open any project)
      </ProjectsIntro>
      {projects.map(({ id, title, desc, url }) => (
        <ProjectContainer key={id}>
          <ProjectTitle
            onClick={() => handleProjectClick(id, url)}
            style={{ cursor: 'pointer' }}
          >
            {`${id}. ${title}`}
          </ProjectTitle>
          <ProjectDesc>{desc}</ProjectDesc>
        </ProjectContainer>
      ))}
      <Usage cmd="projects" marginY />
    </div>
  );
};

const projects = [
  {
    id: 1,
    title: "Radio Resource Allocation Under DoS Attacks using DRL",
    desc: "IEEE Published Paper • Hybrid DDPG model for wireless DoS mitigation (60-80% faster training)",
    url: "https://github.com/ManoJ-46", // change if you have public repo
  },
  {
    id: 2,
    title: "Custom Kali Vulnerability Scanner",
    desc: "Python + Nmap tool for OWASP Top 10 scanning with HTML reports",
    url: "https://github.com/ManoJ-46",
  },
  {
    id: 3,
    title: "Telegram Security Monitoring Bot",
    desc: "Real-time anomaly detection & alerts using Python + Selenium",
    url: "https://github.com/ManoJ-46",
  },
  {
    id: 4,
    title: "Secure Online Food Order System",
    desc: "Intern project hardened with rate limiting, session management & SQL protection",
    url: "https://github.com/ManoJ-46",
  },
];

export default Projects;