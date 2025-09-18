import CameraScanner from '../CameraScanner';

export default function CameraScannerExample() {
  const handleImageCapture = (file: File) => {
    console.log('Image captured:', file.name);
  };

  const handleClose = () => {
    console.log('Scanner closed');
  };

  return (
    <CameraScanner 
      onImageCapture={handleImageCapture}
      onClose={handleClose}
    />
  );
}