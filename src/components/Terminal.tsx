import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import _ from "lodash";
import Output from "./Output";
import TermInfo from "./TermInfo";
import {
  CmdNotFound,
  Empty,
  Form,
  Hints,
  Input,
  MobileBr,
  MobileSpan,
  Wrapper,
} from "./styles/Terminal.styled";
import { argTab } from "../utils/funcs";

type Command = {
  cmd: string;
  desc: string;
  tab: number;
}[];

export const commands: Command = [
  { cmd: "about", desc: "about Manoj Kumar N", tab: 8 },
  { cmd: "clear", desc: "clear the terminal", tab: 8 },
  { cmd: "projects", desc: "view my cybersecurity projects", tab: 5 },
  { cmd: "skills", desc: "list my technical skills", tab: 7 },
  { cmd: "experience", desc: "my work experience", tab: 4 },
  { cmd: "certifications", desc: "view my certifications", tab: 4 },
  { cmd: "resume", desc: "download my resume", tab: 7 },
  { cmd: "socials", desc: "check my social links", tab: 6 },
  { cmd: "help", desc: "show all available commands", tab: 9 },
  { cmd: "history", desc: "view command history", tab: 6 },
  { cmd: "email", desc: "send me an email", tab: 8 },
  { cmd: "whoami", desc: "about current user", tab: 7 },
  { cmd: "welcome", desc: "display welcome message", tab: 6 },
];

export const hiddenCommands = ["sudo", "neofetch", "uname", "ls"];

type Term = {
  arg: string[];
  history: string[];
  rerender: boolean;
  index: number;
  clearHistory?: () => void;
  executeCommand?: (cmd: string) => void;
};

export const termContext = createContext<Term>({
  arg: [],
  history: [],
  rerender: false,
  index: 0,
});

const Terminal = () => {
  const containerRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>(["welcome", "about"]);
  const [rerender, setRerender] = useState(false);
  const [hints, setHints] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRerender(false);
    setInputVal(e.target.value);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCmdHistory([...cmdHistory, inputVal]);
    setInputVal("");
    setRerender(true);
    setHints([]);
    setHistIndex(null);
  };

  const clearHistory = () => {
    setCmdHistory([]);
    setHints([]);
  };

  const executeCommand = (cmd: string) => {
    setCmdHistory([...cmdHistory, cmd]);
    setRerender(true);
    setHints([]);
    setHistIndex(null);
  };

  const handleDivClick = () => {
    inputRef.current && inputRef.current.focus();
  };

  useEffect(() => {
    document.addEventListener("click", handleDivClick);
    return () => document.removeEventListener("click", handleDivClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setRerender(false);
    const ctrlI = e.ctrlKey && e.key.toLowerCase() === "i";
    const ctrlL = e.ctrlKey && e.key.toLowerCase() === "l";

    if (e.key === "Tab" || ctrlI) {
      e.preventDefault();
      if (!inputVal) return;

      let hintsCmds: string[] = [];
      commands.forEach(({ cmd }) => {
        if (_.startsWith(cmd, inputVal)) hintsCmds = [...hintsCmds, cmd];
      });

      const returnedHints = argTab(inputVal, setInputVal, setHints, hintsCmds);
      hintsCmds = returnedHints ? [...hintsCmds, ...returnedHints] : hintsCmds;

      if (hintsCmds.length > 1) setHints(hintsCmds);
      else if (hintsCmds.length === 1) {
        const currentCmd = _.split(inputVal, " ");
        setInputVal(currentCmd.length !== 1 ? `${currentCmd[0]} ${currentCmd[1]} ${hintsCmds[0]}` : hintsCmds[0]);
        setHints([]);
      }
    }

    if (ctrlL) clearHistory();

    if (e.key === "ArrowUp") {
      if (cmdHistory.length === 0) return;
      const nextIndex = histIndex === null ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(nextIndex);
      setInputVal(cmdHistory[nextIndex]);
      inputRef?.current?.blur();
    }

    if (e.key === "ArrowDown") {
      if (histIndex === null) return;
      if (histIndex === cmdHistory.length - 1) {
        setInputVal("");
        setHistIndex(null);
        return;
      }
      const nextIndex = Math.min(cmdHistory.length - 1, histIndex + 1);
      setHistIndex(nextIndex);
      setInputVal(cmdHistory[nextIndex]);
      inputRef?.current?.blur();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => inputRef?.current?.focus(), 1);
    return () => clearTimeout(timer);
  }, [inputVal, histIndex]);

  useEffect(() => {
    const el = containerRef?.current as HTMLElement | null;
    if (el) el.scrollTop = el.scrollHeight;
  }, [cmdHistory, rerender]);

  return (
    <Wrapper data-testid="terminal-wrapper" ref={containerRef}>
      {cmdHistory.map((cmdH, index) => {
        const commandArray = _.split(_.trim(cmdH), " ");
        const validCommand = _.find(commands, { cmd: commandArray[0] });
        const contextValue = {
          arg: _.drop(commandArray),
          history: cmdHistory,
          rerender,
          index,
          clearHistory,
          executeCommand,
        };
        return (
          <div key={_.uniqueId(`${cmdH}_`)}>
            <div>
              <TermInfo />
              <MobileBr />
              <MobileSpan>&#62;</MobileSpan>
              <span data-testid="input-command">{cmdH}</span>
            </div>
            {(validCommand || hiddenCommands.includes(commandArray[0])) ? (
              <termContext.Provider value={contextValue}>
                <Output index={index} cmd={commandArray[0]} />
              </termContext.Provider>
            ) : cmdH === "" ? (
              <Empty />
            ) : (
              <CmdNotFound data-testid={`not-found-${index}`}>
                command not found: {cmdH}
              </CmdNotFound>
            )}
          </div>
        );
      })}

      {hints.length > 1 && (
        <div>
          {hints.map(hCmd => <Hints key={hCmd}>{hCmd}</Hints>)}
        </div>
      )}

      <Form onSubmit={handleSubmit}>
        <label htmlFor="terminal-input">
          <TermInfo /> <MobileBr />
          <MobileSpan>&#62;</MobileSpan>
        </label>
        <Input
          title="terminal-input"
          type="text"
          id="terminal-input"
          autoComplete="off"
          spellCheck="false"
          autoFocus
          autoCapitalize="off"
          ref={inputRef}
          value={inputVal}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </Form>
    </Wrapper>
  );
};

export default Terminal;