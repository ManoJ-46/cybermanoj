import { EduIntro, EduList } from "../styles/Education.styled";
import { Wrapper } from "../styles/Output.styled";

const Education: React.FC = () => {
  return (
    <Wrapper data-testid="education">
      <EduIntro>Here is my education background!</EduIntro>
      {eduBg.map(({ title, desc }) => (
        <EduList key={title}>
          <div className="title">{title}</div>
          <div className="desc">{desc}</div>
        </EduList>
      ))}
    </Wrapper>
  );
};

const eduBg = [
  {
    title: "Master of Computer Applications (MCA)",
    desc: "JSS Academy of Technical Education | CGPA 8.85 | Feb 2024 – Oct 2025 | Bangalore",
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    desc: "Vivekananda Institute of Management | CGPA 7.84 | Aug 2020 – Aug 2023 | Bangalore",
  },
];

export default Education;