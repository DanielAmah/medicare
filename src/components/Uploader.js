import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { FiUploadCloud } from 'react-icons/fi';

const Uploader = ({ handleFileChange, image }) => {
  const [imageUrl, setImageUrl] = useState(image)
  const [loading, setLoading] = useState(false);


  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading(true);
    try {
      const file = acceptedFiles[0];
      handleFileChange(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        setImageUrl(e.target.result)
        setLoading(false);
      };
      reader.readAsDataURL(file);

    } catch (error) {
      console.log(error, 'error')
      toast.error('Upload failed');
    } finally {
      setLoading(false);
    }
  }, [handleFileChange]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
    accept: 'image/jpeg, image/png'
  });

  return (
    <div className="w-full text-center grid grid-cols-12 gap-4">
      <div
        className="px-6 lg:col-span-10 sm:col-span-8 col-span-12 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex justify-center">
          <FiUploadCloud className="text-3xl text-subMain" />
        </span>
        <p className="text-sm mt-2">Drag your image here</p>
        <em className="text-xs text-gray-400">
          (Only *.jpeg and *.png images will be accepted)
        </em>
      </div>
      {/* image preview */}
      <div className="lg:col-span-2 sm:col-span-4 col-span-12">
        {loading ? (
          <div className="px-6 w-full bg-dry flex-colo h-32 border-2 border-border border-dashed rounded-md">
            <BiLoaderCircle className="mx-auto text-main text-3xl animate-spin" />
            <span className="text-sm mt-2 text-text">Uploading...</span>
          </div>
        ) : (
          <img
            src={imageUrl ? imageUrl : 'http://placehold.it/300x300'}
            alt="preview"
            className=" w-full h-32 rounded object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default Uploader;
