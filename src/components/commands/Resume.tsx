import { useContext } from "react";
import _ from "lodash";
import { termContext } from "../Terminal";

const Resume: React.FC = () => {
  const { history, rerender } = useContext(termContext);

  const currentCommand = _.split(history[0], " ");

  if (rerender && currentCommand[0] === "resume") {
    window.open("/resume.pdf", "_blank");
  }

  return <span></span>;
};

export default Resume;