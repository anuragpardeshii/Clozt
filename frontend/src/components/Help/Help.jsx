import Customer from "./Customercare";
import Faq from "./Faq";

export default function Help(){
    return(
        <>
        <div className="max-w-6xl mx-auto" style={{maxWidth: "80rem"}}>
            <Customer/>
            <Faq/>
            </div>
        </>
    );
};