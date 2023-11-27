'use client'
import React, { useState, useEffect } from "react";
import SignatureCanvas from 'react-signature-canvas';
import { Button } from "../ui/button";
import { signature } from "@/services/signature";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";


function SignaturePad(){
  const [sign,setSign] = useState()
  const [url,setUrl] = useState()
  const [canvasWidth, setCanvasWidth] = useState(380);
  const [showSignature,setShowSignature] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleClear= () =>{
    sign.clear()
  }
  const handleGenerate= () =>{
    setUrl(sign.getTrimmedCanvas().toDataURL('image/png'))
    setShowSignature(!showSignature)
  }

  const handleSubmit = async() =>{
    setIsSubmitting(true);
    try {
      await signature(url)
      toast({
        title: "Signature saved",
        description: "Your signature has been saved successfully",
        
    }    );
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });

    } finally {
      setIsSubmitting(false);
      setShowSignature(false)
      sign.clear()
    }
  }
  
  const updateCanvasWidth = () => {
      setCanvasWidth(window.innerWidth * 0.8 > 600 ? 600 : window.innerWidth * 0.8); 
  };

  useEffect(() => {

      setCanvasWidth(window.innerWidth * 0.8 > 600 ? 600 : window.innerWidth * 0.8); 
      window.addEventListener('resize', updateCanvasWidth);
      return () => {
          window.removeEventListener('resize', updateCanvasWidth);
      };
  }, []);


    const width = 500
    console.log(showSignature)
    return(
        <div className={ `flex flex-col  gap-6 w-[${canvasWidth}] ` }>
            <div className={`border-2 border-slate-900 bg-slate-600 ${showSignature ? "hidden" : "block"} rounded-lg` }>
                <SignatureCanvas 
                    canvasProps={{ width: `${canvasWidth}`, height: `${canvasWidth * 0.5}`, className: "sigCanvas" }}
                    ref={data=>setSign(data)}
                />
            </div>
            <img src={url } alt="signature" style={{ width: '100%', height:'auto' }} className={`${showSignature ? "block" : "hidden"} bg-slate-600  rounded-sm`}/>

            <div className={"flex gap-3"}>
            <Button variant="outline"   onClick={handleClear}>Clear</Button>
            <Button variant="outline"  onClick={handleSubmit}> { isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}Save</Button>
            <Button variant="outline" onClick={handleGenerate} >{showSignature ? "Hide" : "Show "} Signature</Button>
            </div>

        </div>
    )
}
export default SignaturePad;