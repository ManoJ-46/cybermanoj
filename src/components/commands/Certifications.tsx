import { GeneralOutput } from "../../styles/Output.styled";

const Certifications = () => {
    return (
        <GeneralOutput>
            <strong>🎓 CERTIFICATIONS</strong><br /><br />

            • Ethical Hacking – MOOC Certificate<br />
            • Essentials of Cloud Computing – Infosys Springboard<br />
            • Introduction to Cloud Computing – Simplilearn<br />
            • Applied Accelerated Artificial Intelligence – MOOC Certificate<br />
            • PMP Basics Course – Simplilearn<br />
            • AI/ML Certifications – VOIS<br /><br />

            <strong>📄 Full Certificates Preview:</strong><br />
            <iframe
                src="/certificates.pdf#toolbar=1&navpanes=0&scrollbar=1&view=FitH"
                width="100%"
                height="620px"
                style={{ border: "1px solid #00ff41", borderRadius: "8px", marginTop: "12px" }}
                title="Certificates PDF"
            />
            <br /><br />
            <a href="/certificates.pdf" download style={{ color: "#00ff41", textDecoration: "underline" }}>
                ↓ Download All Certificates as PDF
            </a>
        </GeneralOutput>
    );
};

export default Certifications;
