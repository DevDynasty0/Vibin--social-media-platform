import { useState } from "react";
import { useCaptionGenaratorMutation } from "../../redux/features/vibin-ai/vibinAiApi";

const GenarateCaption = () => {
    const [genaratedCaption, setGenaratedCaption] = useState("");
    const [prompt, setPrompt] = useState("");
    const [isCaptionLoading, setIsCaptionLoading] = useState(false);

    const [captionGenarator] = useCaptionGenaratorMutation();

    const handleGenarateCaption = async(e) => {
        e.preventDefault();
        const userPrompt = e.target.userPrompt.value;
        console.log(userPrompt);
        const result = await captionGenarator({prompt: userPrompt});
        // console.log(result.data.caption);
        if(result?.data?.caption){
            e.target.userPrompt.value = "";
            setPrompt(userPrompt);
            setGenaratedCaption(result.data.caption)
        }
        else{
            e.target.userPrompt.value = "";
            setPrompt(userPrompt);
            setGenaratedCaption("Something went wrong!")
        }
    
    }
    return (
        <div className="bg-white rounded p-3 mt-6 mb-4">
            <div>
                <h3 className="text-2xl font-medium"> Confused how to express your vibe?</h3>
                <p className="mt-1">Let <span className="text-color-one">Vibin AI</span> elevate your expression.</p>
                <form onSubmit={handleGenarateCaption} className="mt-2">
                    <textarea name="userPrompt" className="border border-black outline-none w-full rounded p-2 focus-visible:border-color-one" type="text" placeholder="Give you prompt" />
                    <button type="submit" className="mt-1 bg-color-one text-white rounded p-1">Genarate</button>
                </form>

                <div className={`${genaratedCaption.length > 0 ? "block" : "hidden"}`}>
                    <h4 className="font-semibold text-xl">{prompt}</h4>
                    <p className="mt-1">{genaratedCaption}</p>  
                </div>
            </div>
        </div>
    );
};

export default GenarateCaption;