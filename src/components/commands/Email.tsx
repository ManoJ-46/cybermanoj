import { useContext } from "react";
import _ from "lodash";
import { Wrapper } from "../styles/Output.styled";
import { termContext } from "../Terminal";

const Email: React.FC = () => {
  const { history, rerender } = useContext(termContext);

  const currentCommand = _.split(history[0], " ");

  if (rerender && currentCommand[0] === "email") {
    window.open("mailto:dev@maanoj.com", "_self");
  }

  const handleEmailClick = () => {
    window.open("mailto:dev@maanoj.com", "_self");
  };

  return (
    <Wrapper>
      <span
        onClick={handleEmailClick}
        style={{
          cursor: 'pointer',
          textDecoration: 'underline',
          color: '#00ff41'
        }}
      >
        dev@maanoj.com
      </span>
      <br /><br />
      Click the email above or type <strong>email</strong> to send me a message directly.
    </Wrapper>
  );
};

export default Email;