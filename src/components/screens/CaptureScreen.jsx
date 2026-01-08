import React, { useRef, useEffect, useState, useCallback} from 'react';
import { useVibeBooth } from '../../context/VibeBoothContext';
import * as FaceMeshModule from '@mediapipe/face_mesh';

const TOTAL_PHOTOS = 4;
const COUNTDOWN_SECONDS = 3;

const CaptureScreen = () => {
  const { cameraStream, addPhoto, photos, setScreen, setFaceLandmarks } = useVibeBooth();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const faceMeshRef = useRef(null);
  const [countdown, setCountdown] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const getFaceMeshConstructor = () => {
      if (typeof FaceMeshModule.FaceMesh === 'function') return FaceMeshModule.FaceMesh;
      if (typeof FaceMeshModule.default?.FaceMesh === 'function') return FaceMeshModule.default.FaceMesh;
      if (typeof FaceMeshModule.default === 'function') return FaceMeshModule.default;
      if (typeof FaceMeshModule === 'function') return FaceMeshModule;
      if (typeof FaceMeshModule.default?.default === 'function') return FaceMeshModule.default.default;
      return null;
    };

    const FaceMeshCtor = getFaceMeshConstructor();
    
    if (!FaceMeshCtor) {
      console.error('FaceMesh constructor not found');
      return;
    }

    const faceMesh = new FaceMeshCtor({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        setFaceDetected(true);
        setFaceLandmarks(results.multiFaceLandmarks[0]);
        
        if (canvasRef.current && videoRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          const video = videoRef.current;
          
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          const landmarks = results.multiFaceLandmarks[0];
          const noseTip = landmarks[1];
          
          ctx.beginPath();
          ctx.arc(
            noseTip.x * canvas.width,
            noseTip.y * canvas.height,
            5,
            0,
            2 * Math.PI
          );
          ctx.fillStyle = 'rgba(61, 41, 20, 0.3)';
          ctx.fill();
        }
      } else {
        setFaceDetected(false);
        setFaceLandmarks(null);
      }
    });

    faceMeshRef.current = faceMesh;

    if (cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
    }

    return () => {
      if (faceMeshRef.current) {
        faceMeshRef.current.close();
      }
    };
  }, [cameraStream, setFaceLandmarks]);

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
      
      const processFrame = async () => {
        if (faceMeshRef.current && videoRef.current && videoRef.current.readyState >= 2) {
          await faceMeshRef.current.send({ image: videoRef.current });
        }
        requestAnimationFrame(processFrame);
      };
      
      videoRef.current.onloadeddata = () => {
        processFrame();
      };
    }
  }, [cameraStream]);

  useEffect(() => {
    if (photos.length >= TOTAL_PHOTOS) {
      setScreen('vibe');
    }
  }, [photos.length, setScreen]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const captureCanvas = document.createElement('canvas');
    const ctx = captureCanvas.getContext('2d');

    if (!ctx) return;

    captureCanvas.width = video.videoWidth;
    captureCanvas.height = video.videoHeight;

    ctx.translate(captureCanvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    const photoData = captureCanvas.toDataURL('image/jpeg', 0.9);
    addPhoto(photoData);
  }, [addPhoto]);

  const startCountdown = useCallback(() => {
    if (isCapturing || photos.length >= TOTAL_PHOTOS) return;

    setIsCapturing(true);
    setCountdown(COUNTDOWN_SECONDS);

    let count = COUNTDOWN_SECONDS;
    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setCountdown(null);
        capturePhoto();
        setIsCapturing(false);
      }
    }, 1000);
  }, [isCapturing, photos.length, capturePhoto]);

  const photosRemaining = TOTAL_PHOTOS - photos.length;

  return (
    <section className="screen screen--capture fade-in">
      <div className="capture__viewport">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="capture__video"
        />
        
        <canvas ref={canvasRef} className="capture__canvas" />

        <div className={`capture__badge ${faceDetected ? 'capture__badge--detected' : 'capture__badge--not-detected'}`}>
          <div className={`capture__badge-dot ${faceDetected ? 'capture__badge-dot--detected' : ''}`} />
          <span>{faceDetected ? 'face detected' : 'no face'}</span>
        </div>

        {countdown !== null && (
          <div className="capture__countdown">
            <span className="capture__countdown-number">{countdown}</span>
          </div>
        )}
      </div>

      <div className="capture__dots">
        {Array.from({ length: TOTAL_PHOTOS }).map((_, index) => (
          <div
            key={index}
            className={`capture__dot ${index < photos.length ? 'capture__dot--filled' : ''}`}
          />
        ))}
      </div>

      <p className="capture__info">
        {photosRemaining > 0
          ? `${photosRemaining} photo${photosRemaining > 1 ? 's' : ''} remaining`
          : 'all photos captured!'}
      </p>

      <button
        onClick={startCountdown}
        disabled={isCapturing || photos.length >= TOTAL_PHOTOS}
        className="capture__shutter"
      >
        <div className="capture__shutter-inner" />
      </button>
    </section>
  );
};

export default CaptureScreen;
