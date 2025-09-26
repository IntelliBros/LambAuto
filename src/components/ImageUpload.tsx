import React, { useState, useCallback } from 'react';
import { UploadIcon, XIcon, ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImagesChange,
  maxImages = 10
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const processFiles = async (files: FileList) => {
    const validFiles = Array.from(files).filter(file =>
      file.type.startsWith('image/')
    );

    if (validFiles.length === 0) {
      setUploadError('Please upload only image files');
      setTimeout(() => setUploadError(''), 3000);
      return;
    }

    if (images.length + validFiles.length > maxImages) {
      setUploadError(`Maximum ${maxImages} images allowed`);
      setTimeout(() => setUploadError(''), 3000);
      return;
    }

    try {
      const newImages = await Promise.all(
        validFiles.map(file => convertToBase64(file))
      );
      onImagesChange([...images, ...newImages]);
      setUploadError('');
    } catch (error) {
      setUploadError('Failed to upload images');
      setTimeout(() => setUploadError(''), 3000);
    }
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  }, [images]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const moveImage = (fromIndex: number, direction: 'left' | 'right') => {
    const newImages = [...images];
    const toIndex = direction === 'left' ? fromIndex - 1 : fromIndex + 1;

    if (toIndex >= 0 && toIndex < images.length) {
      [newImages[fromIndex], newImages[toIndex]] = [newImages[toIndex], newImages[fromIndex]];
      onImagesChange(newImages);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-lg p-8
          transition-all duration-200
          ${isDragging
            ? 'border-accent-red bg-red-900/20'
            : 'border-gray-600 hover:border-gray-500 bg-dark-700/50'
          }
          ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={images.length >= maxImages}
        />

        <div className="text-center pointer-events-none">
          <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-300 font-medium mb-2">
            {isDragging ? 'Drop images here' : 'Drag & drop images here'}
          </p>
          <p className="text-sm text-gray-500">
            or click to select files
          </p>
          <p className="text-xs text-gray-600 mt-2">
            {images.length}/{maxImages} images uploaded
          </p>
        </div>
      </div>

      {uploadError && (
        <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-2 rounded-md text-sm">
          {uploadError}
        </div>
      )}

      {images.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-400">
            Uploaded Images (drag to reorder, first image is primary):
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-dark-800">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-accent-red text-white text-xs px-2 py-1 rounded">
                      Primary
                    </div>
                  )}
                </div>

                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, 'left')}
                      className="bg-dark-900/80 text-white p-1 rounded hover:bg-dark-800"
                      title="Move left"
                    >
                      ←
                    </button>
                  )}
                  {index < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, 'right')}
                      className="bg-dark-900/80 text-white p-1 rounded hover:bg-dark-800"
                      title="Move right"
                    >
                      →
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="bg-red-600/80 text-white p-1 rounded hover:bg-red-700"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div className="flex items-center justify-center p-4 bg-dark-700/30 rounded-lg">
          <ImageIcon className="h-5 w-5 text-gray-500 mr-2" />
          <p className="text-sm text-gray-500">No images uploaded yet</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;