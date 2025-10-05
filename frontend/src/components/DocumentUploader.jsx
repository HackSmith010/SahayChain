import { useState } from "react";
import { supabase } from "../supabaseClient.js";
import { UploadCloud, CheckCircle, AlertCircle } from "lucide-react";

export default function DocumentUploader({ docType, onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setError("");
    setFileName(file.name);

    try {
      const filePath = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("SahayChain")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("SahayChain").getPublicUrl(filePath);

      onUploadSuccess({ doc_type: docType, s3_uri: publicUrl });
    } catch (err) {
      setError(err.message);
      setFileName("");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-8 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        Upload your {docType}
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Submit your official documents for review.
      </p>
      <div className="mt-6">
        <input
          type="file"
          id="file-upload"
          className="sr-only"
          onChange={handleUpload}
          disabled={uploading}
          accept="image/*,.pdf"
        />
        <label
          htmlFor="file-upload"
          className={`cursor-pointer inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
            uploading ? "bg-gray-400" : "bg-primary-600 hover:bg-primary-700"
          }`}
        >
          {uploading ? "Uploading..." : "Select File"}
        </label>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center justify-center gap-2">
          <AlertCircle size={16} /> {error}
        </p>
      )}
    </div>
  );
}
