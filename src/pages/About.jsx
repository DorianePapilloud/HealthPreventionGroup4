import groupImage from "../images/loginRegister/groupAbout.png";


export default function About() {

    return (
        <div>
            <div style={{width: "60%", margin: "auto", textAlign: "justify"}}>
                This application was created by Doriane, Massimo, Loan and Sven, four students of the HES-SO Valais Wallis in Sierre.
                This tool allows users to answer questions in order to get a result regarding their current health condition and risks depending on their daily habits.
                For any questions about the app, feel free to contact us to the following e-mail address : massimo.pantucci@students.hevs.ch
            </div>
            <img src={groupImage} style={{width: "60%"}}/>
        </div>
    )

}