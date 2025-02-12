import React, { useState } from "react";
import { FaFolderOpen } from "react-icons/fa6";

const FileUpload = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  // ✅ Handle File Selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file); // Pass file to parent component
    }
  };

  // ✅ Handle Drag & Drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-400 p-6 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:border-orange-500 transition mt-1"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => document.getElementById("fileInput").click()}
    >
      <FaFolderOpen className="text-orange-500 text-4xl mb-2" />
      <p className="text-gray-500">{selectedFile ? selectedFile.name : "Drop your file here or click to upload"}</p>
      <input
        id="fileInput"
        type="file"
        name="profileImage"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
