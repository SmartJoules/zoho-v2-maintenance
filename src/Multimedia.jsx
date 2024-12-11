import React, { useState, useRef, useCallback } from 'react';
import Modal from './Modal';
import Webcam from "react-webcam";
import dataToBlog from './DataURItoBlob';

const Multimedia = (props) => {
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isImagesOpen, setIsImagesOpen] = useState(false);
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(`https://creatorapp.zohopublic.in${props.img_url}`.replace("api", "publishapi") + `&privatelink=q52rRrGjs3HzqO2GjTB28AvBeqgmKVMkma5HDOUxYwpq1Km45hJaRHn3q6Bukj4m0C1Zgq2gM1xg4wFKvrez60A7x2C7aMFxbO3V`);
  const [audioSrc, setAudioSrc] = useState(`https://creatorapp.zohopublic.in${props.audio}`.replace("api", "publishapi") + `&privatelink=q52rRrGjs3HzqO2GjTB28AvBeqgmKVMkma5HDOUxYwpq1Km45hJaRHn3q6Bukj4m0C1Zgq2gM1xg4wFKvrez60A7x2C7aMFxbO3V`);
  const [videoSrc, setVideoSrc] = useState(`https://creatorapp.zohopublic.in${props.video}`.replace("api", "publishapi") + `&privatelink=q52rRrGjs3HzqO2GjTB28AvBeqgmKVMkma5HDOUxYwpq1Km45hJaRHn3q6Bukj4m0C1Zgq2gM1xg4wFKvrez60A7x2C7aMFxbO3V`);
  const webcamRef = useRef(null);
  const [facingMode, setFacingMode] = useState("environment");
  const fileInputRef = useRef(null);


  const handleLabelClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const capture = useCallback(async () => {
    let imageSrc = webcamRef.current.getScreenshot();
     imageSrc = dataToBlog(imageSrc);
    setImgSrc(imageSrc);
    const config = {
      appName: "smart-joules-app",
      reportName: "All_Maintenance_Scheduler_Task_List_Records",
      id: props.id,
      fieldName: "Image",
      file: imageSrc
    }
    try {
      await ZOHO.CREATOR.init();
      const resp = await ZOHO.CREATOR.API.uploadFile(config);
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setIsCameraModalOpen(false);
  }, [webcamRef]);

  const toggleCamera = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  const videoConstraints = {
    width: 1080,
    height: 1920,
    facingMode: facingMode
  };

  const handleClose = () => {
    setIsCameraModalOpen(false);
    setIsImagesOpen(false);
    setIsAudioOpen(false);
    setIsVideoOpen(false);
  };
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const config = {
        appName: "smart-joules-app",
        reportName: "All_Maintenance_Scheduler_Task_List_Records",
        id: props.id,
        fieldName: "Image",
        file: file
      }
      try {
        await ZOHO.CREATOR.init();
        const resp = await ZOHO.CREATOR.API.uploadFile(config);
        handleClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='flex justify-around items-center py-2 border-t rounded-b'>
      {/* Camera */}
      <div>
        <button
          onClick={() => setIsCameraModalOpen((cur) => !cur)}
          className='bg-blue-100 p-3 rounded-full text-center shadow-sm text-blue-600'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-camera-fill'
            viewBox='0 0 16 16'>
            <path d='M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0' />
            <path d='M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0' />
          </svg>
        </button>
      </div>

      <Modal status={isCameraModalOpen} handleClose={handleClose}>
        {isCameraModalOpen && (
          <>
            <div className='relative'>
              <Webcam
                audio={false}
                ref={webcamRef}
                height={1440}
                screenshotFormat="image/jpeg"
                screenshotQuality={0.4}
                width={1080}
                videoConstraints={videoConstraints}
                className='h-[80vh] w-full'
              />
              <div className=' p-2'>
                <div className='flex gap-[20px] justify-center'>
                  <input type="file" onChange={handleUpload} accept='image/*' ref={fileInputRef} className='hidden' />
                  <label onClick={handleLabelClick} className='bg-blue-600 text-white p-3 rounded-full cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                  </svg></label>
                  <button onClick={capture} className='bg-blue-600 text-white p-3 rounded-full'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                  </svg></button>
                  <button onClick={toggleCamera} className="bg-blue-600 text-white  p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                      <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z" />
                    </svg>
                  </button>
                </div>

              </div>
            </div>


          </>
        )}
      </Modal>

      {/* Gallery */}
      <div>
        <button
          onClick={() => setIsImagesOpen((cur) => !cur)}
          className='bg-blue-100 p-3 rounded-full text-center shadow-sm text-blue-600'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-images'
            viewBox='0 0 16 16'>
            <path d='M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3' />
            <path d='M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z' />
          </svg>
        </button>
      </div>
      <Modal status={isImagesOpen} handleClose={handleClose}>
        <img src={imgSrc} className='object-cover max-h-[600px] w-[100%]' alt="No Image Found" />
      </Modal>

      {/* Audio */}
      <div>
        <button
          onClick={() => setIsAudioOpen((cur) => !cur)}
          className='bg-blue-100 p-3 rounded-full text-center shadow-sm text-blue-600'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-volume-up-fill'
            viewBox='0 0 16 16'>
            <path d='M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z' />
            <path d='M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z' />
            <path d='M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z' />
          </svg>
        </button>
      </div>

      <Modal status={isAudioOpen} handleClose={handleClose}>
        {
          isAudioOpen &&
          <audio controls autoPlay>
            <source src={audioSrc} type='audio/mpeg' />
          </audio>
        }

      </Modal>

      {/* Video */}
      <div>
        <button
          onClick={() => setIsVideoOpen((cur) => !cur)}
          className='bg-blue-100 p-3 rounded-full text-center shadow-sm text-blue-600'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-camera-video-fill'
            viewBox='0 0 16 16'>
            <path d='M0 5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5z' />
            <path d='M14.676 3.919a.5.5 0 0 1 .824.38v7.403a.5.5 0 0 1-.824.38l-2.82-2.348A.5.5 0 0 1 12 9.5V6.5a.5.5 0 0 1 .856-.384l2.82-2.197z' />
          </svg>
        </button>
      </div>

      <Modal status={isVideoOpen} handleClose={handleClose}>
        {
          isVideoOpen &&
          <video controls autoPlay>
            <source type='video/mp4' src={videoSrc} />
          </video>
        }
      </Modal>
    </div>
  );
};

export default Multimedia;
