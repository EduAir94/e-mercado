import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

export const ImageUpload = ({ setPreview }: { setPreview: any }) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview('');
      return;
    }

    const reader = new FileReader();

    reader.addEventListener(
      'load',
      function () {
        console.log('LISTENER ACTIVATED');
        // convert image file to base64 string and save to localStorage
        if (reader.result) {
          setPreview(reader.result);
        }
      },
      false
    );

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <Form.Control
        name="profile_image"
        type="file"
        onChange={(c) => onSelectFile(c)}
        accept="image/png, image/gif, image/jpeg"
        defaultValue=""
      />
    </div>
  );
};
